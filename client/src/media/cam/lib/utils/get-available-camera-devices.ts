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
    // Enumerate devices without requesting permission first
    // This prevents the camera indicator from appearing on page load
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((device) => device.kind === 'videoinput');
    const cameraDevices: CameraDevice[] = [];
    // Try to determine device positions from labels only
    // Don't access camera streams here to avoid triggering the camera indicator on page load
    for (const device of videoDevices) {
      let position: CameraPosition = 'back'; // Default to back camera
      const hasFlash = false; // We'll determine flash capability when camera is actually opened
      // Try to determine position from device label if available
      const label = device.label.toLowerCase();
      if (label.includes('front') || label.includes('user') || label.includes('facing')) {
        position = 'front';
      } else if (label.includes('back') || label.includes('environment') || label.includes('rear')) {
        position = 'back';
      }
      // Note: If label doesn't indicate position, we default to 'back'
      // The actual facing mode will be determined when the camera is activated
      cameraDevices.push(createCameraDeviceFromMediaDevice(device, position, hasFlash));
    }
    return cameraDevices;
  } catch (error) {
    console.error('Failed to enumerate camera devices:', error);
    return [];
  }
}
