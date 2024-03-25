import {Picker as Component} from './Picker';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Interface/Picker',
  component: Component,
};

export const Sandbox: Story = {
  args: {
    style: {
      width: 300,
    },
  },
};

export default meta;
