import {useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {I18nManager, View} from 'react-native';
import {I18nProvider} from '@lingui/react';
import {GestureProvider} from 'react-exo/gesture';
import {load, i18n} from 'app/locales';
import {useLocale} from 'settings/hooks/useLocale';

load('en');
i18n.activate('en');

export function Provider(props: React.PropsWithChildren) {
  const [locale] = useLocale();
  const {styles} = useStyles(stylesheet);

  useEffect(() => {
    load(locale);
    I18nManager.forceRTL(locale === 'ar');
  }, [locale]);

  return (
    // @ts-ignore "lang" is react-native-web prop
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
