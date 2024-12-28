import {Code as Component} from './Code';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Assets/Code',
  component: Component,
};

export const Code: Story = {
  args: {
    // ...
  },
};

export default meta;
