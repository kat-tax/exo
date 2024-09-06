import {Model as Component} from './Model';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Assets/Model',
  component: Component,
};

export const Model: Story = {
  args: {
    // ...
  },
};

export default meta;
