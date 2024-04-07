import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {I18nProvider} from '@lingui/react';
import {GestureProvider} from 'react-exo/gesture';
import {SafeAreaProvider} from 'react-exo/safearea';
import {i18n, loadLocale} from 'react-exo/i18n';
import {BootSplash} from 'react-exo/device';
import {useScheme} from 'settings/hooks/useScheme';
import {useLocale} from 'settings/hooks/useLocale';

i18n.activate('en');

export function AppProvider(props: React.PropsWithChildren) {
  const [locale] = useLocale();
  const [scheme] = useScheme();
  const barStyle = scheme === 'dark'
    ? 'light-content'
    : 'dark-content';

  useEffect(() => {BootSplash.hide()}, []);
  useEffect(() => {loadLocale(locale)}, [locale]);

  return (
    <I18nProvider {...{i18n}}>
      <StatusBar {...{barStyle}}/>
      <GestureProvider style={{flex: 1}}>
        <SafeAreaProvider>
          {props.children}
        </SafeAreaProvider>
      </GestureProvider>
    </I18nProvider>
  );
}
