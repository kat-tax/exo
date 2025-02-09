import {useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {I18nManager, View, Platform} from 'react-native';
import {GestureProvider} from 'react-exo/gesture';
import {I18nProvider} from '@lingui/react';
import {useLocale} from 'app/hooks/use-locale';

import {load, i18n, isRTL} from './loader';

load('en');
i18n.activate('en');

export function I18n(props: React.PropsWithChildren) {
  const {styles} = useStyles(stylesheet);
  const [locale] = useLocale();
  
  useEffect(() => {
    const isRtl = isRTL(locale);
    if (Platform.OS === 'web') {
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    } else {
      I18nManager.forceRTL(isRtl);
    }
    load(locale);
  }, [locale]);

  return (
    <View style={styles.root}>
      <I18nProvider {...{i18n}}>
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
