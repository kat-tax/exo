import type {StorybookConfig} from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    {
      titlePrefix: 'Guides',
      directory: '../../../packages/ui/docs',
      files: '**/*.mdx',
    },
    {
      titlePrefix: 'Components',
      directory: '../../../packages/ui/components',
      files: '**/*.stories.tsx',
    },
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
    builder: '@storybook/builder-vite',
  },
  typescript: {
    reactDocgen: 'react-docgen',
  },
  staticDirs: ['./assets'],
};

export default config;
