import _ from 'yoctocolors';
import {QR} from '@qrgrid/core';
import stripAnsi from 'strip-ansi';

const SPACING = 4;
const UTF_CHAR = {
  blank: " ",
  bottom: "▄",
  full: "█",
  top: "▀",
};

export default function QRCodes(input) {
  const entries = Array.isArray(input) ? input.filter(Boolean) : [input];
  const qrcodes = entries.map(input => new QR(input.url, {errorCorrection: 'L', gridSize: 10}));
  const gridSize = qrcodes[0].gridSize;

  // Add labels first
  let _output = ' ';
  for (let qrIndex = 0; qrIndex < qrcodes.length; qrIndex++) {
    const lastLabel = entries[qrIndex-1]?.label;
    const padding = lastLabel?.length
      ? (gridSize + SPACING) - (stripAnsi(lastLabel).length)
      : 0;
    _output += ((padding > 0 ? ' '.repeat(padding) : '') + entries[qrIndex].label);
  }

  // Iterate through rows, two at a time
  _output += '\n';
  for (let i = 0; i < gridSize; i += 2) {
    _output += ' ';
    // For each QR code
    for (let qrIndex = 0; qrIndex < qrcodes.length; qrIndex++) {
      // For each column in current QR code
      for (let j = 0; j < gridSize; j++) {
        const qr = qrcodes[qrIndex];
        const top = qr.data[i * gridSize + j];
        const bottom = qr.data[(i + 1) * gridSize + j];
        if (top && bottom) {
          _output += _.gray(UTF_CHAR.full);
        } else if (top && !bottom) {
          _output += _.gray(UTF_CHAR.top);
        } else if (!top && bottom) {
          _output += _.gray(UTF_CHAR.bottom);
        } else {
          _output += UTF_CHAR.blank;
        }
      }
      // Add spacing between QR codes
      _output += ' '.repeat(SPACING);
    }
    _output += '\n';
  }
  return _output;
}
