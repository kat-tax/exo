import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';
import {ListRowIcon} from 'media/stacks/ListRowIcon';
import {bytesize} from 'app/utils/formatting';
import {isTouch} from 'app/utils/platform';

const TOUCH = isTouch();

interface ListRow {
  name: string,
  size?: number,
  isFile?: boolean,
  isSelected?: boolean,
  isFocused?: boolean,
  isBlurred?: boolean,
}

export function ListRow(props: ListRow) {
  const {styles} = useStyles(stylesheet);
  const [name, extension] = props.name.split('.');
  const {isFile, isSelected, isFocused, isBlurred} = props;
  const vstyles = {
    root: [
      styles.root,
      isSelected && styles.selected,
      isFocused && styles.focused,
      isBlurred && styles.blurred,
    ],
  };

  return (
    <View style={vstyles.root}>
      <ListRowIcon {...{size: TOUCH ? 1 : 0, name, extension, isFile}}/>
      <Text
        style={styles.text}
        selectable={false}
        ellipsizeMode="middle"
        numberOfLines={1}>
        {props.name}
      </Text>
      {Boolean(props.size) &&
        <Text
          style={[styles.text, styles.size]}
          selectable={false}
          numberOfLines={1}>
          {bytesize(props.size ?? 0)}
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
    marginBottom: 2,
  },
  focused: {
    borderColor: theme.colors.foreground,
  },
  blurred: {
    opacity: 0.5,
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
    fontSize: 11,
  },
  selected: {
    backgroundColor: theme.colors.muted,
  },
}));
