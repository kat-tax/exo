import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Identicon} from 'app/stacks/identicon';
import {uuid} from 'app/utils/random';

const USER = uuid();

export function MenuHeader() {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <View style={styles.head}>
        <Identicon id={USER} width={22} height={22}/>
        <View style={styles.info}>
          <Text style={styles.name} selectable={false}>
            {'Human'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    marginVertical: theme.display.space4,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.display.space2,
    paddingHorizontal: theme.display.space2,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.display.space1,
  },
  name: {
    userSelect: 'none',
    fontWeight: '500',
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    lineHeight: theme.font.contentHeight,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.foreground,
  },
}));

