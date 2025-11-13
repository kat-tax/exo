import {useEffect, useState} from 'react';
import {getAvailableCameraDevices} from '../utils/get-available-camera-devices';
import type {useCameraDevices as _, CameraDevice} from 'react-native-vision-camera';

export const useCameraDevices: typeof _ = () => {
  const [devices, setDevices] = useState<CameraDevice[]>([]);

  useEffect(() => {
    let mounted = true;
    const updateDevices = () => {
      getAvailableCameraDevices().then((cameraDevices) => {
        if (mounted) {
          setDevices(cameraDevices);
        }
      });
    };
    updateDevices();
    if (navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
      navigator.mediaDevices.addEventListener('devicechange', updateDevices);
      return () => {
        mounted = false;
        navigator.mediaDevices.removeEventListener('devicechange', updateDevices);
      };
    }
    return () => {
      mounted = false;
    };
  }, []);

  return devices;
}

