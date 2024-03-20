import {copy} from 'fs-extra';
import {readdir} from 'node:fs/promises';

const paths = {
  start: ['../../content/docs/start', './pages/start'],
  assets: ['../../content/assets', './public'],
  components: ['../../libraries/ui/components', './pages/components'],
  primitives: ['../../libraries/exo/src/components', './pages/primitives'],
  hooks: ['../../libraries/exo/src/hooks', './pages/hooks'],
};

const copymdx = (files: string[], paths: string[]) => files
  .flat(1)
  .filter(f => f.endsWith('.mdx'))
  .map(async path => {
    await copy(
      `${paths[0]}/${path}`,
      `${paths[1]}/${path.split('/').slice(0, -1).join('/')}.mdx`
    );
  });

const [components, primitives, hooks] = await Promise.all([
  readdir(paths.components[0], {recursive: true}),
  readdir(paths.primitives[0], {recursive: true}),
  readdir(paths.hooks[0], {recursive: true}),
]);


await Promise.all([
  copy(paths.start[0], paths.start[1]),
  copy(paths.assets[0], paths.assets[1]),
  copymdx(components, paths.components),
  copymdx(primitives, paths.primitives),
  copymdx(hooks, paths.hooks),
].flat(1));
