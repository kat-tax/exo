import {Checkbox as Component} from './Checkbox';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Widgets/Checkbox',
  component: Component,
};

export const Checkbox: Story = {
  args: {
    value: true,
  },
};

export default meta;
