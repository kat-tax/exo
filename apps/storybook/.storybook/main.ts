import type {StorybookConfig} from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    {
      titlePrefix: 'References',
      directory: '../pages',
      files: '**/*.mdx',
    },
    {
      titlePrefix: 'Components',
      directory: '../../../libraries/ui/components',
      files: '**/*.story.tsx',
    },
    {
      titlePrefix: 'Primitives',
      directory: '../../../libraries/exo/src/components',
      files: '**/*.story.tsx',
    },
  ],
  staticDirs: [
    './assets',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-designs',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
    defaultName: 'Docs',
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
