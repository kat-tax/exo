import {LayoutApp as Component} from 'components/navigation/layouts/layout-app';
import {ScreenHome} from 'components/navigation/screens/screen-home';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Navigation/Layouts/LayoutApp',
  component: Component,
};

export const LayoutApp: Story = {
  args: {
    boolean: true,
    outlet: (
      <ScreenHome/>
    ),
  },
};

export default meta;
