import {i18n} from '@lingui/core';
import {isRTL} from 'app/i18n/rtl';
import {sourceLocale} from 'config/locales';

import type {Messages} from '@lingui/core';
import type {Locales} from 'config/locales';

// @ts-expect-error - Available in Metro (transformer.unstable_allowRequireContext)
const translations = require.context('./messages', false, /\.json$/);

export {i18n, isRTL};

export async function load(locale: Locales = sourceLocale) {
  const {messages} = translations(`./messages/${locale}.json`) as {messages: Messages};
  i18n.loadAndActivate({locale, messages});
}
