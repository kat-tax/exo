import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {ListRowIcon} from 'media/stacks/ListRowIcon';
import {bytesize} from 'app/utils/formatting';
import {isTouch} from 'app/utils/platform';

const TOUCH = isTouch();

interface ListRow {
  path: string,
  name: string,
  index: number,
  size?: number,
  isFile?: boolean,
  isFocused?: boolean,
  isSelected?: boolean,
}

export function ListRow(props: ListRow) {
  const {styles} = useStyles(stylesheet);
  const [name, extension] = props.name.split('.');
  const {path, isFile, isFocused, isSelected} = props;
  const iconSize = TOUCH ? 1 : 0;
  const vstyles = {
    root: [
      styles.root,
      isFocused && styles.focused,
      isSelected && styles.selected,
    ],
  };
  return (
    <View style={vstyles.root}>
      <ListRowIcon {...{name, size: iconSize, extension, path, isFile}}/>
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
