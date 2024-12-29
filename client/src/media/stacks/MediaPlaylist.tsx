import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Text, Pressable} from 'react-native';
import {Motion} from 'react-exo/motion';
import {isTouch} from 'app/utils/platform';
import {ListRowIcon} from 'media/stacks/ListRowIcon';

import type {MediaPlaylist as MediaPlaylistType} from 'media/hooks/useMediaPlaylist';

export function MediaPlaylist(props: MediaPlaylistType) {
  const {queue, focus} = props;
  const {styles} = useStyles(stylesheet);
  const sizeGroup = isTouch() ? 1 : 0;

  return (
    <Motion.View
      style={styles.root}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      {queue.map(({name, ext, path, action}, index) => 
        <Pressable
          key={name}
          onPress={action}
          style={[styles.preview, index === focus && styles.focus]}>
          <ListRowIcon
            name={name ?? ''}
            extension={ext}
            size={sizeGroup}
            path={path}
            isFile
          />
          <Text
            numberOfLines={2}
            style={[styles.text, index === focus && styles.textFocused]}>
            {name}
          </Text>
        </Pressable>
      )}
    </Motion.View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    gap: theme.display.space2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.display.space2,
    paddingHorizontal: theme.display.space2,
    paddingBottom: theme.display.space2,
    backgroundColor: theme.colors.neutral,
  },
  icon: {
    padding: theme.display.space3,
  },
  preview: {
    flex: 1,
    height: isTouch() ? 48 : 38,
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
    ...isTouch() && {
      fontSize: theme.font.contentSize,
      lineHeight: theme.font.contentHeight,
      letterSpacing: theme.font.contentSpacing,
    },
  },
  textFocused: {
    color: theme.colors.foreground,
  },
}));
