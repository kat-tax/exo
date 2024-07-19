import {Trans} from '@lingui/macro';
import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import config from 'config';

export function MenuFooter() {
  const {styles} = useStyles(stylesheet);
  const build = config.LIB_VERSION;

  return (
    <View style={styles.root}>
      <Text style={styles.build}>
        <Trans>{`${config.APP_NAME} • Build ${build}`}</Trans>
      </Text>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    marginTop: theme.display.space2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.display.space2,
    padding: theme.display.space2,
  },
  build: {
    color: theme.colors.mutedForeground,
    fontFamily: theme.font.family,
    fontWeight: theme.font.weight,
    fontSize: 9,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
  },
}));

