import {Login as Component} from 'components/features/auth/login';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Features/Auth/Login',
  component: Component,
};

export const Login: Story = {
  // ...
};

export default meta;
