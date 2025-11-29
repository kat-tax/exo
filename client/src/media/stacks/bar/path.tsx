import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {ButtonText} from 'app/ui/button/text';
import {PathId} from 'app/data/types';

import type {DeviceId} from 'app/data/types';

const TEXT_SIZE = __TOUCH__ ? 14 : 12;

interface BarPathProps {
  name: string,
  path?: string,
  last?: boolean,
  deviceId?: DeviceId | null,
}

export function BarPath(props: BarPathProps) {
  const {name, path, last, deviceId} = props;
  const nav = useNavigation();
  const open = useCallback(() => {
    if (path === undefined) {
      nav.navigate('MediaBrowseDevices');
    } else if (deviceId) {
      let pathId: PathId | undefined = undefined;
      const _pathId = PathId.from(path);
      if (_pathId.ok) pathId = _pathId.value;
      nav.navigate('MediaBrowseEvolu', {pathId, deviceId});
    } else {
      nav.navigate('MediaBrowseLocal', {path});
    }
  }, [deviceId, path, nav]);

  const {ref, focused} = useFocusable({
    focusKey: `bar@${path === undefined ? '%root%' : path === '' ? '%device%' : path}`,
    onEnterPress: open,
    onFocus: () => {
      // scroll?.current?.scrollTo({x: layout.x, animated: true});
    },
  });

  return (
    <ButtonText
      vref={ref}
      label={name}
      size={TEXT_SIZE}
      onPress={open}
      state={focused
        ? 'Focused'
        : last
          ? 'Default'
          : 'Disabled'
      }
    />
  );
}
