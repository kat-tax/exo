import 'design/styles';

import React from 'react';
import {themes} from '@storybook/theming';
import {initialTheme, themes as uniThemes} from 'design/theme';
import {Story} from 'storybook-common/utils/blocks';

import type {Preview} from '@storybook/react';

const preview: Preview = {
  decorators: [
    (Outlet) => (
      <Story>
        <Outlet/>
      </Story>
    ),
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Change the component theme',
      defaultValue: initialTheme,
      toolbar: {
        icon: 'paintbrush',
        dynamicTitle: true,
        items: Object.keys(uniThemes).map((k) => ({
          value: k,
          title: k.charAt(0).toUpperCase() + k.slice(1),
          icon: k === 'light' ? 'sun' : k === 'dark' ? 'moon' : '',
        })),
      },
    },
  },
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
    options: {
      storySort: {
        method: '',
        order: [
          'References', [
            'Get Started',
            'Theme',
            'Colors',
            'Icons',
          ],
          'Components',
          'Primitives', [
            'Assets', [
              'Icon',
              'Image',
              'Video',
              'Lottie',
              'Rive',
            ],
            'Widgets', [
              'Calendar',
              'Progress',
              'Slider',
              'Radio',
              'Switch',
              'Picker',
              'Checkbox',
            ],
          ],
        ],
        locales: '',
      },
    },
    backgrounds: {
      values: [
        {
          name: 'Dark',
          value: '#181818',
        },
        {
          name: 'Light',
          value: '#f3f3f3',
        },
      ],
    },
  },
};

export default preview;
