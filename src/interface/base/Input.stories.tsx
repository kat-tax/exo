import {Input as Component} from './Input';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Input',
  component: Component,
};

export const Input: Story = {
  args: {
    placeholder: 'Search...',
  },
};

export default meta;
