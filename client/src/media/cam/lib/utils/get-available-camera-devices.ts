import {createCameraDeviceFromMediaDevice} from './create-camera-device';
import type {CameraDevice, CameraPosition} from 'react-native-vision-camera';

/**
 * Get available camera devices using web APIs
 */
export async function getAvailableCameraDevices(): Promise<CameraDevice[]> {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    return [];
  }

  try {
    // Request permission first to get device labels
    try {
      await navigator.mediaDevices.getUserMedia({video: true});
    } catch {
      // Permission denied, but we can still enumerate devices (without labels)
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((device) => device.kind === 'videoinput');

    const cameraDevices: CameraDevice[] = [];

    // Try to determine device positions by checking constraints
    // This is more efficient than accessing each device individually
    for (const device of videoDevices) {
      let position: CameraPosition = 'back'; // Default to back camera

      // Try to determine position from device label if available
      const label = device.label.toLowerCase();
      if (label.includes('front') || label.includes('user') || label.includes('facing')) {
        position = 'front';
      } else if (label.includes('back') || label.includes('environment') || label.includes('rear')) {
        position = 'back';
      } else {
        // Try to get facingMode by requesting a quick stream (with timeout)
        try {
          const stream = await Promise.race([
            navigator.mediaDevices.getUserMedia({
              video: {deviceId: {exact: device.deviceId}},
            }),
            new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error('Timeout')), 500)
            ),
          ]);

          const track = stream.getVideoTracks()[0];
          const settings = track.getSettings();
          const facingMode = settings.facingMode;

          if (facingMode === 'user') {
            position = 'front';
          } else if (facingMode === 'environment') {
            position = 'back';
          }

          track.stop();
        } catch {
          // If we can't determine, default to back
          position = 'back';
        }
      }

      cameraDevices.push(createCameraDeviceFromMediaDevice(device, position));
    }

    return cameraDevices;
  } catch (error) {
    console.error('Failed to enumerate camera devices:', error);
    return [];
  }
}

