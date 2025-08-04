import {writeFileSync, readdirSync, existsSync} from 'node:fs';

const CLIENT_SRC = '../../client/src';
const SLICES_TEMPLATE = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT OR COMMIT THIS FILE.

/** Available reducer slices */
export type ReducerKeys =
{{REDUCER_KEYS}}
`;

const reducerKeys = [];
const folders = readdirSync(CLIENT_SRC, {withFileTypes: true})
  .filter(d => d.isDirectory())
  .map(d => d.name);

for (const folder of folders) {
  const storeFile = existsSync(`${CLIENT_SRC}/${folder}/store.ts`);
  if (storeFile) {
    reducerKeys.push(`  | '${folder}'`);
  }
}

writeFileSync(
  `${CLIENT_SRC}/app/data/provider/lib/slices.types.ts`,
  SLICES_TEMPLATE
    .replace('{{REDUCER_KEYS}}', reducerKeys.join('\n')),
  'utf-8'
);
