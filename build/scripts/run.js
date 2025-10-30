#!/usr/bin/env node

import _ from 'yoctocolors';
import {spawn} from 'node:child_process';

async function main() {
  const args = process.argv.slice(2);
  const platform = args.find(arg => !arg.startsWith('--'));
  const openUrl = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
  const config = ((port = 8080) => {
    return {
      web: `${openUrl} http://localhost:${port}`,
      android: 'cd client && pnpx react-native run-android --no-packager',
      ios: 'cd client && pnpx react-native run-ios --no-packager',
      macos: 'cd client && pnpx react-native run-macos --no-packager',
      windows: 'cd client && pnpx react-native run-windows --no-packager',
    };
  })(parseInt(args[args.indexOf('--port') + 1]) || 8080);

  // Validate platform
  const command = config[platform];
  if (!command) {
    console.log(_.red('✘'), `Invalid platform: ${platform}`);
    console.log('Available platforms:', Object.keys(config).join(', '));
    process.exit(1);
  }

  // Validate apple support
  if ((platform === 'ios' || platform === 'macos') && process.platform !== 'darwin') {
    console.log(_.red('✘'), 'No Apple platforms supported on this device');
    process.exit(1);
  }

  // Validate windows support
  if (platform === 'windows' && process.platform !== 'win32') {
    console.log(_.red('✘'), 'No Windows platforms supported on this device');
    process.exit(1);
  }

  // Try to launch platform
  try {
    const [cmd, ...cmdArgs] = command.split(' ');
    const child = spawn(cmd, cmdArgs, {stdio: 'inherit', shell: true});
    child.on('error', (error) => {
      console.log(_.red('✘'), `Failed to start ${platform}: ${error.message}`);
      process.exit(1);
    });
    child.on('exit', (code) => {
      if (code !== 0) {
        console.log(_.red('✘'), `${platform} exited with code ${code}`);
        process.exit(code);
      }
    });
  } catch (error) {
    console.log(_.red('✘'), `Error launching ${platform}: ${error.message}`);
    process.exit(1);
  }
}

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));
main().catch((_error) => process.exit(1));
