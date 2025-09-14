import {exec} from 'node:child_process';

/**
 * Open URL in default browser
 * @param url - URL to open
 */
export function openUrl(url) {
  if (!url) {
    console.log('>> URL not found in config');
    return;
  }
  let command;
  if (process.platform === 'win32') {
    command = `start "" "${url}"`;
  } else if (process.platform === 'darwin') {
    command = `open "${url}"`;
  } else {
    command = `xdg-open "${url}"`;
  }
  exec(command, (error) => {
    if (error) {
      console.error('>> Failed to open URL:', error.message);
    }
  });
}
