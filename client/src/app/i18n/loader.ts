import {i18n} from '@lingui/core';
import {isRTL} from 'app/i18n/rtl';
import {sourceLocale} from 'config/locales';

import type {Messages} from '@lingui/core';
import type {Locales} from 'config/locales';

export {i18n, isRTL};

export async function load(locale: Locales = sourceLocale) {
  const {messages} = await import(`./messages/${locale}.json?lingui`) as {messages: Messages};
  i18n.loadAndActivate({locale, messages});
}
