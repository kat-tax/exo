import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {I18nProvider} from '@lingui/react';
import {ToastProvider} from 'react-exo/toast';
import {GestureProvider} from 'react-exo/gesture';
import {SafeAreaProvider} from 'react-exo/safearea';
import {i18n, loadLocale} from 'react-exo/i18n';
import {BootSplash} from 'react-exo/device';
import {useLocale} from 'settings/hooks/useLocale';
import {useScheme} from 'settings/hooks/useScheme';

i18n.activate('en');

export function AppProvider(props: React.PropsWithChildren) {
  const [locale] = useLocale();
  const [scheme] = useScheme();
  const barStyle = scheme === 'dark'
    ? 'light-content'
    : 'dark-content';

  useEffect(() => {loadLocale(locale)}, [locale]);
  useEffect(() => {BootSplash.hide()}, []);

  return (
    <I18nProvider {...{i18n}}>
      <StatusBar {...{barStyle}}/>
      <GestureProvider style={{flex: 1}}>
        <SafeAreaProvider>
          {props.children}
          <ToastProvider position='bottom-right'/>
        </SafeAreaProvider>
      </GestureProvider>
    </I18nProvider>
  );
}
