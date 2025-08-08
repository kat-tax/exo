import {sourceLocale} from 'config/locales';
import {i18n} from '@lingui/core';
import {isRTL} from './rtl';

import type {Messages} from '@lingui/core';
import type {Locales} from 'config/locales';

export {i18n, isRTL};

export async function load(locale: Locales = sourceLocale) {
  const {messages} = await import(`../msg/${locale}.json`) as {messages: Messages};
  i18n.loadAndActivate({locale, messages});
}
