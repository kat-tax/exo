import {t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import config from 'config';

export function MenuFooter() {
  const {styles} = useStyles(stylesheet);
  const {i18n} = useLingui();
  const build = config.LIB_VERSION;
  const date = new Date('2024-07-13T12:00:00').toLocaleDateString();

  return (
    <View style={styles.root}>
      <Text style={styles.build}>
        {!__DEV__
          ? t(i18n)`${config.APP_NAME} • Local Build - ${date}`
          : t(i18n)`${config.APP_NAME} • Build ${build} - ${date}`
        }
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

