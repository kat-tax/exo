import {copy} from 'fs-extra';
import {readdir} from 'node:fs/promises';

const paths = {
  components: ['../../libraries/ui/components', './pages/components'],
  primitives: ['../../libraries/exo/src/components', './pages/primitives'],
  hooks: ['../../libraries/exo/src/hooks', './pages/hooks'],
};

const copydocs = (files: string[], paths: string[]) => files
  .flat(1)
  .filter(f => f.endsWith('.mdx'))
  .map(async path => {
    await copy(
      `${paths[0]}/${path}`,
      `${paths[1]}/${path.split('/').slice(0, -1).join('/')}.mdx`
    );
  });

const [components, primitives, hooks] = [
  await readdir(paths.components[0], {recursive: true}),
  await readdir(paths.primitives[0], {recursive: true}),
  await readdir(paths.hooks[0], {recursive: true}),
];

await Promise.all([
  copydocs(components, paths.components),
  copydocs(primitives, paths.primitives),
  copydocs(hooks, paths.hooks),
].flat(1));
