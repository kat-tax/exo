import {i18n} from '@lingui/core';
import {sourceLocale} from 'config/locales';
import type {Locales} from 'config/locales';

import {messages as en} from './messages/en';
import {messages as ru} from './messages/ru';
import {messages as ja} from './messages/ja';
import {messages as ar} from './messages/ar';

const locales = {en, ru, ja, ar};

export {i18n};
export async function load(locale: Locales = sourceLocale) {
  const messages = locales[locale];
  i18n.loadAndActivate({locale, messages});
}
