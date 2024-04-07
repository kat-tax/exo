import {Calendar as Component} from './Calendar';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Interface/Calendar',
  component: Component,
};

export const Sandbox: Story = {
  args: {

  },
};

export default meta;
