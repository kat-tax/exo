/**
 * Generate logo svgs for icon generation
 *
 * logo-bg.svg
 * 1. Import the BACKGROUND color from config
 * 2. Create the svg using template:
 * ```
 * <svg xmlns="http://www.w3.org/2000/svg" width="108" height="108" viewBox="0 0 108 108">
 *   <path d="M0 0h108v108H0V0z" fill="{BACKGROUND}"/>
 * </svg>
 * 3. Save the svg to build/config/logo-bg.svg
 * ```
 *
 * logo-padded.svg
 * 1. Import the logo.svg from root of repo
 * 2. Add the logo.svg in a 70x70 box centered in a 108x108 box for padding
 * 3. Save the svg to build/config/logo-padded.svg
 * ```
 */

import {writeFileSync, readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import config from 'react-native-ultimate-config/index.web.js';

// Generate logo-bg.svg
const logoBgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="108" height="108" viewBox="0 0 108 108">
  <path d="M0 0h108v108H0V0z" fill="${config.BACKGROUND}"/>
</svg>`;

writeFileSync('./gen/logo-bg.svg', logoBgTemplate, 'utf-8');

// Generate logo-padded.svg
const logoSvgPath = resolve('../../logo.svg');
const logoSvgContent = readFileSync(logoSvgPath, 'utf-8');

// Extract the SVG attributes to get dimensions and viewBox
const svgTagMatch = logoSvgContent.match(/<svg[^>]*>/);
const svgTag = svgTagMatch ? svgTagMatch[0] : '';

// Extract width and height
const widthMatch = svgTag.match(/width="([^"]+)"/);
const heightMatch = svgTag.match(/height="([^"]+)"/);
const viewBoxMatch = svgTag.match(/viewBox="([^"]+)"/);

let logoWidth, logoHeight;

if (viewBoxMatch) {
  // Use viewBox if available - more reliable for scaling
  const viewBoxValues = viewBoxMatch[1].split(/\s+/);
  logoWidth = parseFloat(viewBoxValues[2]);
  logoHeight = parseFloat(viewBoxValues[3]);
} else if (widthMatch && heightMatch) {
  // Fall back to width/height attributes
  logoWidth = parseFloat(widthMatch[1]);
  logoHeight = parseFloat(heightMatch[1]);
} else {
  // Default fallback
  logoWidth = 52;
  logoHeight = 47;
}

// Extract the content inside the original SVG (everything after the opening tag)
const svgContentMatch = logoSvgContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
const innerSvgContent = svgContentMatch ? svgContentMatch[1] : '';

// Calculate transform to center logo in 108x108 canvas
const canvasSize = 108;
const canvasCenter = canvasSize / 2; // 54
const logoCenter = { x: logoWidth / 2, y: logoHeight / 2 };
const translateX = canvasCenter - logoCenter.x;
const translateY = canvasCenter - logoCenter.y;

// Create padded version with logo centered
const logoPaddedSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="108" height="108" viewBox="0 0 108 108">
  <g transform="translate(${translateX}, ${translateY})">
    ${innerSvgContent.trim()}
  </g>
</svg>`;

writeFileSync('./gen/logo-padded.svg', logoPaddedSVG, 'utf-8');
