import type {CameraDevice} from 'react-native-vision-camera';

/**
 * Get a camera media stream using web APIs
 * Similar to how react-native-vision-camera manages camera streams
 */
export async function getCameraStream(device: CameraDevice): Promise<MediaStream> {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error('getUserMedia is not supported in this browser');
  }

  // Use device ID if available, otherwise fall back to facingMode
  const constraints: MediaStreamConstraints = {
    video: device.id
      ? {deviceId: {exact: device.id}}
      : {facingMode: device.position === 'front' ? 'user' : 'environment'},
    audio: false,
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get camera stream: ${error.message}`);
    }
    throw new Error('Failed to get camera stream');
  }
}

