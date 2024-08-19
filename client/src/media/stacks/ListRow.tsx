import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {ListRowIcon} from 'media/stacks/ListRowIcon';
import {isTouch} from 'app/utils/platform';

interface ListRow {
  name: string,
}

export function ListRow(props: ListRow) {
  const {styles} = useStyles(stylesheet);
  const [name, ext] = props.name.split('.');
  return (
    <View style={styles.root}>
      <ListRowIcon {...{name, ext}}/>
      <Text style={styles.title}>
        {props.name}
      </Text>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
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
}));
