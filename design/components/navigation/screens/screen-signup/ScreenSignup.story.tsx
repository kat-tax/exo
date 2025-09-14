import {ScreenSignup as Component} from 'components/navigation/screens/screen-signup';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Navigation/Screens/ScreenSignup',
  component: Component,
};

export const ScreenSignup: Story = {
  // ...
};

export default meta;
