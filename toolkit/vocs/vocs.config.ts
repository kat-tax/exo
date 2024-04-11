import {defineConfig} from 'vocs';
import viteDocs from 'builder/vite.docs';
import sidebar from 'config/docs.sidebar';
import config from 'config';

export default defineConfig({
  title: config.APP_NAME,
  sponsors: [],
  socials: [{
    icon: 'github',
    link: config.LINK_GITHUB,
  },
  {
    icon: 'discord',
    link: config.LINK_DISCORD,
  },
  {
    icon: 'x',
    link: config.LINK_X,
  }],
  topNav: [
    {
      text: 'Storybook',
      link: config.LINK_STORYBOOK,
    },
    { 
      text: `v${config.LIB_VERSION}`, 
      items: [
        { 
          text: 'Changelog', 
          link: `${config.LINK_GITHUB}/blob/master/CHANGELOG.md`, 
        },
        { 
          text: 'License', 
          link: `${config.LINK_GITHUB}/blob/master/LICENSE.md`, 
        }, 
      ],
    },
  ],
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
  font: { 
    google: config.FONT_NAME,
  },
  twoslash: {
    compilerOptions: {
      moduleResolution: 100,
    }
  },
  vite: viteDocs({
    command: 'build',
    mode: '',
  }),
  ogImageUrl: 'https://vocs.dev/api/og?logo=%logo&title=%title&description=%description',
  rootDir: './',
  sidebar,
});
