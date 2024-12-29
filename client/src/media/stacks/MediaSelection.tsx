import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Text, Pressable} from 'react-native';
import {Motion} from 'react-exo/motion';
import {isTouch} from 'app/utils/platform';
import {ListRowIcon} from 'media/stacks/ListRowIcon';

import type {MediaSelection as MediaSelectionType} from 'media/hooks/useMediaSelection';

const IS_TOUCH = isTouch();
const TAB_SIZE = IS_TOUCH ? 46 : 32;
const ICON_SIZE = IS_TOUCH ? 1 : 0;
const TEXT_LINES = IS_TOUCH ? 2 : 1;

export function MediaSelection(props: MediaSelectionType) {
  const {queue, focus} = props;
  const {styles} = useStyles(stylesheet);
  return (
    <Motion.ScrollView
      horizontal
      contentContainerStyle={styles.root}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      {queue.map(({name, title, ext, path, action}, index) => 
        <Pressable
          key={name}
          onPress={action}
          style={[styles.preview, index === focus && styles.focus]}>
          <ListRowIcon
            name={name ?? ''}
            extension={ext}
            size={ICON_SIZE}
            path={path}
            isFile
          />
          <Text
            selectable={false}
            numberOfLines={TEXT_LINES}
            style={[styles.text, index === focus && styles.textFocused]}>
            {title}
          </Text>
        </Pressable>
      )}
    </Motion.ScrollView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flexDirection: 'row',
    gap: theme.display.space2,
    padding: theme.display.space2,
  },
  preview: {
    minWidth: 100,
    height: TAB_SIZE,
    gap: theme.display.space2,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: theme.display.space1,
    paddingHorizontal: theme.display.space5,
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
}));
