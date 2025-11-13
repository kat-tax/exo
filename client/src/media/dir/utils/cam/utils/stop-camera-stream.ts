/**
 * Stop all tracks in a camera media stream
 * Similar to how react-native-vision-camera stops camera streams
 */
export function stopCameraStream(stream: MediaStream | null): void {
  if (!stream) return;

  stream.getTracks().forEach((track) => {
    track.stop();
  });
}

