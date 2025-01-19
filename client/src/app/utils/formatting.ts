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

export function toPathInfo(url: string, isDirectory: boolean) {
  // Normalize path to use forward slashes (remove /browse prefix)
  const _path = decodeURIComponent(url).replace(/^\/browse\/?/, '').replace(/\\/g, '/');
  // Split path into parts
  const parts = _path.split('/').filter(Boolean);
  // Get the last part (could be filename or folder name)
  const last = parts.pop() || '';
  // Find the last dot in the filename
  const dot = isDirectory ? -1 : last.lastIndexOf('.');
  // Build the base path (without the last part)
  const base = parts.join('/');
  // Build the full path
  const path = base ? `${base}/${last}` : last;
  return {
    ext: !isDirectory && dot !== -1 ? last.slice(dot + 1) : '',
    name: !isDirectory && dot !== -1 ? last.slice(0, dot) : last,
    base,
    path,
    parts,
  };
}
