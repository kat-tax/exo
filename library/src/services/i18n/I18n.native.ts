import {i18n} from '@lingui/core';
import {sourceLocale} from 'config/locales';
import {Platform, NativeModules} from 'react-native';

import type {I18nBase, Messages} from './I18n.interface';
import type {Locales} from 'config/locales';


export class I18nService implements I18nBase {
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

  async loadLocale(locale: Locales = sourceLocale) {
    const {messages} = require(`./messages/${locale}.ts`) as Messages[Locales];
    i18n.loadAndActivate({locale, messages});
  }
}
