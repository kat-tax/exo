import {Icon} from 'react-exo/icon';
import {Thumb} from 'media/stacks/thumb';
import {Text, View, Pressable} from 'react-native';
import {useNavigate, useLocation} from 'react-exo/navigation';
import {useCallback, useEffect, useState} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {useMediaName} from 'media/hooks/use-media-name';
import {usePut} from 'app/data/store';
import {isTouch} from 'app/utils/platform';
import media from 'media/store';

import type {HfsImpl} from 'react-exo/fs';

const TOUCH = isTouch();
export const HEIGHT = TOUCH ? 46 : 32;
export const ICON_SIZE = TOUCH ? 1 : 0;
export const TEXT_LINES = TOUCH ? 2 : 1;

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
  const put = usePut();

  const open = useCallback(() => {
    put(media.actions.focus(path));
    const parent = path.split('/').slice(0, -1).join('/');
    const uri = parent ? `/browse/${parent}` : '/browse';
    if (uri === pathname) return;
    nav(uri);
  }, [path, pathname, nav, put]);

  const close = useCallback((index: number) => {
    put(media.actions.selectRemove(index));
  }, [put]);

  const {ref, focused: focusedSpatial} = useFocusable({
    focusKey: `select@${path}`,
    onFocus: open,
  });

  // Check if the item is a directory
  useEffect(() => {
    (async () => {
      setDir(!path.includes('://')
        ? await hfs?.isDirectory?.(path) ?? false
        : false);
    })();
  }, [hfs, path]);

  return (
    <Pressable
      ref={ref}
      key={path}
      onPress={open}
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
        {(name || virt) ? title : `.${ext}`}
      </Text>
      {index !== -1 &&
        <Pressable style={styles.close} onPress={() => close(index)}>
          <Icon
            name="ph:x"
            size={TOUCH ? 16 : 14}
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
    gap: TOUCH ? theme.display.space3 : theme.display.space2,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: theme.display.space1,
    paddingHorizontal: TOUCH ? theme.display.space3 : theme.display.space2,
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
