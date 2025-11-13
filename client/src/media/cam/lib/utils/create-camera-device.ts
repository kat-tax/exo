import type {CameraDevice, CameraPosition, CameraDeviceFormat} from 'react-native-vision-camera';

/**
 * Helper function to convert MediaDeviceInfo to CameraDevice
 */
export function createCameraDeviceFromMediaDevice(
  deviceInfo: MediaDeviceInfo,
  position: CameraPosition,
  hasFlash: boolean = false,
): CameraDevice {
  // Create a basic format - web APIs don't expose all the details
  const format: CameraDeviceFormat = {
    photoHeight: 1920,
    photoWidth: 1080,
    videoHeight: 720,
    videoWidth: 1280,
    maxISO: 3200,
    minISO: 100,
    fieldOfView: 60,
    supportsVideoHdr: false,
    supportsPhotoHdr: false,
    supportsDepthCapture: false,
    minFps: 15,
    maxFps: 30,
    autoFocusSystem: 'contrast-detection',
    videoStabilizationModes: ['off'],
  };

  return {
    id: deviceInfo.deviceId,
    physicalDevices: ['wide-angle-camera'],
    position,
    name: deviceInfo.label || `${position} camera`,
    hasFlash,
    hasTorch: hasFlash, // Torch is typically the same as flash on web
    minFocusDistance: 0,
    isMultiCam: false,
    minZoom: 1,
    maxZoom: 4,
    neutralZoom: 1,
    minExposure: -2,
    maxExposure: 2,
    formats: [format],
    supportsLowLightBoost: false,
    supportsRawCapture: false,
    supportsFocus: true,
    hardwareLevel: 'full',
    sensorOrientation: 'landscape-left',
  };
}

