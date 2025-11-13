import type {PhotoFile, TakePhotoOptions} from 'react-native-vision-camera';
import {CameraCaptureError} from 'react-native-vision-camera';

/**
 * Take a photo from a video element using canvas
 * @param quality JPEG quality (0-1), defaults to 0.95
 */
export async function takePhotoFromVideo(
  videoElement: HTMLVideoElement,
  _options?: TakePhotoOptions,
  quality: number = 0.95,
): Promise<PhotoFile> {
  if (!videoElement || !videoElement.videoWidth || !videoElement.videoHeight) {
    throw new CameraCaptureError(
      'capture/frame-invalid',
      'Video element is not ready or has no video dimensions',
    );
  }

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

