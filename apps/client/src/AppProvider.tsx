import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {BootSplash} from 'react-exo/device';
import {GestureProvider} from 'react-exo/gesture';
import {SafeAreaProvider} from 'react-exo/safe-area';
import {I18nProvider, i18n, loadLocale} from 'react-exo/i18n';

import {useScheme} from 'mod/settings/hooks/useScheme';
import {useLocale} from 'mod/settings/hooks/useLocale';

export interface AppProviderProps {
  children: React.ReactNode,
}

export function AppProvider(props: AppProviderProps) {
  const [locale] = useLocale();
  const [scheme] = useScheme();
  const isDark = scheme === 'dark';

  useEffect(() => {BootSplash.hide()}, []);
  useEffect(() => {loadLocale(locale)}, [locale]);

  return (
    <I18nProvider {...{i18n}}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'}/>
      <GestureProvider style={{flex: 1}}>
        <SafeAreaProvider>
          {props.children}
        </SafeAreaProvider>
      </GestureProvider>
    </I18nProvider>
  );
}
