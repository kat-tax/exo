#!/usr/bin/env node

import _ from 'yoctocolors';
import stripAnsi from 'strip-ansi';
import concurrently from 'concurrently';
import {PassThrough} from 'node:stream';
import {exec} from 'node:child_process';

import {openUrl} from './utils/url.js';
import {parseConfig} from './utils/config.js';
import {sendMetroCmd} from './utils/metro.js';

import ReadLine from './vendor/ReadLine.js';
import Spinners from './vendor/Spinners.js';
import QRCodes from './vendor/QRCodes.js';

// CONFIGURATION

const command = 'pnpm:*:dev';

const hotkeys = {
  'Launch applications': [
    {key: 'b', label: 'Web Browser'},
    {key: 'a', label: 'Android'},
    {key: 'i', label: 'iOS', disabled: process.platform !== 'darwin'},
    //{key: 'm', label: 'MacOS', disabled: process.platform !== 'darwin'},
    //{key: 'w', label: 'Windows', disabled: process.platform !== 'win32'},
    //{key: 's', label: 'Storybook'},
    //{key: 'l', label: 'Landing Page'},
  ],
  'Control server': [
    {key: 'j', label: 'Devtools'},
    {key: 'r', label: 'Reload'},
    {key: 'c', label: 'Clear'},
    {key: 'h', label: 'Help'},
    {key: 'q', label: 'Quit'},
  ],
  'Manage project': [
    {key: 'd', label: 'Dashboard'},
    {key: 'f', label: 'Figma'},
    {key: 'g', label: 'Git'},
  ],
};

const matches = [
  {
    name: 'Web',
    success: /\[client\]\s*\[web\]\s*➜\s*Local:\s*http:\/\/localhost:(\d+)/,
    version: /\[client\]\s*\[web\]\s*VITE\sv(\d+\.\d+\.\d+)\s*ready/,
    failure: /\[client\]\s*\[web\]\s* ELIFECYCLE\s*(\s*.*)/,
    devserver: (port) => `http://localhost:${port}`,
  },
  {
    name: 'Native',
    success: /\[client\]\s*\[native\]\s*Fast\s*-\s*Scalable\s*-\s*Integrated/,
    version: /\[client\]\s*\[native\]\s*Welcome to Metro v(\d+\.\d+\.\d+)/,
    failure: /\[client\]\s*\[native\]\s* ELIFECYCLE\s*(\s*.*)/,
    devserver: () => 'http://localhost:8081',
  },
  {
    name: 'Storybook',
    success: /\[storybook\]\s*\[storybook:web\]\s*│\s*Local:\s*http:\/\/localhost:(\d+)/,
    version: /\[storybook\]\s*\[storybook:web\]\s*│\s*Storybook\s*(\d+\.\d+\.\d+)\s*for\s*react-vite\s*started/,
    failure: /\[storybook\]\s*\[storybook:web\]\s* ELIFECYCLE\s*(\s*.*)/,
    devserver: (port) => `http://localhost:${port}`,
  },
  {
    name: 'Documentation',
    success: /\[docs\]\s*➜\s*Local:\s*http:\/\/localhost:(\d+)/,
    version: /\[docs\]\s*\[running\]\s*vocs@v(\d+\.\d+\.\d+)/,
    failure: /\[docs\]\s* ELIFECYCLE\s*(\s*.*)/,
    devserver: (port) => `http://localhost:${port}`,
  },
];

// INITIALIZATION

console.log(_.italic('Welcome to ULT. Godspeed!\n'));
const _servers = {};
let _finished = false;
let _exiting = false;
let _ending = false;
let _lanIP = '';

// TRANSMUTATION

const lineOutput = new PassThrough({objectMode: true});
const readLine = new ReadLine({skipEmpty: true});
const bridge = new PassThrough();
bridge.pipe(readLine).pipe(lineOutput);

// PROGRESSION

const $ = new Spinners();
//$.add('Storybook', {text: `${_.bold('Storybook')} • ${_.gray('starting…')}`});
//$.add('Landing', {text: `${_.bold('Landing')} • ${_.gray('starting…')}`});
$.add('Web', {text: `${_.bold('Web')} • ${_.gray('starting…')}`});
$.add('Native', {text: `${_.bold('Native')} • ${_.gray('starting…')}`});

