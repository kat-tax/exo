import {copy, ensureDir} from 'fs-extra';
import {readdir} from 'node:fs/promises';

const paths = {
  docs: ['../../content/docs', './pages'],
  components: ['../../libraries/ui/components', './pages/components'],
  primitives: ['../../libraries/exo/src', './pages/primitives'],
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

const [components, primitives] = await Promise.all([
  readdir(paths.components[0], {recursive: true}),
  readdir(paths.primitives[0], {recursive: true}),
]);


await Promise.all([
  ensureDir(paths.docs[1]),
  copy(paths.docs[0], paths.docs[1]),
  copymdx(components, paths.components),
  copymdx(primitives, paths.primitives),
].flat(1));
