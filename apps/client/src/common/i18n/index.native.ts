import {i18n} from '@lingui/core';
import type {Locales} from './types';

let nativeMessages = {};
nativeMessages['en'] = require('../../assets/locales/en');
nativeMessages['de'] = require('../../assets/locales/de');
nativeMessages['es'] = require('../../assets/locales/es');
nativeMessages['pt'] = require('../../assets/locales/pt');
nativeMessages['ja'] = require('../../assets/locales/ja');
nativeMessages['ru'] = require('../../assets/locales/ru');
nativeMessages['ar'] = require('../../assets/locales/ar');
nativeMessages['id'] = require('../../assets/locales/id');

export async function loadLocale(locale: Locales = 'en') {
  const {messages} = nativeMessages[locale];
  i18n.loadAndActivate({locale, messages});
}

export {i18n};
