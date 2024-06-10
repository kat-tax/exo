import {Image as Component} from './Image';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Assets/Image',
  component: Component,
};

export const Image: Story = {
  args: {
    url: 'https://get.ult.dev/samples/turing.jpg',
    thumbhash: 'XwgGFoKwnYZxZ3emWReEaGV30FUKnLQ',
    resizeMode: 'cover',
    width: 480,
    height: 404,
  },
};

export default meta;
