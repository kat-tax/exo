import {Video as Component} from './Video';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Assets/Video',
  component: Component,
};

export const Sandbox: Story = {
  args: {
    source: {
      uri: 'https://get.ult.dev/samples/bunny.mp4',
    },
    style: {
      width: 480,
      height: 320,
    },
  },
};

export default meta;
