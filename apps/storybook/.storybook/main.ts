import type {StorybookConfig} from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    {
      titlePrefix: 'References',
      directory: '../docs',
      files: '**/*.mdx',
    },
    {
      titlePrefix: 'Components',
      directory: '../../../libraries/ui/components',
      files: '**/*.stories.tsx',
    },
  ],
  staticDirs: [
    './assets',
  ],
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
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: '../client/vite.config.mjs',
      },
    }
  },
  typescript: {
    reactDocgen: 'react-docgen',
  },
};

export default config;
