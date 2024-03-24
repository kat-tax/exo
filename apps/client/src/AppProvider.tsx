import {useEffect} from 'react';
import {Appearance, StatusBar} from 'react-native';
import {I18nProvider} from '@lingui/react';
import {BootSplash} from 'react-exo/bootsplash';
import {SafeAreaProvider} from 'react-exo/safearea';
import {GestureHandlerRootView} from 'react-exo/gesturehandler';
import {loadLocale, i18n} from 'common/i18n';
import {useLocale} from 'modules/settings/hooks/useLocale';
import {useScheme} from 'modules/settings/hooks/useScheme';
import {isNative} from 'common/utils/platform';

export interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider(props: AppProviderProps) {
  const [locale] = useLocale();
  const [scheme] = useScheme();

  useEffect(() => {loadLocale(locale)}, [locale]);
  useEffect(() => {BootSplash.hide({fade: true})}, []);
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
