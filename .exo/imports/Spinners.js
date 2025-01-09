import _ from 'yoctocolors';
import stripAnsi from 'strip-ansi';
import cliCursor from 'cli-cursor';
import readline from 'node:readline';

const VALID_COLORS = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'redBright', 'greenBright', 'yellowBright', 'blueBright', 'magentaBright', 'cyanBright', 'whiteBright'];
const VALID_STATUSES = ['succeed', 'fail', 'spinning', 'non-spinnable', 'stopped'];
const SPINNER_CONFIG = {
  interval: 80,
  frames: terminalSupportsUnicode()
    ? ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    : ['-', '\\', '|', '/'],
};

export default class Spinnies {
  constructor(options = {}) {
    options = purgeSpinnersOptions(options);
    this.options = {
      failColor: 'red',
      succeedColor: 'green',
      spinnerColor: 'gray',
      disableSpins: false,
      spinner: SPINNER_CONFIG,
      ...options,
    };
    this.spinners = {};
    this.isCursorHidden = false;
    this.currentInterval = null;
    this.stream = process.stderr;
    this.lineCount = 0;
    this.currentFrameIndex = 0;
    this.spin = !this.options.disableSpins
      && !process.env.CI
      && process.stderr
      && process.stderr.isTTY;
    this.bindSigint();
  }

  pick(name) {
    return this.spinners[name];
  }

  add(name, options = {}) {
    if (typeof name !== 'string')
      throw Error('A spinner reference name must be specified');
    if (!options.text)
      options.text = name;
    const spinnerProperties = {
      ...colorOptions(this.options),
      status: 'spinning',
      failPrefix: this.options.failPrefix,
      succeedPrefix: this.options.succeedPrefix,
      ...purgeSpinnerOptions(options),
    };
    this.spinners[name] = spinnerProperties;
    this.updateSpinnerState();
    return spinnerProperties;
  }

  update(name, options = {}) {
    const {status} = options;
    this.setSpinnerProperties(name, options, status);
    this.updateSpinnerState();
    return this.spinners[name];
  }

  succeed(name, options = {}) {
    this.setSpinnerProperties(name, options, 'succeed');
    this.updateSpinnerState();
    return this.spinners[name];
  }

  fail(name, options = {}) {
    this.setSpinnerProperties(name, options, 'fail');
    this.updateSpinnerState();
    return this.spinners[name];
  }

  remove(name) {
    if (typeof name !== 'string') throw Error('A spinner reference name must be specified');
    const spinner = this.spinners[name];
    delete this.spinners[name];
    return spinner;
  }

  stopAll(newStatus = 'stopped') {
    Object.keys(this.spinners).forEach(name => {
      const { status: currentStatus } = this.spinners[name];
      if (currentStatus !== 'fail' && currentStatus !== 'succeed' && currentStatus !== 'non-spinnable') {
        if (newStatus === 'succeed' || newStatus === 'fail') {
          this.spinners[name].status = newStatus;
          this.spinners[name].color = this.options[`${newStatus}Color`];
        } else {
          this.spinners[name].status = 'stopped';
          this.spinners[name].color = 'grey';
        }
      }
    });
    this.checkIfActiveSpinners();
    return this.spinners;
  }

  hasActiveSpinners() {
    return !!Object.values(this.spinners).find(({ status }) => status === 'spinning');
  }

  setSpinnerProperties(name, options, status) {
    if (typeof name !== 'string') throw Error('A spinner reference name must be specified');
    if (!this.spinners[name]) throw Error(`No spinner initialized with name ${name}`);
    options = purgeSpinnerOptions(options);
    status = status || 'spinning';
    this.spinners[name] = {...this.spinners[name], ...options, status};
  }

  updateSpinnerState(name, options = {}, status) {
    if (this.spin) {
      clearInterval(this.currentInterval);
      this.currentInterval = this.loopStream();
      if (!this.isCursorHidden) cliCursor.hide();
      this.isCursorHidden = true;
      this.checkIfActiveSpinners();
    } else {
      this.setRawStreamOutput();
    }
  }

  loopStream() {
    const { frames, interval } = this.options.spinner;
    return setInterval(() => {
      this.setStreamOutput(frames[this.currentFrameIndex]);
      this.currentFrameIndex = this.currentFrameIndex === frames.length - 1 ? 0 : ++this.currentFrameIndex
    }, interval);
  }

