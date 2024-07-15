import {writeFileSync, readdirSync, existsSync} from 'node:fs';
import matter from 'gray-matter';

// Paths

const GUIDES = '../../guides/docs';
const PRIMITIVES = '../../library/src';
const COMPONENTS = '../../design/components';

// Groups

const guideGroups = readdirSync(GUIDES).filter(excludeGroups);
const primitivesGroups = readdirSync(PRIMITIVES).filter(excludeGroups);
const componentsGroups = readdirSync(COMPONENTS).filter(excludeGroups);
const hasComponents = componentsGroups.length > 0;

// Mappings

const sidebar = [
  // Index guides
  ...guideGroups.map(g => ({
    link: existsSync(`${GUIDES}/${g}/index.mdx`) ? `/${g}` : undefined,
    text: titleCase(g),
    collapsed: false,
    items: readdirSync(`${GUIDES}/${g}`).filter(excludeFiles).map(f => ({
      link: `/${g}/${f.replace('.mdx', '')}`,
      text: getTitle(f, `${GUIDES}/${g}/${f}`),
    })),
  })).filter(g => g.items.length),
  // Index components
  hasComponents && {
    text: 'Components',
    collapsed: false,
    items: componentsGroups.map(g => ({
      text: titleCase(g),
      items: readdirSync(`${COMPONENTS}/${g}`).filter(excludeFiles).map(s => ({
        text: titleCase(s),
        items: readdirSync(`${COMPONENTS}/${g}/${s}`).filter(excludeFiles).map(f => ({
          link: `/components/${g}/${s}/${f}`,
          text: getTitle(f, `${COMPONENTS}/${g}/${s}/${f}/${titleCase(f, true)}.docs.mdx`),
        })),
      })),
    })).filter(g => g.items.length),
  },
  // Index primitives
  {
    text: 'Primitives',
    collapsed: hasComponents,
    items: primitivesGroups.map(g => ({
      text: titleCase(g),
      items: readdirSync(`${PRIMITIVES}/${g}`).filter(excludeFiles).map(f => ({
        link: `/primitives/${g}/${f}`,
        text: getTitle(f, `${PRIMITIVES}/${g}/${f}/${titleCase(f, true)}.docs.mdx`),
      })),
    })).filter(g => g.items.length),
  },
].filter(Boolean);

// Output

writeFileSync(
  './gen/docs.sidebar.js',
  `export default ${JSON.stringify(sidebar, null, 2)}`
);

// Helpers

function titleCase(s, nospace) {
  return s.toLowerCase()
    .replace('-', ' ')
    .split(' ')
    .map(w => w.replace(w[0], w[0].toUpperCase()))
    .join(nospace ? '' : ' ');
}

function excludeGroups(file) {
  return !file.includes('.')
    && !file.includes('_')
}

function excludeFiles(file) {
  return file !== 'index.mdx'
    && file !== '.DS_Store'
    && !file.endsWith('.ts')
    && !file.endsWith('.tsx')
}

function getTitle(file, path) {
  return matter.read(path, 'utf-8').data.linkTitle
    || titleCase(file)
}
