import {I18nService} from './I18n';

export type * from './I18n.interface';
export const I18n = new I18nService();
export const loadLocale = I18n.loadLocale;
export const getLocale = I18n.getLocale;

export * from '@lingui/react';
export {i18n} from '@lingui/core';
export {default as config} from './lingui';
