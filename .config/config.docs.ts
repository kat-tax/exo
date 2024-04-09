import type {Config} from 'vocs';
import config from './src/index.js';

export default <Config> {
  title: config.APP_NAME,
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
  sidebar: [
    {
      text: 'Start',
      link: '/start',
      collapsed: false,
      items: [
        {
          text: 'with Figma',
          link: '/start/figma',
        },
        {
          text: 'with Command Line',
          link: '/start/command',
        },
        {
          text: 'with an Existing Project',
          link: '/start/manual',
        },
      ],
    },
    {
      text: 'Primitives',
      collapsed: false,
      items: [
        {
          text: 'Assets',
          items: [
            {
              text: 'Icon',
              link: '/primitives/assets/icon',
            },
            {
              text: 'Image',
              link: '/primitives/assets/image',
            },
            {
              text: 'Video',
              link: '/primitives/assets/video',
            },
            {
              text: 'Lottie',
              link: '/primitives/assets/lottie',
            },
            {
              text: 'Rive',
              link: '/primitives/assets/rive',
            },
          ],
        },
        {
          text: 'Services',
          items: [
            {
              text: 'Router',
              link: '/primitives/services/router',
            },
            {
              text: 'Storage',
              link: '/primitives/services/storage',
            },
            {
              text: 'Device',
              link: '/primitives/services/device',
            },
            {
              text: 'Redux',
              link: '/primitives/services/redux',
            },
            {
              text: 'Form',
              link: '/primitives/services/form',
            },
            {
              text: 'I18n',
              link: '/primitives/services/i18n',
            },
          ],
        },
        {
          text: 'Interactions',
          items: [
            {
              text: 'Gesture',
              link: '/primitives/interactions/gesture',
            },
            {
              text: 'Motion',
              link: '/primitives/interactions/motion',
            },
          ],
        },
        {
          text: 'Widgets',
          items: [
            {
              text: 'Calendar',
              link: '/primitives/widgets/calendar',
            },
            {
              text: 'Progress',
              link: '/primitives/widgets/progress',
            },
            {
              text: 'Slider',
              link: '/primitives/widgets/slider',
            },
            {
              text: 'Radio',
              link: '/primitives/widgets/radio',
            },
            {
              text: 'Switch',
              link: '/primitives/widgets/switch',
            },
            {
              text: 'Checkbox',
              link: '/primitives/widgets/checkbox',
            },
          ],
        },
      ],
    },
  ],
  font: { 
    google: config.FONT_NAME,
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
  sponsors: [],
}
