import {Lottie as Component} from './Lottie';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Assets/Lottie',
  component: Component,
};

export const Lottie: Story = {
  args: {
    url: 'https://get.ult.dev/samples/stack.lottie',
    autoplay: true,
    loop: true,
  },
};

export default meta;
