import {i18n} from '@lingui/core';
import {isRTL} from 'app/locales/isRTL';
import {sourceLocale} from 'config/locales';
import type {Locales} from 'config/locales';

export {i18n, isRTL};

export async function load(locale: Locales = sourceLocale) {
  const {messages} = await import(`./messages/${locale}.ts`);
  i18n.loadAndActivate({locale, messages});
}
