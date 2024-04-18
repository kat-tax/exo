import {parse as parseDocs} from 'react-docgen';
import {readdir, readFile, writeFile} from 'node:fs/promises';
import {copy, ensureDir} from 'fs-extra';
import {parse} from 'node:path';
import config from 'config';

import type {PropDescriptor} from 'react-docgen/dist/Documentation';

const paths = {
  guides: ['../../guides/docs', './pages'],
  primitives: ['../../library/src', './pages/primitives'],
  components: ['../../design/components', './pages/components'],
};

const [primitives, components] = await Promise.all([
  readdir(paths.primitives[0], {recursive: true}),
  readdir(paths.components[0], {recursive: true}),
]);

await ensureDir(paths.guides[1]);
await Promise.all([
  processGuides(paths.guides[0], paths.guides[1]),
  processLibrary(primitives, paths.primitives),
  processComponents(components, paths.components),
].flat(1));

async function processGuides(input: string, output: string) {
  await copy(input, output);
}

async function processLibrary(files: string[], paths: string[]) {
  files.flat(1).filter(f => f.endsWith('.mdx')).map(async path => {
    // const {name, base} = getPartsFromDocPath(path);
    // 1. Read the component mdx file
    // const mdx = await readFile(`${paths[0]}/${base}/${name}.mdx`, 'utf8');
    // 2. Find summary directive (e.g. :::summary Icon :::)
    // 3. Find prop table directive (e.g. :::props IconProps :::)
    // 4. Parse the manifest.json for the data needed
    // 5. Generate the summary string and props table markdown
    // 6. Replace the directives and write the new file
    await copy(
      `${paths[0]}/${path}`,
      `${paths[1]}/${path.split('/').slice(0, -1).join('/')}.mdx`
    );
  });
}

async function processComponents(files: string[], paths: string[]) {
  const [input, output] = paths;
  files.flat(1).filter(f => f.endsWith('.mdx')).map(async path => {
    const {name, base} = getPartsFromDocPath(path);
    const component = await readFile(`${input}/${base}/${name}.tsx`, 'utf8');
    const [doc] = parseDocs(component);
    let mdx = await readFile(`${input}/${base}/${name}.docs.mdx`, 'utf8');
    mdx = mdx.replace(/:::name:::/g, doc.displayName || '');
    mdx = mdx.replace(/:::desc:::/g, doc.description || '');
    mdx = mdx.replace(/:::props:::/g, getPropsTable(doc.props));
    mdx = mdx.replace(/:::import:::/g, `import {${doc.displayName}} from 'design';`);
    mdx = mdx.replace(/:::storybook:::/g, `${config.LINK_STORYBOOK}/?path=/docs/components-${base.replace('/', '-')}`);
    const example = mdx.match(/:::example(.*?):::/s)?.[1];
    if (example) mdx = mdx.replace(/:::example(.*?):::/gs, example.trim());
    await ensureDir([output, ...base.split('/')].slice(0, -1).join('/'));
    await writeFile(`${output}/${base}.mdx`, mdx, 'utf8');
  });
}

function getPropsTable(props?: Record<string, PropDescriptor>) {
  if (!props) return '';
  const table = [
    '| Name | Type | Description | Required |',
    '| ---- | ---- | ----------- | :------: |',
  ];
  for (const [name, prop] of Object.entries(props)) {
    const type = prop.flowType?.name;
    const desc = prop.description;
    const req = prop.required ? '✔️' : '';
    table.push(`| ${name} | \`${type}\` | ${desc} | ${req} |`);
  }
  return table.join('\n');
}

function getPartsFromDocPath(path: string) {
  const name = parse(path).name.replace('.docs', '');
  const base = parse(path).dir;
  return {name, base};
}
