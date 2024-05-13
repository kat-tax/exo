import {i18n} from '@lingui/core';
import {sourceLocale} from 'config/locales';

import type {I18nBase, Messages} from './I18n.interface';
import type {Locales} from 'config/locales';

export class I18nService implements I18nBase {
  getLocale() {
    return navigator.language.split('-').shift() || sourceLocale;
  }

  async loadLocale(locale: Locales = sourceLocale) {
    const {messages} = await import(`./messages/${locale}.ts`) as Messages[Locales];
    i18n.loadAndActivate({locale, messages});
  }
}
