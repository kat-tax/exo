export default function filenameReservedRegex() {
  return /[<>:"/\\|?*\u0000-\u001F]/g;
}

export function windowsReservedNameRegex() {
  return /^(con|prn|aux|nul|com\d|lpt\d)$/i;
}
