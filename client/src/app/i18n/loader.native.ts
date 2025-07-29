import {i18n} from '@lingui/core';
import {isRTL} from 'app/i18n/rtl';
import {sourceLocale} from 'config/locales';

import type {Messages} from '@lingui/core';
import type {Locales} from 'config/locales';

// Load all messages from the messages directory
// @ts-expect-error - Available in Metro (transformer.unstable_allowRequireContext)
const ctx = require.context('./messages', false, /\.json$/);
const msg = new Map<Locales, Messages>();
ctx.keys().forEach((key: string) => {
  const lang = ctx(key) as {messages: Messages};
  msg.set(key.replace('./', '').replace('.json', '') as Locales, lang.messages);
});

export {i18n, isRTL};

export async function load(locale: Locales = sourceLocale) {
  i18n.loadAndActivate({locale, messages: msg.get(locale) as Messages});
}
