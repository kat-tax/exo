export function bytesize(bytes: number) {
  const a = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const s = 1000;
  let b = bytes;
  let u = 0;
  while (b >= s || -b >= s) {b /= s; u++}
  return `${u ? b.toFixed(1) : b} ${a[u]}`;
}

export function toText(input?: AllowSharedBufferSource) {
  return new TextDecoder('utf-8').decode(input);
}

export function toJSON(input?: AllowSharedBufferSource) {
  return JSON.parse(toText(input));
}

export function toTimeRange(from: number, to: number) {
  const c = Math.ceil(from);
  const cH = Math.floor(c / 3600);
  const cM = Math.floor((c % 3600) / 60);
  const cS = c % 60;
  const cHours = cH.toString().padStart(2, '0');
  const cMinutes = cM.toString().padStart(2, '0');
  const cSeconds = cS.toString().padStart(2, '0');
  
  const d = Math.ceil(to);
  const dH = Math.floor(d / 3600);
  const dM = Math.floor((d % 3600) / 60);
  const dS = d % 60;
  const dHours = dH.toString().padStart(2, '0');
  const dMinutes = dM.toString().padStart(2, '0');
  const dSeconds = dS.toString().padStart(2, '0');

  const showHours = Number(dH) > 0;
  const currentTime = showHours ? `${cHours}:${cMinutes}:${cSeconds}` : `${cMinutes}:${cSeconds}`;
  const durationTime = showHours ? `${dHours}:${dMinutes}:${dSeconds}` : `${dMinutes}:${dSeconds}`;

  return `${currentTime} / ${durationTime}`;
}

export function toPathInfo(path: string) {
  // Normalize path to use forward slashes
  const normalizedPath = path.replace(/\\/g, '/');
  // Split path into parts
  const parts = normalizedPath.split('/');
  // Get filename (last part)
  const filename = parts.pop() || '';
  // Find the last dot in the filename
  const lastdot = filename.lastIndexOf('.');
  return {
    // Extension without dot (e.g., 'txt')
    extension: lastdot !== -1 ? filename.slice(lastdot + 1) : '',
    // Filename without extension
    name: lastdot !== -1 ? filename.slice(0, lastdot) : filename,
    // Array of all path parts
    parts,
  };
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
