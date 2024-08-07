import {statSync, readFileSync, writeFileSync} from 'node:fs';

const LOCALE_CONFIG = '../../locales.ts';

if (statSync(LOCALE_CONFIG)) {
  const contents = readFileSync(LOCALE_CONFIG, 'utf8');
  writeFileSync(
    './locales.ts',
    `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT THIS FILE DIRECTLY.\n// EDIT THE "locales.ts" FILE IN THE ROOT INSTEAD. \n\n${contents}`,
    'utf-8'
  );
}
