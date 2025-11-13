import type {PhotoFile, TakeSnapshotOptions} from 'react-native-vision-camera';
import {CameraCaptureError} from './camera-errors';
import {takePhotoFromVideo} from './take-photo';

/**
 * Take a snapshot from a video element using canvas
 * This is faster than takePhoto as it doesn't perform any precapture sequences
 * On web, snapshots and photos use the same implementation (canvas capture)
 */
export async function takeSnapshotFromVideo(
  videoElement: HTMLVideoElement,
  options?: TakeSnapshotOptions,
): Promise<PhotoFile> {
  try {
    // Convert quality from 0-100 range (TakeSnapshotOptions) to 0-1 range (canvas.toBlob)
    const quality = (options?.quality ?? 100) / 100;

    // Use the same implementation as takePhoto, just with configurable quality
    return takePhotoFromVideo(videoElement, undefined, quality);
  } catch (error) {
    // Re-throw with snapshot-specific error code if it's a CameraCaptureError
    if (error instanceof CameraCaptureError) {
      // If it's already a snapshot error, re-throw as-is
      if (error.code === 'capture/snapshot-failed' || error.code === 'capture/snapshot-failed-preview-not-enabled') {
        throw error;
      }
      // Otherwise, wrap it in a snapshot error
      throw new CameraCaptureError(
        'capture/snapshot-failed',
        error.message,
      );
    }
    throw new CameraCaptureError(
      'capture/snapshot-failed',
      error instanceof Error ? error.message : 'Failed to take snapshot',
    );
  }
}

