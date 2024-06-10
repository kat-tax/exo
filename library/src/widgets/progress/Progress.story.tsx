import {Progress as Component} from './Progress';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Widgets/Progress',
  component: Component,
};

export const Progress: Story = {
  args: {
    progress: 50,
    style: {
      width: 300,
    },
  },
};

export default meta;
