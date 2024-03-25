import {useEffect} from 'react';
import {I18nProvider} from '@lingui/react';
import {Appearance, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-exo/gesture';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useScheme} from 'modules/settings/hooks/useScheme';
import {useLocale} from 'modules/settings/hooks/useLocale';
import {isNative} from 'common/utils/platform';
import {loadLocale, i18n} from 'common/i18n';
import device from 'react-exo/device';

export interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider(props: AppProviderProps) {
  const [locale] = useLocale();
  const [scheme] = useScheme();

  useEffect(() => {loadLocale(locale)}, [locale]);
  useEffect(() => {device.hide({fade: true})}, []);
  useEffect(() => {
    if (isNative()) {
      Appearance.setColorScheme(scheme);
      StatusBar.setBarStyle(scheme === 'dark'
        ? 'light-content'
        : 'dark-content'
      );
    }
  }, [scheme]);
    
  return (
    <I18nProvider i18n={i18n}>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          {props.children}
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </I18nProvider>
  );
}
