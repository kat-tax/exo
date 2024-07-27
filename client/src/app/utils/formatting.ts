export function bytesize(bytes: number) {
  const a = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const s = 1000;
  let b = bytes;
  let u = 0;
  while (b >= s || -b >= s) {b /= s; u++}
  return `${u ? b.toFixed(1) : b} ${a[u]}`;
}
