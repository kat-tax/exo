import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {I18nProvider} from '@lingui/react';
import {SafeAreaProvider} from 'react-exo/safe-area';
import {GestureProvider} from 'react-exo/gesture';
import {BootSplash} from 'react-exo/device';
import {useScheme} from 'mod/settings/hooks/useScheme';
import {useLocale} from 'mod/settings/hooks/useLocale';
import {loadLocale, i18n} from 'lib/i18n';

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
