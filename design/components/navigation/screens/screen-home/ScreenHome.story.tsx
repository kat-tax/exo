import {ScreenHome as Component} from 'components/navigation/screens/screen-home';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Navigation/Screens/ScreenHome',
  component: Component,
};

export const ScreenHome: Story = {
  // ...
};

export default meta;
