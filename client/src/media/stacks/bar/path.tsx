import {useCallback} from 'react';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {Text, Pressable} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useNav} from 'app/nav/hooks';
import {PathId} from 'app/data/types';

import type {DeviceId} from 'app/data/types';

interface BarPathProps {
  name: string,
  path?: string,
  last?: boolean,
  deviceId?: DeviceId | null,
}

export function BarPath(props: BarPathProps) {
  const {name, path, last, deviceId} = props;
  const nav = useNav();

  const open = useCallback(() => {
    if (path === undefined) {
      nav.push('MediaBrowseDevices');
    } else if (deviceId) {
      let pathId: PathId | undefined = undefined;
      const _pathId = PathId.from(path);
      if (_pathId.ok) pathId = _pathId.value;
      nav.push('MediaBrowseEvolu', {pathId, deviceId});
    } else {
      nav.push('MediaBrowseLocal', {path});
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
    <Pressable
      ref={ref}
      onPress={open}
      style={[
        styles.root,
        !last && styles.inactive,
        focused && styles.focused,
      ]}>
      <Text
        style={styles.label}
        selectable={false}>
        {name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flexDirection: 'row',
    paddingHorizontal: theme.display.space1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.display.space1,
    borderRadius: theme.display.radius1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
  },
  inactive: {
    opacity: 0.4,
  },
  focused: {
    borderColor: theme.colors.ring,
  },
  label: {
    color: theme.colors.accentForeground,
    fontSize: __TOUCH__ ? 14 : 12,
    fontFamily: theme.font.family,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
  },
}));
