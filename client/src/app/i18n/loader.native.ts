import {i18n} from '@lingui/core';
import {isRTL} from 'app/i18n/rtl';
import {sourceLocale} from 'config/locales';
import type {Locales} from 'config/locales';

import {messages as en} from './messages/en';
import {messages as es} from './messages/es';
import {messages as ru} from './messages/ru';
import {messages as ja} from './messages/ja';
import {messages as ko} from './messages/ko';
import {messages as ar} from './messages/ar';

const locales = {en, es, ru, ja, ko, ar};

export {i18n, isRTL};

export async function load(locale: Locales = sourceLocale) {
  const messages = locales[locale];
  i18n.loadAndActivate({locale, messages});
}
