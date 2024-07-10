import React from 'react';
import {themes} from '@storybook/theming';
import {initialTheme, themes as appThemes} from 'design/theme';
import {Story} from 'storybook-common/utils/blocks';

import type {Preview} from '@storybook/react';

const preview: Preview = {
  decorators: [
    (Outlet, {globals, parameters}) => (
      <Story {...{globals, parameters}}>
        <Outlet/>
      </Story>
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
              'Markdown',
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
      default: initialTheme,
      values: Object.keys(appThemes)
      .sort((a, b) => a.localeCompare(b))
      .map((t) => ({
        name: t.charAt(0).toUpperCase() + t.slice(1),
        value: appThemes[t || initialTheme]?.colors?.background || 'transparent',
      })),
    },
  },
};

export default preview;
