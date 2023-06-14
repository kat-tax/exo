import type {StorybookConfig} from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    {
      titlePrefix: 'Guides',
      directory: '../src/docs',
      files: '*.mdx',
    },
    {
      titlePrefix: 'Components',
      directory: '../src/interface/base',
      files: '*.stories.@(js|jsx|ts|tsx)',
    },
  ],
  staticDirs: ['./assets'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
    defaultName: 'Documentation',
  },
  core: {
    disableTelemetry: true,
  },
};

export default config;
