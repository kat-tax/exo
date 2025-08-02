#!/usr/bin/env node

import _ from 'yoctocolors';
import {exec, spawn} from 'node:child_process';

const CONFIG = {
  web: {
    url: 'http://localhost:8080',
    cmd: process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open',
  },
  android: {
    cmd: 'react-native run-android --no-packager',
  },
  ios: {
    cmd: 'react-native run-ios --no-packager',
  },
};

async function launchPlatform(platform) {
  const config = CONFIG[platform];
  if (!config) throw new Error(`Unsupported platform: ${platform}`);

  console.log(_.yellow('🚀'), `Launching ${platform}...`);

  if (platform === 'web') {
    // For web, open the browser
    exec(`${config.cmd} ${config.url}`);
    console.log(_.green('✔'), `Opened ${config.url} in browser`);
  } else {
    // For mobile platforms, run the launch command
    const child = spawn(config.cmd, {shell: true, stdio: 'inherit'});
    return new Promise((resolve, reject) => {
      child.on('close', (code) => {
        if (code === 0) {
          console.log(_.green('✔'), `${platform} app launched successfully`);
          resolve();
        } else {
          console.log(_.red('✘'), `Failed to launch ${platform} app (exit code: ${code})`);
          reject(new Error(`Launch failed with code ${code}`));
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
  const platform = args[0];

  // Validate platform choice
  if (!Object.keys(CONFIG).includes(platform)) {
    console.log(_.red('✘'), `Invalid platform: ${platform}`);
    process.exit(1);
  }

  // Validate platform support
  if (platform === 'ios' && process.platform !== 'darwin') {
    console.log(_.red('✘'), 'iOS development is only supported on macOS');
    process.exit(1);
  }

  try {
    await launchPlatform(platform);
  } catch (error) {
    console.log(_.red('💥'), 'Launch failed:', error.message);
    process.exit(1);
  }
}

process.on('SIGINT', () => {
  console.log(_.yellow('\n👋'), 'Launch script interrupted');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(_.yellow('\n👋'), 'Launch script terminated');
  process.exit(0);
});

main().catch((error) => {
  console.error(_.red('💥'), 'Unexpected error:', error);
  process.exit(1);
});
