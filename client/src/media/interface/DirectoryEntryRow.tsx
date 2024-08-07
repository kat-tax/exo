import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';
import {isTouch} from 'app/utils/platform';

interface DirectoryEntryRow {
  name: string,
}

// https://github.com/kat-tax/vslite/tree/master/src/icons
export function DirectoryEntryRow(props: DirectoryEntryRow) {
  const {styles} = useStyles(stylesheet);
  return (
    <View style={styles.root}>
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
