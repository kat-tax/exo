import {i18n} from '@lingui/core';
import {I18nProvider} from '@lingui/react';
import {Platform, NativeModules} from 'react-native';
import type {I18nBase, Locales, Messages} from './I18n.interface';

const imports = {} as Messages;

imports['en'] = require('../../../../../content/locales/en');
imports['de'] = require('../../../../../content/locales/de');
imports['es'] = require('../../../../../content/locales/es');
imports['pt'] = require('../../../../../content/locales/pt');
imports['ja'] = require('../../../../../content/locales/ja');
imports['ru'] = require('../../../../../content/locales/ru');
imports['ar'] = require('../../../../../content/locales/ar');
imports['id'] = require('../../../../../content/locales/id');

export class I18nService implements I18nBase {
  i18n: typeof i18n = i18n;
  Provider: typeof I18nProvider = I18nProvider;

  async loadLocale(locale: Locales = 'en') {
    const {messages} = imports[locale];
    i18n.loadAndActivate({locale, messages});
  }

  getLocale(short?: boolean) {
    const locale: string = Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale
        || NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;
    return short
      ? Platform.OS === 'ios'
        ? locale.split('-').shift() || locale
        : locale.split('_').shift() || locale
      : locale;
  }
}
