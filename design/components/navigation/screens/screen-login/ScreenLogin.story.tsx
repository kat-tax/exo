import {ScreenLogin as Component} from 'components/navigation/screens/screen-login';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Navigation/Screens/ScreenLogin',
  component: Component,
};

export const ScreenLogin: Story = {
  // ...
};

export default meta;
