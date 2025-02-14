import {Icon} from 'react-exo/icon';
import {Thumb} from 'media/stacks/thumb';
import {Text, View, Pressable} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {useMediaName} from 'media/hooks/use-media-name';
import {useDispatch} from 'react-redux';
import {isTouch} from 'app/utils/platform';
import media from 'media/store';

import type {HfsImpl} from 'react-exo/fs';

const TOUCH = isTouch();
const TAB_SIZE = TOUCH ? 46 : 32;
const ICON_SIZE = TOUCH ? 1 : 0;
const TEXT_LINES = TOUCH ? 2 : 1;

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
  const title = useMediaName(name);

  const put = useDispatch();

  const close = useCallback((index: number) => {
    put(media.actions.selectRemove(index));
  }, [put]);

  const {ref, focused: focusedSpatial} = useFocusable({
    focusKey: `select@${path}`,
    onFocus: () => {
      put(media.actions.focus(path));
    },
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
      onPress={() => put(media.actions.focus(path))}
      style={[styles.root, focused && styles.focus, focusedSpatial && styles.focusSpatial]}>
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
        {name ? title : `.${ext}`}
      </Text>
      <Pressable style={styles.close} onPress={() => close(index)}>
        <Icon
          name="ph:x"
          size={TOUCH ? 16 : 14}
          color={focused ? theme.colors.foreground : theme.colors.mutedForeground}
        />
      </Pressable>
    </Pressable>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    height: TAB_SIZE,
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
