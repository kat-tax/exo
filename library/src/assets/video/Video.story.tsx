import {Video as Component} from './Video';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Assets/Video',
  component: Component,
};

export const Video: Story = {
  args: {
    source: {
      uri: 'https://get.ult.dev/samples/bunny.mp4',
    },
    style: {
      width: 685,
      height: 386,
    },
  },
};

export default meta;
