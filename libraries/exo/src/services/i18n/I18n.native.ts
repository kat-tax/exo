import {i18n} from '@lingui/core';
import {I18nProvider} from '@lingui/react';
import {Platform, NativeModules} from 'react-native';
import {default as sourceLocale} from 'cfg/locales';
import type {I18nBase, Locales, Messages} from './I18n.interface';

export class I18nService implements I18nBase {
  i18n: typeof i18n = i18n;
  Provider: typeof I18nProvider = I18nProvider;

  async loadLocale(locale: Locales = sourceLocale) {
    const {messages} = require(`../../../../../content/locales/${locale}`) as Messages[Locales];
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
