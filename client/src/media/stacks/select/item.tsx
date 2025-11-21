import {Icon} from 'react-exo/icon';
import {Thumb} from 'media/stacks/thumb';
import {StyleSheet} from 'react-native-unistyles';
import {Text, View, Pressable} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {useLingui} from '@lingui/react/macro';
import {useSet} from 'app/data';

import {getPathInfo} from 'media/file/utils/data';
import media from 'media/store';

export const HEIGHT = __TOUCH__ ? 46 : 36;
export const ICON_SIZE = __TOUCH__ ? 1 : 0;
export const TEXT_LINES = __TOUCH__ ? 2 : 1;

interface SelectItemProps {
  focused: boolean,
  index: number,
  path: string,
}

export function SelectItem(props: SelectItemProps) {
  const {t} = useLingui();
  const set = useSet();

  const {focused, index, path} = props;
  const [pathInfo, setPathInfo] = useState<{isDir: boolean, name: string, ext: string} | null>(null);
  const virt = index === -1;

  const open = useCallback(() => {
    set(media.actions.focus(path));
  }, [path, set]);

  // const goto = useCallback(() => {
  //   const parent = path.split('/').slice(0, -1).join('/');
  //   const targetPath = parent || undefined;
  //   // Get current path from route params to check if we're already there
  //   const currentPath = route.params?.path;
  //   if (targetPath === currentPath) return;
  //   navigation.navigate('MediaBrowse', {path: targetPath, backend: 'local'});
  // }, [path, route.params, navigation]);

  const close = useCallback((index: number) => {
    set(media.actions.selectRemove(index));
  }, [set]);

  const {ref, focused: focusedSpatial} = useFocusable({
    focusKey: `select@${path}`,
    onFocus: open,
    //onEnterPress: goto,
  });

  // Check if the item is a directory
  useEffect(() => {
    (async () => {
      setPathInfo(await getPathInfo(path));
    })();
  }, [path]);

  return (
    <Pressable
      ref={ref}
      key={path}
      onPress={open}
      //onLongPress={goto}
      disabled={virt}
      style={[
        styles.root,
        focused && styles.focus,
        focusedSpatial && styles.focusSpatial,
        virt && styles.disabled,
        !pathInfo && styles.loading,
      ]}>
      {pathInfo ? (
        <>
          <View style={styles.thumb}>
            <Thumb
              size={ICON_SIZE}
              name={pathInfo.name}
              dir={pathInfo.isDir}
              ext={pathInfo.ext}
            />
          </View>
          <Text
            style={[styles.text, focused && styles.textFocused]}
            selectable={false}
            numberOfLines={TEXT_LINES}>
            {pathInfo.name || t`Files`}
          </Text>
        </>
      ) : null}
      {index !== -1 &&
        <Pressable style={styles.close} onPress={() => close(index)}>
          <Icon
            name="ph:x"
            size={__TOUCH__ ? 16 : 14}
            uniProps={(theme) => ({
              color: focused ? theme.colors.foreground : theme.colors.mutedForeground,
            })}
          />
        </Pressable>
      }
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    height: HEIGHT,
    gap: __TOUCH__ ? theme.display.space3 : theme.display.space2,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: theme.display.space1,
    paddingHorizontal: __TOUCH__ ? theme.display.space3 : theme.display.space2,
    borderRadius: theme.display.radius1,
    borderColor: theme.colors.border,
    borderWidth: StyleSheet.hairlineWidth,
  },
  loading: {
    opacity: 0,
  },
  disabled: {
    opacity: 0.5,
  },
  focus: {
    borderColor: theme.colors.primary,
  },
  focusSpatial: {
    borderColor: theme.colors.outline,
  },
  thumb: {
    width: 16,
  },
  text: {
    fontFamily: theme.font.family,
    fontSize: theme.font.size,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.mutedForeground,
  },
  textFocused: {
    color: theme.colors.foreground,
  },
  close: {
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
