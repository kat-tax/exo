import {useEffect} from 'react';
import {I18nProvider} from '@lingui/react';
import {ToastProvider} from 'react-exo/toast';
import {GestureProvider} from 'react-exo/gesture';
import {SafeAreaProvider} from 'react-exo/safearea';
import {i18n, loadLocale} from 'react-exo/i18n';
import {useLocale} from 'settings/hooks/useLocale';

i18n.activate('en');

export function AppProvider(props: React.PropsWithChildren) {
  const [locale] = useLocale();

  useEffect(() => {
    loadLocale(locale);
  }, [locale]);

  return (
    <I18nProvider {...{i18n}}>
      <GestureProvider style={{flex: 1}}>
        <SafeAreaProvider>
          {props.children}
          <ToastProvider position='bottom-right'/>
        </SafeAreaProvider>
      </GestureProvider>
    </I18nProvider>
  );
}
