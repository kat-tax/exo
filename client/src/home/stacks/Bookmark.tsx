import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {ListRowIcon} from 'media/stacks/ListRowIcon';
import {isTouch} from 'app/utils/platform';
import {bytesize} from 'app/utils/formatting';

interface ListRow {
  path: string,
  name: string,
  size?: number,
  isFile?: boolean,
}

export function ListRow(props: ListRow) {
  const {styles} = useStyles(stylesheet);
  const [name, extension] = props.name.split('.');
  const {path, isFile} = props;
  const size = isTouch() ? 1 : 0;
  return (
    <View style={styles.root}>
      <ListRowIcon {...{name, extension, path, size, isFile}}/>
      <Text numberOfLines={1} ellipsizeMode="middle" style={styles.text}>
        {props.name}
      </Text>
      {props.size &&
        <Text numberOfLines={1} style={[styles.text, styles.size]}>
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
    paddingVertical: theme.display.space1,
    gap: theme.display.space2,
  },
  text: {
    fontFamily: theme.font.family,
    fontSize: theme.font.size,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.foreground,
    ...isTouch() && {
      fontSize: theme.font.contentSize,
      letterSpacing: theme.font.contentSpacing,
      lineHeight: 32,
    },
  },
  size: {
    color: theme.colors.mutedForeground,
  },
}));
