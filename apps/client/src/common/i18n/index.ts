import {i18n} from '@lingui/core';
import type {Locales} from './types';

export async function loadLocale(locale: Locales = 'en') {
  const {messages} = await import(`../../assets/locales/${locale}.po`);
  i18n.loadAndActivate({locale, messages});
}

export {i18n};
