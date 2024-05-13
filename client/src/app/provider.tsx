import {useEffect} from 'react';
import {I18nProvider} from '@lingui/react';
import {GestureProvider} from 'react-exo/gesture';
import {SafeAreaProvider} from 'react-exo/safearea';
import {i18n, loadLocale} from 'react-exo/i18n';
import {useLocale} from 'settings/hooks/useLocale';

loadLocale('en');
i18n.activate('en');

export function Provider(props: React.PropsWithChildren) {
  const [locale] = useLocale();

  useEffect(() => {
    loadLocale(locale);
  }, [locale]);

  return (
    <I18nProvider {...{i18n}}>
      <GestureProvider style={{flex: 1}}>
        <SafeAreaProvider>
          {props.children}
        </SafeAreaProvider>
      </GestureProvider>
    </I18nProvider>
  );
}
