import http from 'node:http';

/**
 * Reload React Native app via Metro bundler
 * @param command - Command for Metro bundler (e.g. 'reload', 'open-debugger')
 * @param port - Port for Metro bundler (default: 8081)
 */
export function sendMetroCmd(command, port) {
  const metroPort = port || 8081;
  const postData = '';
  const options = {
    hostname: 'localhost',
    port: metroPort,
    path: `/${command}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  const req = http.request(options);
  req.write(postData);
  req.end();
}
