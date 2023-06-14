import {themes} from '@storybook/theming';
import type {Preview} from '@storybook/react';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    docs: {
      theme: themes.dark,
    },
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      hideNoControlsWarning: true,
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#181818',
        },
        {
          name: 'light',
          value: '#f3f3f3',
        },
      ],
    },
  },
};

export default preview;
