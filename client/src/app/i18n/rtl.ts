const rtlScripts = new Set([
  'Arab',
  'Syrc',
  'Samr',
  'Mand',
  'Thaa',
  'Mend',
  'Nkoo',
  'Adlm',
  'Rohg',
  'Hebr',
]);

const rtlLangs = new Set([
  'ae',  // Avestan
  'ar',  // Arabic
  'arc', // Aramaic
  'bcc', // Southern Balochi
  'bqi', // Bakthiari
  'ckb', // Sorani
  'dv',  // Dhivehi
  'fa',
  'far', // Persian
  'glk', // Gilaki
  'he',
  'iw',  // Hebrew
  'khw', // Khowar
  'ks',  // Kashmiri
  'ku',  // Kurdish
  'mzn', // Mazanderani
  'nqo', // N'Ko
  'pnb', // Western Punjabi
  'ps',  // Pashto
  'sd',  // Sindhi
  'ug',  // Uyghur
  'ur',  // Urdu
  'yi',  // Yiddish
]);

const cache = new Map();

/**
 * Determine the writing direction of a locale
 */
export function isRTL(locale?: string): boolean {
  if (!locale) {
    return false;
  }

  const cachedRTL = cache.get(locale);
  if (cachedRTL) {
    return cachedRTL;
  }

  let isRTL = false;
  if (Intl.Locale) {
    const script = new Intl.Locale(locale).maximize().script;
    isRTL = !!script && rtlScripts.has(script);
  } else {
    const lang = locale.split('-')[0];
    isRTL = rtlLangs.has(lang);
  }

  cache.set(locale, isRTL);
  return isRTL;
}
