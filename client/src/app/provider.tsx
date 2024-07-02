import {useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {I18nManager, View} from 'react-native';
import {I18nProvider} from '@lingui/react';
import {i18n, loadLocale} from 'react-exo/i18n';
import {GestureProvider} from 'react-exo/gesture';
import {useLocale} from 'settings/hooks/useLocale';

loadLocale('en');
i18n.activate('en');

export function Provider(props: React.PropsWithChildren) {
  const [locale] = useLocale();
  const {styles} = useStyles(stylesheet);

  useEffect(() => {
    loadLocale(locale);
    I18nManager.forceRTL(locale === 'ar');
  }, [locale]);

  return (
    <View style={styles.root} lang={locale}>
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
