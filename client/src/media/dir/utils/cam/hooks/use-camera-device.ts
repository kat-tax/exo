import {useMemo} from 'react';
import {useCameraDevices} from './use-camera-devices';
import {getCameraDevice} from '../utils/get-camera-device';
import type {useCameraDevice as _} from 'react-native-vision-camera';

export const useCameraDevice: typeof _ = (position, filter) => {
  const devices = useCameraDevices();
  const device = useMemo(
    () => getCameraDevice(devices, position, filter),
    [devices, position, JSON.stringify(filter)],
  );
  return device;
}

