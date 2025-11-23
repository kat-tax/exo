import {createMMKV} from 'react-native-mmkv';
import {createIdFromString} from '@evolu/common';
import {getDevicePlatform} from 'app/lib/platform';
import {DeviceId} from 'app/data/types';
import {uuid} from 'app/lib/random';

const _platform = getDevicePlatform();
const _mmkv = createMMKV({id: 'evolu-device'});

let _deviceId = _mmkv.getString('id');
let _deviceName = _mmkv.getString('name');

if (!_deviceId) {
  _deviceId = createIdFromString(uuid());
  _mmkv.set('id', _deviceId);
}

if (!_deviceName) {
  _deviceName = _platform;
  _mmkv.set('name', _deviceName);
}

export const device = {
  id: DeviceId.orThrow(_deviceId),
  name: _deviceName,
  platform: _platform,
}
