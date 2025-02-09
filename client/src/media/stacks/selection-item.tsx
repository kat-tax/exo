import {useDispatch} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Text, Pressable} from 'react-native';
import {Icon} from 'react-exo/icon';
import {isTouch} from 'app/utils/platform';
import {MediaIcon} from 'media/stacks/thumbnail';
import media from 'media/store';

import type {HfsImpl} from 'react-exo/fs';

const TOUCH = isTouch();
const TAB_SIZE = TOUCH ? 46 : 32;
const ICON_SIZE = TOUCH ? 1 : 0;
const TEXT_LINES = TOUCH ? 2 : 1;

interface MediaSelectionItemProps {
  focused: boolean,
  index: number,
  path: string,
  name: string,
  ext: string,
  hfs: HfsImpl | null,
}

export function MediaSelectionItem(props: MediaSelectionItemProps) {
  const {focused, index, path, name, ext, hfs} = props;
  const {styles, theme} = useStyles(stylesheet);
  const [dir, setDir] = useState(!ext);

  const put = useDispatch();
  const close = useCallback((index: number) => {
    put(media.actions.selectRemove(index));
  }, [put]);

  useEffect(() => {
    (async () => {
      setDir(!path.includes('://')
        ? await hfs?.isDirectory?.(path)!
        : false);
    })();
  }, [hfs, path]);

  return (
    <Pressable
      key={path}
      onPress={() => put(media.actions.focus(path))}
      style={[styles.root, focused && styles.focus]}>
      <MediaIcon
        name={name ?? ''}
        size={ICON_SIZE}
        dir={dir}
        ext={ext}
      />
      <Text
        style={[styles.text, focused && styles.textFocused]}
        selectable={false}
        numberOfLines={TEXT_LINES}>
        {name || `.${ext}`}
      </Text>
      <Pressable style={styles.close} onPress={() => close(index)}>
        <Icon
          name="ph:x"
          size={TOUCH ? 16 : 14}
          color={theme.colors.mutedForeground}
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
