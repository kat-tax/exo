import {createMMKV} from 'react-native-mmkv';
import {createIdFromString} from '@evolu/common';
import {getDeviceName} from 'app/lib/platform';
import {DeviceId} from 'app/data/types';
import {uuid} from 'app/lib/random';

const _mmkv = createMMKV({id: 'evolu-device'});
let _deviceId = _mmkv.getString('id');
let _deviceName = _mmkv.getString('name');

if (!_deviceId) {
  _deviceId = createIdFromString(uuid());
  _mmkv.set('id', _deviceId);
}

if (!_deviceName) {
  _deviceName = getDeviceName();
  _mmkv.set('name', _deviceName);
}

export const device = {
  id: DeviceId.orThrow(_deviceId),
  name: _deviceName,
}