// EXECUTION

const {commands} = concurrently([command], {outputStream: bridge, killSignal: 'SIGINT'});
lineOutput.on('data', (line) => {
  if (_exiting) return;
  const _line = stripAnsi(line);

  // Exclude unnecessary lines
  if (_line.startsWith('[translate]')) return;
  if (_line.includes('JavaScript logs have moved!')) return;
  if (_line.includes('Interactive mode is not supported in this environment')) return;
  if (_line.includes('Dev server ready.')) return;

  // After startup, output all other lines
  if (_finished) return console.log(line);

  // Search for command error (search for red in raw line, not stripped)
  if (line.match(/\u001b\[31m|\u001b\[91m/) && !_line.includes(' ELIFECYCLE')) {
    console.error(line);
  }

  // Search for lan address
  if (_line.match(/http:\/\/(?:192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[0-1])\.\d+\.\d+)/)) {
    _lanIP = _line.match(/http:\/\/(?:192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[0-1])\.\d+\.\d+)/)[0];
  }

  for (const match of matches) {
    // Initialize server object
    let server = _servers[match.name];
    if (!server) server = _servers[match.name] = {};

    // Found the port, report success
    const found = match.success && _line.match(match.success);
    if (found) {
      if (found.length > 1)
        _servers[match.name] = {...server, port: found[1]};
      $.update(match.name, {
        status: 'success',
        text: `${_.green('✔')} ${_.bold(match.name)} • ${_.underline(match.devserver(found[1]))}`,
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

  // When everything is done (no spinners left), run callback
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
      case 'b':
        exec(`pnpm ult-run web --port ${_servers.Web.port}`);
        break;
      case 's':
        exec(`pnpm ult-run web --port ${_servers.Storybook.port}`);
        break;
      case 'r':
        sendMetroCmd('reload', _servers.Native.port);
        break;
      case 'j':
        sendMetroCmd('open-debugger', _servers.Native.port);
        break;
      case 'd':
        openUrl(`http://ult.dev`);
        break;
      case 'f':
        const config = parseConfig();
        openUrl(config.LINK_FIGMA + '?try-plugin-id=821138713091291738&try-plugin-version-id=139053&try-plugin-name=Figma+-%3E+React+Native&is-widget=0&is-playground-file=0&try-plugin-file-key=tmRcxoy1M3XdGWYKoJQDOt&mode=design&type=design');
        break;
      case 'g':
        const gitConfig = parseConfig();
        openUrl(gitConfig.LINK_GITHUB);
        break;
      case 'i':
        if (process.platform === 'darwin') {
          exec('pnpm ult-run ios');
        }
        break;
      case 'a':
        exec('pnpm ult-run android');
        break;
      // case 'm':
      //   if (process.platform === 'darwin') {
      //     exec('pnpm ult-run macos');
      //   }
      //   break;
      // case 'w':
      //   exec('pnpm ult-run windows');
      //   break;
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
      _servers.Web.version && {label: `${_.gray(`${_.bold('Web')} [Vite ${_servers.Web.version}]`)}`, url: `${_lanIP}:${_servers.Web.port}`},
      _servers.Native.version && {label: `${_.gray(`${_.bold('Native')} [Metro ${_servers.Native.version}]`)}`, url: `${_lanIP}:8081`},
    ]));
    // Show more QR codes if requested
    // if (ondemand) {
    //   console.log(QRCodes([
    //     _servers.Storybook.version && {label: `${_.gray(`${_.bold('Storybook')} [v${_servers.Storybook.version}]`)}`, url: `${_lanIP}:${_servers.Storybook.port}`},
    //     _servers.Documentation.version && {label: `${_.gray(`${_.bold('Documentation')} [v${_servers.Documentation.version}]`)}`, url: `${_lanIP}:${_servers.Documentation.port}`},
    //   ]));
    // }
  } else {
    console.log();
  }

  // Get max width for each column
  const _hotkeys = Object.entries(hotkeys);
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
      ...hotkeys.map(h => h.disabled
        ? _.gray(`[${h.key}] = ${h.label}`)
        : `[${_.yellow(h.key)}] = ${_.bold(h.label)}`),
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
