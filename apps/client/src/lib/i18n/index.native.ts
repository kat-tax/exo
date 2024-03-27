import {i18n} from '@lingui/core';
import type {Locales, Messages} from './types';

const localeMessages = {} as Messages;

localeMessages['en'] = require('../../../../../content/locales/en');
localeMessages['de'] = require('../../../../../content/locales/de');
localeMessages['es'] = require('../../../../../content/locales/es');
localeMessages['pt'] = require('../../../../../content/locales/pt');
localeMessages['ja'] = require('../../../../../content/locales/ja');
localeMessages['ru'] = require('../../../../../content/locales/ru');
localeMessages['ar'] = require('../../../../../content/locales/ar');
localeMessages['id'] = require('../../../../../content/locales/id');

export async function loadLocale(locale: Locales = 'en') {
  const {messages} = localeMessages[locale];
  i18n.loadAndActivate({locale, messages});
}

export {i18n};
