/**
 * Request camera access and create a video element
 */
export async function setupCamera(facingMode: 'user' | 'environment' = 'environment') {
  // Request camera access
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {facingMode},
    audio: false,
  });

  // Create video element to capture frame
  const video = document.createElement('video');
  video.srcObject = stream;
  video.autoplay = true;
  video.playsInline = true;

  // Wait for video to be ready
  await new Promise<void>((resolve) => {
    video.onloadedmetadata = () => {
      video.play().then(() => resolve());
    };
  });

  return {stream, video};
}

/**
 * Stop all tracks in a media stream
 */
export function stopStream(stream: MediaStream) {
  stream.getTracks().forEach(track => track.stop());
}

/**
 * Generate a timestamp-based filename
 */
export function generateTimestampFilename(prefix: string, extension: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `${prefix}-${timestamp}.${extension}`;
}

