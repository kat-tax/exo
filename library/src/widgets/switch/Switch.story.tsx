import {Switch as Component} from './Switch';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Widgets/Switch',
  component: Component,
};

export const Switch: Story = {
  args: {

  },
};

export default meta;
