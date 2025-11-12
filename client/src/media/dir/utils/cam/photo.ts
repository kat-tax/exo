import {setupCamera, stopStream, generateTimestampFilename} from './utils';

export async function capturePhoto(onStart: () => Promise<void>): Promise<File> {
  // Set up camera immediately for preview
  const {stream, video} = await setupCamera('environment');

  try {
    // Wait for onStart callback to trigger capture
    await onStart();

    // Create canvas to capture frame
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      stopStream(stream);
      throw new Error('Failed to get canvas context');
    }

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Stop camera stream
    stopStream(stream);

    // Convert canvas to blob, then to File
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create blob'));
      }, 'image/jpeg', 0.95);
    });

    // Create File object with timestamp name
    const file = new File([blob], generateTimestampFilename('camera', 'jpg'), {
      type: 'image/jpeg',
    });

    return file;
  } catch (error) {
    // Ensure stream is stopped even if there's an error
    stopStream(stream);
    throw error;
  }
}