  setStreamOutput(frame = '') {
    let output = '';
    const linesLength = [];
    const hasActiveSpinners = this.hasActiveSpinners();
    Object
      .values(this.spinners)
      .map(({ text, status, color, spinnerColor, succeedColor, failColor, succeedPrefix, failPrefix, indent }) => {
        let line;
        let prefixLength = indent || 0;
        if (status === 'spinning') {
          prefixLength += frame.length + 1;
          text = breakText(text, prefixLength);
          line = `${_[spinnerColor](frame)} ${color ? _[color](text) : text}`;
        } else {
          if (status === 'succeed') {
            prefixLength += succeedPrefix.length + 1;
            if (hasActiveSpinners) text = breakText(text, prefixLength);
            line = `${_.green(succeedPrefix)} ${_[succeedColor](text)}`;
          } else if (status === 'fail') {
            prefixLength += failPrefix.length + 1;
            if (hasActiveSpinners) text = breakText(text, prefixLength);
            line = `${_.red(failPrefix)} ${_[failColor](text)}`;
          } else {
            if (hasActiveSpinners) text = breakText(text, prefixLength);
            line = color ? _[color](text) : text;
          }
        }
        linesLength.push(...getLinesLength(text, prefixLength));
        output += indent ? `${" ".repeat(indent)}${line}\n` : `${line}\n`;
      });

    if(!hasActiveSpinners) readline.clearScreenDown(this.stream);
    writeStream(this.stream, output, linesLength);
    if (hasActiveSpinners) cleanStream(this.stream, linesLength);
    this.lineCount = linesLength.length;
  }

  setRawStreamOutput() {
    Object.values(this.spinners).forEach(i => {
      process.stderr.write(`- ${i.text}\n`);
    });
  }

  checkIfActiveSpinners() {
    if (!this.hasActiveSpinners()) {
      if (this.spin) {
        this.setStreamOutput();
        readline.moveCursor(this.stream, 0, this.lineCount);
        clearInterval(this.currentInterval);
        this.isCursorHidden = false;
        cliCursor.show();
      }
      this.spinners = {};
    }
  }

  bindSigint(lines) {
    process.removeAllListeners('SIGINT');
    process.on('SIGINT', () => {
      cliCursor.show();
      readline.moveCursor(process.stderr, 0, this.lineCount);
      process.exit(0);
    });
  }
}

function purgeSpinnerOptions(options) {
  const {text, status, indent} = options;
  const opts = {text, status, indent};
  const colors = colorOptions(options);
  if (!VALID_STATUSES.includes(status)) delete opts.status;
  if (typeof text !== 'string') delete opts.text;
  if (typeof indent !== 'number') delete opts.indent;
  return {...colors, ...opts};
}

function purgeSpinnersOptions({spinner, disableSpins, ...others}) {
  const colors = colorOptions(others);
  const prefixes = prefixOptions(others);
  const disableSpinsOption = typeof disableSpins === 'boolean' ? {disableSpins} : {};
  spinner = turnToValidSpinner(spinner);
  return {...colors, ...prefixes, ...disableSpinsOption, spinner}
}

function turnToValidSpinner(spinner = {}) {
  const platformSpinner = SPINNER_CONFIG;
  if (!typeof spinner === 'object') return platformSpinner;
  let { interval, frames } = spinner;
  if (!Array.isArray(frames) || frames.length < 1) frames = platformSpinner.frames;
  if (typeof interval !== 'number') interval = platformSpinner.interval;
  return {interval, frames};
}

function colorOptions({color, succeedColor, failColor, spinnerColor}) {
  const colors = { color, succeedColor, failColor, spinnerColor };
  Object.keys(colors).forEach(key => {
    if (!VALID_COLORS.includes(colors[key])) delete colors[key];
  });

  return colors;
}

function prefixOptions({succeedPrefix, failPrefix}) {
  if(terminalSupportsUnicode()) {
    succeedPrefix = succeedPrefix || '✓';
    failPrefix = failPrefix || '✖';
  } else {
    succeedPrefix = succeedPrefix || '√';
    failPrefix = failPrefix || '×';
  }
  return {succeedPrefix, failPrefix};
}

function breakText(text, prefixLength) {
  return text.split('\n')
    .map((line, index) => index === 0 ? breakLine(line, prefixLength) : breakLine(line, 0))
    .join('\n');
}

function breakLine(line, prefixLength) {
  const columns = process.stderr.columns || 95;
  return line.length  >= columns - prefixLength
    ? `${line.substring(0, columns - prefixLength - 1)}\n${
      breakLine(line.substring(columns - prefixLength - 1, line.length), 0)
    }`
    : line;
}

function getLinesLength(text, prefixLength) {
  return stripAnsi(text)
    .split('\n')
    .map((line, index) => index === 0 ? line.length + prefixLength : line.length);
}

function writeStream(stream, output, rawLines) {
  stream.write(output);
  readline.moveCursor(stream, 0, -rawLines.length);
}

function cleanStream(stream, rawLines) {
  rawLines.forEach((lineLength, index) => {
    readline.moveCursor(stream, lineLength, index);
    readline.clearLine(stream, 1);
    readline.moveCursor(stream, -lineLength, -index);
  });
  readline.moveCursor(stream, 0, rawLines.length);
  readline.clearScreenDown(stream);
  readline.moveCursor(stream, 0, -rawLines.length);
}

function terminalSupportsUnicode() {
  // The default command prompt and powershell in Windows do not support Unicode characters.
  // However, the VSCode integrated terminal and the Windows Terminal both do.
  return process.platform !== 'win32'
    || process.env.TERM_PROGRAM === 'vscode'
    || !!process.env.WT_SESSION
}
