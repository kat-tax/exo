import {Image as Component} from './Image';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Assets/Image',
  component: Component,
};

export const Sandbox: Story = {
  args: {
    url: 'https://placekitten.com/480/320',
    style: {
      width: 480,
      height: 320,
    },
  },
};

export default meta;
