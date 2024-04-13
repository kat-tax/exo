import {Checkbox as Component} from './Checkbox';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Widgets/Checkbox',
  component: Component,
};

export const Sandbox: Story = {
  args: {

  },
};

export default meta;
