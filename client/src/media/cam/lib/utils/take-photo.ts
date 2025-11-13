import type {PhotoFile, TakePhotoOptions} from 'react-native-vision-camera';
import {CameraCaptureError} from './camera-errors';

/**
 * Take a photo from a video element using ImageCapture API (with flash support) or canvas fallback
 * @param quality JPEG quality (0-1), defaults to 0.95
 */
export async function takePhotoFromVideo(
  videoElement: HTMLVideoElement,
  options?: TakePhotoOptions,
  quality: number = 0.95,
): Promise<PhotoFile> {
  if (!videoElement || !videoElement.videoWidth || !videoElement.videoHeight) {
    throw new CameraCaptureError(
      'capture/frame-invalid',
      'Video element is not ready or has no video dimensions',
    );
  }

  // Try to use ImageCapture API if flash is requested and API is available
  const flashMode = (options as any)?.flash;
  const useImageCapture = typeof ImageCapture !== 'undefined' &&
                          flashMode &&
                          flashMode !== 'off' &&
                          videoElement.srcObject instanceof MediaStream;

  if (useImageCapture) {
    try {
      const stream = videoElement.srcObject as MediaStream;
      const track = stream.getVideoTracks()[0];

      if (track && track.readyState === 'live') {
        const imageCapture = new ImageCapture(track);

        // Map react-native-vision-camera flash modes to ImageCapture fillLightMode
        // 'on' -> 'flash', 'auto' -> 'auto', 'off' -> 'off'
        const fillLightMode = flashMode === 'on' ? 'flash' : flashMode === 'auto' ? 'auto' : 'off';

        // Check capabilities first to ensure flash is supported
        const capabilities = await imageCapture.getPhotoCapabilities();
        if (capabilities.fillLightMode?.includes(fillLightMode)) {
          const blob = await imageCapture.takePhoto({fillLightMode});

          // Create a temporary file URL
          const url = URL.createObjectURL(blob);
          const path = url;

          // Get dimensions from the blob by creating an image
          const dimensions = await new Promise<{width: number; height: number}>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              resolve({width: img.width, height: img.height});
            };
            img.onerror = reject;
            img.src = url;
          });

          return {
            path,
            width: dimensions.width,
            height: dimensions.height,
            isRawPhoto: false,
            orientation: 'landscape-left' as const,
            isMirrored: false,
          };
        }
      }
    } catch (error) {
      // If ImageCapture fails, fall back to canvas method
      console.warn('ImageCapture API failed, falling back to canvas method:', error);
    }
  }

  // Fallback to canvas method (original implementation)
  try {
    // Create a canvas to capture the frame
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new CameraCaptureError('capture/image-data-access-error', 'Failed to get canvas context');
    }

    // Draw the video frame to canvas
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new CameraCaptureError('capture/image-data-access-error', 'Failed to create blob from canvas'));
          }
        },
        'image/jpeg',
        quality,
      );
    });

    // Create a temporary file URL
    const url = URL.createObjectURL(blob);
    const path = url; // On web, we use blob URLs as paths

    // Get dimensions
    const width = canvas.width;
    const height = canvas.height;

    // Determine orientation (web cameras are typically landscape)
    // For now, assume landscape-left as default
    const orientation = 'landscape-left' as const;

    // Check if mirrored (front camera)
    const isMirrored = false; // We handle mirroring in CSS, not in the capture

    return {
      path,
      width,
      height,
      isRawPhoto: false,
      orientation,
      isMirrored,
    };
  } catch (error) {
    if (error instanceof CameraCaptureError) {
      throw error;
    }
    throw new CameraCaptureError(
      'capture/unknown',
      error instanceof Error ? error.message : 'Failed to take photo',
    );
  }
}

