import {I18nManager, Platform} from 'react-native';
import {I18nProvider} from '@lingui/react';
import {useEffect} from 'react';
import {useLocale} from 'settings/hooks/use-locale';

import {load, i18n, isRTL} from './loader';

load('en');
i18n.activate('en');

export function I18n(props: React.PropsWithChildren) {
  const [locale] = useLocale();

  useEffect(() => {
    const isRtl = isRTL(locale);
    if (Platform.OS === 'web') {
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    } else {
      I18nManager.forceRTL(isRtl);
    }
    load(locale);
  }, [locale]);

  return (
    <I18nProvider {...{i18n}}>
      {props.children}
    </I18nProvider>
  );
}
