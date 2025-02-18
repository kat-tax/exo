import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Identicon} from 'app/stacks/identicon';
import {uuid} from 'app/utils/random';
import cfg from 'config';

const USER = uuid();

export function MenuHeader() {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <View style={styles.head}>
        <Identicon
          id={USER}
          width={20}
          height={20}
        />
        <View style={styles.info}>
          <Text style={styles.name} selectable={false}>
            {cfg.APP_NAME}
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
    paddingEnd: theme.display.space1,
    paddingStart: 6,
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
    fontSize: theme.font.size,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.foreground,
  },
}));

