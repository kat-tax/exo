import {i18n} from '@lingui/core';
import {isRTL} from 'app/i18n/rtl';
import {sourceLocale} from 'config/locales';

import type {Messages} from '@lingui/core';
import type {Locales} from 'config/locales';

// @ts-expect-error - Available in Metro (transformer.unstable_allowRequireContext)
const ctx = require.context('./messages', false, /\.json$/);
const dir = new Map<Locales, Messages>();
ctx.keys().forEach((p: string) => dir.set(p.slice(2, -5) as Locales, ctx(p).messages));

export {i18n, isRTL};

export async function load(locale: Locales = sourceLocale) {
  i18n.loadAndActivate({locale, messages: dir.get(locale) ?? {}});
}
