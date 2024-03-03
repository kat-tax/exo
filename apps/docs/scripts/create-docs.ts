import {copy} from 'fs-extra';
import {readdir} from 'node:fs/promises';

const paths = {
  components: '../../libraries/ui/components',
  primitives: '../../libraries/exo/src/components',
  hooks: '../../libraries/exo/src/hooks',
};

const [components, primitives, hooks] = [
  await readdir(paths.components, {recursive: true}),
  await readdir(paths.primitives, {recursive: true}),
  await readdir(paths.hooks, {recursive: true}),
];

await Promise.all([
  copydocs(components, paths.components, './pages/components'),
  copydocs(primitives, paths.primitives, './pages/primitives'),
  copydocs(hooks, paths.hooks, './pages/hooks'),
].flat(1));

function copydocs(files: string[], from: string, to: string) {
  files.flat(1).filter(f => f.endsWith('.mdx')).map(async path => {
    await copy(`${from}/${path}`, `${to}/${path.split('/').slice(0, -1).join('/')}.mdx`);
  });
}
