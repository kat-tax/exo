import {I18nService} from './I18n';

export type * from './I18n.interface';
export const I18n = new I18nService();
export const i18n = I18n.i18n;
export const I18nProvider: typeof I18n.Provider = I18n.Provider;
export const loadLocale = I18n.loadLocale;
export const getLocale = I18n.getLocale;

export {default as config} from './lingui';
export * from '@lingui/react';

