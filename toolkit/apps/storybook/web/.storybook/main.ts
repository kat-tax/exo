import type {StorybookConfig} from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    {
      titlePrefix: 'References',
      directory: '../../../../../guides/storybook',
      files: '**/*.mdx',
    },
    {
      titlePrefix: 'Components',
      directory: '../../../../../design/components',
      files: '**/*.story.tsx',
    },
    {
      titlePrefix: 'Primitives',
      directory: '../../../../../library/src',
      files: '**/*.story.tsx',
    },
  ],
  staticDirs: [
    '../../../../../design/assets',
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
    defaultName: 'Docs',
    autodocs: true,
  },
  core: {
    disableTelemetry: true,
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: '../../../../toolkit/build/gen/web/vite.client.js',
      },
    }
  },
  typescript: {
    reactDocgen: 'react-docgen',
  },
};

export default config;
