import {Icon} from 'react-exo/icon';
import {Thumb} from 'media/stacks/thumb';
import {Text, View, Pressable} from 'react-native';
import {useNavigate, useLocation} from 'react-exo/navigation';
import {useCallback, useEffect, useState} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {useMediaName} from 'media/hooks/use-media-name';
import {useSet} from 'app/data';
import media from 'media/store';

import type {HfsImpl} from 'react-exo/fs';

export const HEIGHT = __TOUCH__ ? 46 : 32;
export const ICON_SIZE = __TOUCH__ ? 1 : 0;
export const TEXT_LINES = __TOUCH__ ? 2 : 1;

interface SelectItemProps {
  focused: boolean,
  index: number,
  path: string,
  name: string,
  ext: string,
  hfs: HfsImpl | null,
}

export function SelectItem(props: SelectItemProps) {
  const {focused, index, path, name, ext, hfs} = props;
  const {styles, theme} = useStyles(stylesheet);
  const [dir, setDir] = useState(!ext);
  const {pathname} = useLocation();
  const title = useMediaName(name);
  const virt = index === -1;

  const nav = useNavigate();
  const set = useSet();

  const open = useCallback(() => {
    set(media.actions.focus(path));
  }, [path, set]);

  const goto = useCallback(() => {
    const parent = path.split('/').slice(0, -1).join('/');
    const uri = parent ? `/browse/local/${parent}` : '/browse/local';
    if (uri === pathname) return;
    nav(uri);
  }, [path, pathname, nav]);

  const close = useCallback((index: number) => {
    set(media.actions.selectRemove(index));
  }, [set]);

  const {ref, focused: focusedSpatial} = useFocusable({
    focusKey: `select@${path}`,
    onFocus: open,
    onEnterPress: goto,
  });

  // Check if the item is a directory
  useEffect(() => {
    (async () => {
      setDir(!path.includes('://')
        ? await hfs?.isDirectory?.(path || '.') ?? false
        : false);
    })();
  }, [hfs, path]);

  return (
    <Pressable
      ref={ref}
      key={path}
      onPress={open}
      onLongPress={goto}
      disabled={virt}
      style={[
        styles.root,
        focused && styles.focus,
        focusedSpatial && styles.focusSpatial,
        virt && styles.disabled,
      ]}>
      <View style={styles.thumb}>
        <Thumb
          name={name ?? ''}
          size={ICON_SIZE}
          dir={dir}
          ext={ext}
        />
      </View>
      <Text
        style={[styles.text, focused && styles.textFocused]}
        selectable={false}
        numberOfLines={TEXT_LINES}>
        {name ? title : ext ? `.${ext}` : title}
      </Text>
      {index !== -1 &&
        <Pressable style={styles.close} onPress={() => close(index)}>
          <Icon
            name="ph:x"
            size={__TOUCH__ ? 16 : 14}
            color={focused ? theme.colors.foreground : theme.colors.mutedForeground}
          />
        </Pressable>
      }
    </Pressable>
  );
}

const stylesheet = createStyleSheet((theme) => ({
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
    borderWidth: 1,
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
