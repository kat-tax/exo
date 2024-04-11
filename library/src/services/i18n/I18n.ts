import {i18n} from '@lingui/core';
import {sourceLocale} from './locales';

import type {I18nBase, Messages} from './I18n.interface';
import type {Locales} from './locales';

export class I18nService implements I18nBase {
  getLocale(short?: boolean): string {
    const locale = navigator.language;
    return short
      ? locale.split('-').shift() || locale
      : locale;
  }

  async loadLocale(locale: Locales = sourceLocale) {
    const {messages} = await import(`./messages/${locale}.ts`) as Messages[Locales];
    i18n.loadAndActivate({locale, messages});
  }
}
