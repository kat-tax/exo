import {i18n} from '@lingui/core';
import type {Locales, Messages} from './types';

const localeMessages = {} as Messages;

localeMessages['en'] = require('../../assets/locales/en');
localeMessages['de'] = require('../../assets/locales/de');
localeMessages['es'] = require('../../assets/locales/es');
localeMessages['pt'] = require('../../assets/locales/pt');
localeMessages['ja'] = require('../../assets/locales/ja');
localeMessages['ru'] = require('../../assets/locales/ru');
localeMessages['ar'] = require('../../assets/locales/ar');
localeMessages['id'] = require('../../assets/locales/id');

export async function loadLocale(locale: Locales = 'en') {
  const {messages} = localeMessages[locale];
  i18n.loadAndActivate({locale, messages});
}

export {i18n};
