import {Button as Component} from './Button';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Button',
  component: Component,
};

export const Default: Story = {
  args: {
    showlabel: true,
    label: 'Tests',
    state: 'Default',
  },
};

export const Hover: Story = {
  args: {
    showlabel: true,
    label: 'Tests',
    state: 'Hover',
  },
};

export const Selected: Story = {
  args: {
    showlabel: true,
    label: 'Tests',
    state: 'Selected',
  },
};

export default meta;
