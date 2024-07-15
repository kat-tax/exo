export function colorWithOpacity(color: string, opacity: number): string {
  let _color = color;
  // Remove any leading whitespace and convert to lowercase
  _color = _color.trim().toLowerCase();
  // Check if the color is in a valid format (hex, rgb, or rgba)
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color)) {
    // If it's a hex color, convert it to rgba
    _color = hexToRgba(color, opacity);
  } else if (/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.test(color)) {
    // If it's an rgb color, add the opacity directly
    _color = color.replace(/\)/, `, ${opacity})`);
  } else if (/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(0\.\d+|1(\.0*)?)\)$/i.test(color)) {
    // If it's already rgba, update the opacity
    _color = color.replace(/(,)\s*(0\.\d+|1(\.0*)?)\)$/i, `, ${opacity})`);
  }
  return _color;
}

export function hexToRgba(hex: string, opacity: number): string {
  let _hex = hex;
  _hex = _hex.replace(/^#/, '');

  if (_hex.length === 3) {
    _hex = _hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const bigint = Number.parseInt(_hex, 16);
  const red = (bigint >> 16) & 255;
  const green = (bigint >> 8) & 255;
  const blue = bigint & 255;

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}
