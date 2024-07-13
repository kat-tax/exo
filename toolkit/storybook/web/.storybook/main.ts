import type {StorybookConfig} from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    {
      titlePrefix: 'References',
      directory: '../../../../guides/storybook',
      files: '**/*.mdx',
    },
    {
      titlePrefix: 'Components',
      directory: '../../../../design/components',
      files: '**/*.story.tsx',
    },
    {
      titlePrefix: 'Primitives',
      directory: '../../../../library/src',
      files: '**/*.story.tsx',
    },
  ],
  staticDirs: [
    '../../../../design/assets',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-designs',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
  ],
  docs: {
    autodocs: true,
    docsMode: false,
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: '../../bundler/gen/web/storybook.js',
      },
    },
    disableTelemetry: true,
  },
  async viteFinal(config) {
    return {
      ...config,
      build: {
        ...config.build,
        chunkSizeWarningLimit: 800,
      },
    };
  }
};

export default config;
