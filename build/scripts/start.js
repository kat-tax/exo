import _ from 'yoctocolors';
import stripAnsi from 'strip-ansi';
import concurrently from 'concurrently';
import {PassThrough} from 'node:stream';
import {exec} from 'node:child_process';

import ReadLine from './lib/ReadLine.js';
import Spinners from './lib/Spinners.js';
import QRCodes from './lib/QRCodes.js';
import HotKeys from './cfg/hotkeys.js';
import Matches from './cfg/matches.js';

// Initialization
console.log(_.italic('Welcome to EXO. Godspeed!\n'));
const _servers = {};
let _finished = false;
let _exiting = false;
let _ending = false;
let _lanIP = '';

// Transmutation
const lineOutput = new PassThrough({objectMode: true});
const readLine = new ReadLine({skipEmpty: true});
const bridge = new PassThrough();
bridge.pipe(readLine).pipe(lineOutput);

// Progression
const $ = new Spinners();
//$.add('Documentation', {text: `${_.bold('Documentation')} • ${_.gray('starting…')}`});
//$.add('Storybook', {text: `${_.bold('Storybook')} • ${_.gray('starting…')}`});
$.add('Native', {text: `${_.bold('Native')} • ${_.gray('starting…')}`});
$.add('Web', {text: `${_.bold('Web')} • ${_.gray('starting…')}`});

// Execution
const {commands} = concurrently(['pnpm:*:start'], {
  outputStream: bridge,
  killSignal: 'SIGINT',
});

// Detection
lineOutput.on('data', (line) => {
  if (_exiting) return;
  const _line = stripAnsi(line);
  // Exclude translations
  if (_line.startsWith('[translate]')) return;
  if (_finished) return console.log(line);
  // Search for command error (search for red in raw line, not stripped)
  if (line.match(/\u001b\[31m|\u001b\[91m/) && !_line.includes(' ELIFECYCLE'))
    console.error(line);
  // Search for lan address
  if (_line.match(/http:\/\/(?:192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[0-1])\.\d+\.\d+)/)) {
    _lanIP = _line.match(/http:\/\/(?:192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[0-1])\.\d+\.\d+)/)[0];
  }
  for (const match of Matches) {
    let server = _servers[match.name];
    if (!server) server = _servers[match.name] = {};
    // Found the port, report success
    const success = match.success && _line.match(match.success);
    if (success) {
      if (success.length > 1)
        _servers[match.name] = {...server, port: success[1]};
      $.update(match.name, {
        status: 'success',
        text: `${_.green('✔')} ${_.bold(match.name)} • ${_.underline(match.devserver(success[1]))}`,
      });
      return;
    }
    // Found the version, report success
    const version = match.version && _line.match(match.version);
    if (version) {
      _servers[match.name] = {...server, version: version[1]};
    }
    // Found the failure, report failure
    const failure = match.failure && _line.match(match.failure);
    if (failure) {
      const message = failure.length > 1 ? failure[1] : 'Failed to start';
      $.update(match.name, {
        status: 'failure',
        text: `${_.red('✘')} ${_.bold(match.name)} • ${_.red(message)}`
      });
    }
  }
  if (!_ending && !$.hasActiveSpinners()) {
    _ending = true;
    $.stopAll();
    setTimeout(done, 100);
  }
}).on('end', $.stopAll);

/**
 * Handler when all expected output has been received
 */
function done() {
  _finished = true;
  process.stdin.setRawMode(true);
  process.stdin.setEncoding('utf8');
  process.stdin.resume();
  process.stdin.on('data', (buf) => {
    const key = buf.toString();
    if (key === '\u0003' || key === 'q')
      exit();
    switch(key) {
      case 'd':
        exec(`open http://localhost:${_servers.Documentation.port}`);
        break;
      case 's':
        exec(`open http://localhost:${_servers.Storybook.port}`);
        break;
      case 'a':
        exec('pnpm android');
        break;
      case 'w':
        exec(`open http://localhost:${_servers.Web.port}`);
        break;
      case 'i':
        exec('pnpm ios');
        break;
      case 'm':
        exec('pnpm macos');
        break;
      case 'x':
        exec('pnpm windows');
        break;
      case 'b':
        exec('pnpm build');
        break;
      case 'u':
        exec('pnpm update');
        break;
      case 'p':
        exec('pnpm publish');
        break;
      case 'h':
        help(true);
        break;
      case 'c':
        process.stdout.write('\x1Bc');
        break;
      case 'r':
        // TODO
        break;
    }
  });
  help();
}

/**
 * Handler after startup or "h" hotkey is pressed
 */
function help(ondemand) {
  if (ondemand) {
    console.log();
    console.log(' ' + _.bgWhiteBright(_.black(_.bold(' '.repeat(18) + 'EXO COMMAND CENTER' + ' '.repeat(18)))));
  }

  if (_lanIP) {
    console.log();
    // Show QR codes for web and native
    console.log(QRCodes([
      _servers.Web.version && {label: `${_.gray(`${_.bold('Web Server')} [v${_servers.Web.version}]`)}`, url: `${_lanIP}:${_servers.Web.port}`},
      _servers.Native.version && {label: `${_.gray(`${_.bold('Native Server')} [v${_servers.Native.version}]`)}`, url: `${_lanIP}:8081`},
    ]));
    // Show more QR codes if requested
    if (ondemand) {
      console.log(QRCodes([
        _servers.Storybook.version && {label: `${_.gray(`${_.bold('Storybook')} [v${_servers.Storybook.version}]`)}`, url: `${_lanIP}:${_servers.Storybook.port}`},
        _servers.Documentation.version && {label: `${_.gray(`${_.bold('Documentation')} [v${_servers.Documentation.version}]`)}`, url: `${_lanIP}:${_servers.Documentation.port}`},
      ]));
    }
  } else {
    console.log();
  }

  // Get max width for each column
  const _hotkeys = Object.entries(HotKeys);
  const columnWidths = _hotkeys.map(([title, hotkeys]) => {
    const titleWidth = stripAnsi(title).length;
    const contentWidth = Math.max(...hotkeys.map(h =>
      stripAnsi(`[${h.key}] = ${h.label}`).length
    ));
    return Math.max(titleWidth, contentWidth) + 3;
  });

  // Convert sections to arrays of lines
  const columns = _hotkeys.map(([title, hotkeys], index) => {
    const lines = [
      _.italic(title),
      '─'.repeat(columnWidths[index] - 3),
      ...hotkeys.map(h => `[${_.yellow(h.key)}] = ${_.bold(h.label)}`),
      ''
    ];
    return lines.map(line => {
      const plainLength = stripAnsi(line).length;
      return line + ' '.repeat(columnWidths[index] - plainLength);
    });
  });
  // Find the maximum number of lines
  const maxLines = Math.max(...columns.map(col => col.length));
  // Print columns side by side
  for (let i = 0; i < maxLines; i++) {
    const row = columns.map((col) => col[i] || ' '.repeat(columnWidths[0]));
    console.log(' ' + row.join(''));
  }
}

/**
 * Handler when "q" or "ctrl+c" hotkey is pressed
 */
function exit() {
  _exiting = true;
  process.on('unhandledRejection', () => {});
  for (const c of commands) c.kill('SIGINT');
  setInterval(() => {
    if (commands.every(c => c.state === 'exited')) {
      console.log(_.italic('\nSuccessfully closed all processes.\n'));
      process.exit(0);
    }
  }, 50);
}
