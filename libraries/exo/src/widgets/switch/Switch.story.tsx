import {Switch as Component} from './Switch';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Interface/Switch',
  component: Component,
};

export const Sandbox: Story = {
  args: {

  },
};

export default meta;
