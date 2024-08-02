export function resolve(path: string) {
  return path
    .replace(/^\/browse\/?/, '')
    .split('/');
}
