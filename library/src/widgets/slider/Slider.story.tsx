import {Slider as Component} from './Slider';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Widgets/Slider',
  component: Component,
};

export const Slider: Story = {
  args: {
    style: {
      width: 300,
    },
  },
};

export default meta;
