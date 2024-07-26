import {useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {I18nManager, View, Platform} from 'react-native';
import {GestureProvider} from 'react-exo/gesture';
import {I18nProvider} from '@lingui/react';
import {useLocale} from 'settings/hooks/useLocale';
import * as locales from 'app/locales';

locales.load('en');
locales.i18n.activate('en');

export function Provider(props: React.PropsWithChildren) {
  const {styles} = useStyles(stylesheet);
  const [locale] = useLocale();
  
  useEffect(() => {
    const isRtl = locales.isRTL(locale);
    if (Platform.OS === 'web') {
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    } else {
      I18nManager.forceRTL(isRtl);
    }
    locales.load(locale);
  }, [locale]);

  return (
    <View style={styles.root}>
      <I18nProvider i18n={locales.i18n}>
        <GestureProvider style={{flex: 1}}>
          {props.children}
        </GestureProvider>
      </I18nProvider>
    </View>
  );
}

const stylesheet = createStyleSheet({
  root: {
    flex: 1,
  },
});
