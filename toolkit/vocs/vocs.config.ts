import {defineConfig} from 'vocs';
// import {themes} from 'design/theme';
import viteDocs from 'builder/vite.docs';
import sidebar from 'config/docs.sidebar';
import config from 'config';

export default defineConfig({
  title: config.APP_NAME,
  sponsors: [],
  socials: [
    {
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
    },
  ],
  topNav: [
    /*{
      text: 'Storybook',
      link: config.LINK_STORYBOOK,
    },*/
    {
      text: `v${config.LIB_VERSION}`,
      link: `https://www.npmjs.com/package/${config.LIB_NAME}`,
      /*items: [
        {
          text: 'Changelog',
          link: `${config.LINK_GITHUB}/blob/master/CHANGELOG.md`,
        },
        {
          text: 'License',
          link: `${config.LINK_GITHUB}/blob/master/LICENSE.md`,
        },
      ],*/
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
    },
  },
  /*
    theme: {
      accentColor: {
        light: themes.light.colors.primary,
        dark: themes.dark.colors.primary,
      },
      variables: {
        color: {
          text: {
            light: themes.light.colors.foreground,
            dark: themes.dark.colors.foreground,
          },
          background: {
            light: themes.light.colors.background,
            dark: themes.dark.colors.background,
          },
          border: {
            light: themes.light.colors.border,
            dark: themes.dark.colors.border,
          },
        },
      }
    },
  */
  font: {
    google: config.FONT_NAME,
  },
  vite: viteDocs({
    command: 'build',
    mode: '',
  }),
  twoslash: {
    compilerOptions: {
      moduleResolution: 100,
    }
  },
  ogImageUrl: 'https://vocs.dev/api/og?logo=%logo&title=%title&description=%description',
  rootDir: './',
  sidebar,
});
