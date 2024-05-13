import {i18n} from '@lingui/core';
import {sourceLocale} from 'config/locales';
import {Platform, NativeModules} from 'react-native';

import type {I18nBase} from './I18n.interface';
import type {Locales} from 'config/locales';

import {messages as en} from './messages/en';
import {messages as ru} from './messages/ru';
import {messages as ja} from './messages/ja';
import {messages as ar} from './messages/ar';

const locales = {en, ru, ja, ar};

export class I18nService implements I18nBase {
  getLocale(): string {
    switch (Platform.OS) {
      case 'ios':
        return ((NativeModules.SettingsManager.settings.AppleLocale
          || NativeModules.SettingsManager.settings.AppleLanguages[0])
          ?.split('-')?.shift()) || sourceLocale;
      case 'android':
        return (NativeModules.I18nManager.localeIdentifier
          ?.split('_')?.shift()) || sourceLocale;
      default:
        return sourceLocale;
    }
  }

  async loadLocale(locale: Locales = sourceLocale) {
    const messages = locales[locale];
    i18n.loadAndActivate({locale, messages});
  }
}
