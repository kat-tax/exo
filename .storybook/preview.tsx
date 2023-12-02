import React from 'react';
import {themes} from '@storybook/theming';
import {UnistylesTheme} from 'react-native-unistyles';
import theme from '../src/theme';

import type {Preview} from '@storybook/react';

const preview: Preview = {
  decorators: [
    (Story) => (
      <UnistylesTheme theme={theme}>
        <Story/>
      </UnistylesTheme>
    ),
  ],
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
