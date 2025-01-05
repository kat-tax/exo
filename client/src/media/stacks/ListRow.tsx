import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';
import {ListRowIcon} from 'media/stacks/ListRowIcon';
import {ListRowMenu} from 'media/stacks/ListRowMenu';
import {bytesize} from 'app/utils/formatting';
import {isTouch} from 'app/utils/platform';

import type {ListRowMenuEvents} from 'media/stacks/ListRowMenu';

const TOUCH = isTouch();

interface ListRow {
  path: string,
  name: string,
  index: number,
  size?: number,
  events?: ListRowMenuEvents,
  isFile?: boolean,
  isFocused?: boolean,
  isSelected?: boolean,
}

export function ListRow(props: ListRow) {
  const {styles} = useStyles(stylesheet);
  const [name, extension] = props.name.split('.');
  const {path, events, isFile, isFocused, isSelected} = props;
  const vstyles = {
    root: [
      styles.root,
      isFocused && styles.focused,
      isSelected && styles.selected,
    ],
  };

  return (
    <ListRowMenu {...{name, path, events}}>
      <View style={vstyles.root}>
        <ListRowIcon {...{size: TOUCH ? 1 : 0, name, extension, path, isFile}}/>
        <Text
          style={styles.text}
          selectable={false}
          ellipsizeMode="middle"
          numberOfLines={1}>
          {props.name}
        </Text>
        {props.size &&
          <Text
            style={[styles.text, styles.size]}
            selectable={false}
            numberOfLines={1}>
            {bytesize(props.size)}
          </Text>
        }
      </View>
    </ListRowMenu>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.display.space2,
    paddingVertical: theme.display.space1,
    borderRadius: theme.display.radius1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    gap: theme.display.space2,
    marginBottom: 2,
  },
  focused: {
    borderColor: theme.colors.foreground,
  },
  text: {
    fontFamily: theme.font.family,
    fontSize: theme.font.size,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.foreground,
    ...TOUCH && {
      fontSize: theme.font.contentSize,
      letterSpacing: theme.font.contentSpacing,
      lineHeight: 32,
    },
  },
  size: {
    color: theme.colors.mutedForeground,
  },
  selected: {
    backgroundColor: theme.colors.muted,
  },
}));
