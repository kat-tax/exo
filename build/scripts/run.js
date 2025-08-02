#!/usr/bin/env node

import _ from 'yoctocolors';
import {exec, spawn} from 'node:child_process';

function createConfig(port = 8080) {
  return {
    web: {
      url: `http://localhost:${port}`,
      cmd: process.platform === 'darwin'
        ? 'open'
        : process.platform === 'win32'
          ? 'start'
          : 'xdg-open',
      },
    android: {
      cmd: 'react-native run-android --no-packager',
    },
    ios: {
      cmd: 'react-native run-ios --no-packager',
    },
    macos: {
      cmd: 'react-native run-macos --no-packager',
    },
    windows: {
      cmd: 'react-native run-windows --no-packager',
    },
  };
}

async function launch(platform, config) {
  const target = config[platform];
  if (!target) throw new Error(`Unsupported platform: ${platform}`);
  console.log(`🚀 Launching ${platform}...`);
  if (platform === 'web') {
    exec(`${target.cmd} ${target.url}`);
    console.log(_.green('✔'), `Opened ${target.url} in browser`);
  } else {
    const child = spawn(target.cmd, {shell: true, stdio: 'inherit'});
    return new Promise((resolve, reject) => {
      child.on('close', (code) => {
        if (code === 0) {
          console.log(_.green('✔'), `${platform} app launched successfully`);
          resolve();
        } else {
          console.log(_.red('✘'), `Failed to launch ${platform} app (${code})`);
          reject(code);
        }
      });
      child.on('error', (error) => {
        console.log(_.red('✘'), `Error launching ${platform}:`, error.message);
        reject(error);
      });
    });
  }
}

async function main() {
  const args = process.argv.slice(2);
  const platform = args.find(arg => !arg.startsWith('--'));
  const portFlag = args.indexOf('--port');
  const config = createConfig(parseInt(args[portFlag + 1]) || 8080);

  // Validate platform choice
  if (!platform || !Object.keys(config).includes(platform)) {
    console.log(_.red('✘'), `Invalid platform: ${platform}`);
    console.log('Available platforms:', Object.keys(config).join(', '));
    process.exit(1);
  }

  // Validate apple support
  if ((platform === 'ios' || platform === 'macos') && process.platform !== 'darwin') {
    console.log(_.red('✘'), 'iOS development is only supported on macOS');
    process.exit(1);
  }

  // Validate windows support
  if (platform === 'windows' && process.platform !== 'win32') {
    console.log(_.red('✘'), 'Windows development is only supported on Windows');
    process.exit(1);
  }

  // Try to launch platform
  try {
    await launch(platform, config);
  } catch (error) {
    process.exit(1);
  }
}

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));
main().catch((_error) => process.exit(1));
