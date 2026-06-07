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
