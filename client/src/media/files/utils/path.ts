export function resolve(path: string) {
  return path
    .replace(/^\/(browse|file)\/?/, '')
    .split('/');
}
