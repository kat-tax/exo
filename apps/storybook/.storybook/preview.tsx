import React from 'react';
import {themes} from '@storybook/theming';
import {type Preview} from '@storybook/react';
import uniDefault, {themes as uniThemes} from 'ui/theme';
import {StoryEnv} from '../components/StoryEnv';
import 'client/src/styles';

const preview: Preview = {
  decorators: [
    (Story) => (
      <StoryEnv>
        <Story/>
      </StoryEnv>
    ),
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Change the component theme',
      defaultValue: uniDefault,
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
            'Themes',
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
            'Interface', [
              'Checkbox',
              'Switch',
              'Radio',
              'Slider',
              'Progress',
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
