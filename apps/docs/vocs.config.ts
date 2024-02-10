import {defineConfig} from 'vocs';

export default defineConfig({
  rootDir: '.',
  title: 'EXO',
  sidebar: [
    {
      text: 'Getting Started',
      link: '/getting-started',
    },
  ],
  topNav: [
    {
      text: 'Storybook',
      link: 'https://exo.fig.run',
    },
    { 
      text: 'v1.0.0', 
      items: [
        { 
          text: 'Changelog', 
          link: 'https://github.com/kat-tax/exo/blob/master/CHANGELOG.md', 
        },
        { 
          text: 'License', 
          link: 'https://github.com/kat-tax/exo/blob/master/LICENSE.md', 
        }, 
      ],
    },
  ],
  socials: [
    {
      icon: 'github',
      link: 'https://github.com/kat-tax/exo',
    },
    {
      icon: 'discord',
      link: 'https://discord.gg/KpMZVKmfnb',
    },
    {
      icon: 'x',
      link: 'https://twitter.com/theultdev',
    },
  ],
  font: { 
    google: 'Inter',
  },
  theme: { 
    variables: {
      color: {
        background: { 
          light: 'white', 
          dark: 'black',
        },
      },
    }
  },
  vite: {
    resolve: {
      alias: {'react-native': 'react-native-web'},
      extensions: ['.web.tsx', '.web.ts', '.web.js', '.mjs', '.mts', '.ts', '.tsx', '.js', '.jsx', '.json'],
    },
  },
});
