import {createMMKV} from 'react-native-mmkv';
import {createIdFromString} from '@evolu/common';
import {getDevicePlatform} from 'app/lib/platform';
import {DeviceId} from 'app/data/types';
import {uuid} from 'app/lib/random';

export const platform = getDevicePlatform();
export const mmkv = createMMKV({id: 'evolu-device'});
export const store = {
  id: 'id',
  name: 'name',
  tracking: 'tracking',
} as const;

let _deviceId = mmkv.getString(store.id);
let _deviceName = mmkv.getString(store.name);
let _deviceTracking = mmkv.getBoolean(store.tracking);

// Device ID is generated if not set
if (!_deviceId) {
  _deviceId = createIdFromString(uuid());
  mmkv.set(store.id, _deviceId);
}

// Device name is set to the platform if not set
if (!_deviceName) {
  _deviceName = platform;
  mmkv.set(store.name, _deviceName);
}

// Note: device platform is not configurable
export const device = {
  id: DeviceId.orThrow(_deviceId),
  name: _deviceName,
  tracking: _deviceTracking,
  platform,
} as const;
