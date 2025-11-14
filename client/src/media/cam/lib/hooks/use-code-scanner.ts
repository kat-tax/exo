import {useCallback, useMemo, useRef} from 'react';
import type {useCodeScanner as _, CodeScannerFrame, Code} from 'react-native-vision-camera';

// Map Barcode Detection API formats to react-native-vision-camera Code types
const formatMap: Record<string, Code['type']> = {
  'qr_code': 'qr',
  'aztec': 'aztec',
  'data_matrix': 'data-matrix',
  'pdf417': 'pdf-417',
  'code_128': 'code-128',
  'code_39': 'code-39',
  'code_93': 'code-93',
  'codabar': 'codabar',
  'ean_13': 'ean-13',
  'ean_8': 'ean-8',
  'itf': 'itf',
  'upc_a': 'upc-a',
  'upc_e': 'upc-e',
};

// Convert Barcode Detection API result to react-native-vision-camera Code format
function convertBarcodeToCode(barcode: DetectedBarcode): Code {
  const format = formatMap[barcode.format] || 'unknown';
  const boundingBox = barcode.boundingBox;

  // Convert bounding box to frame format expected by react-native-vision-camera
  // BoundingBox is in DOM coordinates, Code.frame expects { x, y, width, height }
  const frame = {
    x: boundingBox.x,
    y: boundingBox.y,
    width: boundingBox.width,
    height: boundingBox.height,
  };

  // Convert corner points if available
  const corners = barcode.cornerPoints?.map(point => ({
    x: point.x,
    y: point.y,
  })) || [];

  return {
    type: format,
    value: barcode.rawValue,
    frame,
    corners: corners.length > 0 ? corners : undefined,
  };
}

// Create a barcode detector instance
let barcodeDetector: BarcodeDetector | null = null;

function getBarcodeDetector(): BarcodeDetector | null {
  if (typeof window === 'undefined') {
    return null;
  }

  // Check for BarcodeDetector in window or globalThis
  const BarcodeDetectorConstructor = (window as any).BarcodeDetector || (globalThis as any).BarcodeDetector;
  if (!BarcodeDetectorConstructor) {
    return null;
  }

  if (!barcodeDetector) {
    try {
      // Try to create detector with QR code support
      barcodeDetector = new BarcodeDetectorConstructor({
        formats: ['qr_code', 'aztec', 'data_matrix', 'pdf417'],
      });
    } catch (error) {
      console.warn('Failed to create BarcodeDetector:', error);
      return null;
    }
  }

  return barcodeDetector;
}

// Detect barcodes in a video frame
export async function detectBarcodesInVideo(
  videoElement: HTMLVideoElement,
  onCodeScanned: (codes: Code[], frame: CodeScannerFrame) => void,
): Promise<void> {
  const detector = getBarcodeDetector();
  if (!detector || !videoElement || videoElement.readyState !== videoElement.HAVE_ENOUGH_DATA) {
    return;
  }

  try {
    const barcodes = await detector.detect(videoElement);

    if (barcodes.length > 0) {
      const videoWidth = videoElement.videoWidth;
      const videoHeight = videoElement.videoHeight;

      const codes: Code[] = barcodes.map(barcode =>
        convertBarcodeToCode(barcode)
      );

      // Create a frame object
      const frame: CodeScannerFrame = {
        width: videoWidth,
        height: videoHeight,
      };

      onCodeScanned(codes, frame);
    }
  } catch (error) {
    console.error('Barcode detection error:', error);
  }
}

export const useCodeScanner: typeof _ = (codeScanner) => {
  const {onCodeScanned, ...codeScannerOptions} = codeScanner;
  const ref = useRef(onCodeScanned);
  ref.current = onCodeScanned;

  const callback = useCallback((codes: Code[], frame: CodeScannerFrame) => {
    ref.current?.(codes, frame);
  }, []);

  return useMemo(
    () => ({
      ...codeScannerOptions,
      onCodeScanned: callback,
    }),
    [JSON.stringify(codeScannerOptions), callback],
  );
}
