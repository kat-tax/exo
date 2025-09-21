import {Logout as Component} from 'components/features/auth/logout';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Features/Auth/Logout',
  component: Component,
};

export const Logout: Story = {
  // ...
};

export default meta;
