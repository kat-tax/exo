export function bytesize(bytes: number) {
  const a = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const s = 1000;
  let b = bytes;
  let u = 0;
  while (b >= s || -b >= s) {b /= s; u++}
  return `${u ? b.toFixed(1) : b} ${a[u]}`;
}

export function hashToFiles(hash: string) {
  return decodeURIComponent(hash.slice(1)
    ?.replace(/\+/g, ' ')
    ?.replace(/%20/g, ' ')
    ?.replace(/%2C/g, ',')
  )?.split(',')
    ?.map(e => e.trim())
    ?.filter(e => e);
}

export function filesToHash(files: string[]) {
  return `#${encodeURIComponent(files.join(','))
    .replace(/%20/g, '+')
    .replace(/%2C/g, ',')
  }`;
}

export function toText(input?: AllowSharedBufferSource) {
  return new TextDecoder('utf-8').decode(input);
}

export function toJSON(input?: AllowSharedBufferSource) {
  return JSON.parse(toText(input));
}
