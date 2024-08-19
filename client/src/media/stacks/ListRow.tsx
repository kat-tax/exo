import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {ListRowIcon} from 'media/stacks/ListRowIcon';
import {isTouch} from 'app/utils/platform';
import {bytesize} from 'app/utils/formatting';

interface ListRow {
  name: string,
  size?: number,
}

export function ListRow(props: ListRow) {
  const {styles} = useStyles(stylesheet);
  const [name, ext] = props.name.split('.');
  return (
    <View style={styles.root}>
      <ListRowIcon {...{name, ext}}/>
      <Text style={styles.text}>
        {props.name}
      </Text>
      {props.size &&
        <Text style={[styles.text, styles.size]}>
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
      lineHeight: theme.font.contentHeight,
      letterSpacing: theme.font.contentSpacing,
    },
  },
  size: {
    color: theme.colors.mutedForeground,
  },
}));
