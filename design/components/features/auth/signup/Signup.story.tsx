import {Signup as Component} from 'components/features/auth/signup';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Features/Auth/Signup',
  component: Component,
};

export const Signup: Story = {
  // ...
};

export default meta;
