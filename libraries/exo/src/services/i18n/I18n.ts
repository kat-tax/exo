import {i18n} from '@lingui/core';
import {I18nProvider} from '@lingui/react';
import {default as sourceLocale} from 'cfg/locales';
import type {I18nBase, Locales, Messages} from './I18n.interface';

export class I18nService implements I18nBase {
  i18n: typeof i18n = i18n;
  Provider: typeof I18nProvider = I18nProvider;

  async loadLocale(locale: Locales = sourceLocale) {
    const {messages} = await import(`../../../../../content/locales/${locale}.js`) as Messages[Locales];
    i18n.loadAndActivate({locale, messages});
  }

  getLocale(short?: boolean): string {
    const locale = navigator.language;
    return short
      ? locale.split('-').shift() || locale
      : locale;
  }
}
