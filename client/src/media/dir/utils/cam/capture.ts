export async function capture() {
  // Request camera access
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {facingMode: 'environment'},
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

  // Create canvas to capture frame
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    stream.getTracks().forEach(track => track.stop());
    throw new Error('Failed to get canvas context');
  }

  // Draw video frame to canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Stop camera stream
  stream.getTracks().forEach(track => track.stop());

  // Convert canvas to blob, then to File
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to create blob'));
    }, 'image/jpeg', 0.95);
  });

  // Create File object with timestamp name
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const file = new File([blob], `camera-${timestamp}.jpg`, {type: 'image/jpeg'});
  return file;
}
