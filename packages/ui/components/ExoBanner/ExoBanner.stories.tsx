import {ExoBanner as Component} from 'components/ExoBanner';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Banner',
  component: Component,
};

export const Banner: Story = {
  args: {
    thumbnail: 'https://placekitten.com/90/90',
    contents: 'Lorem ipsum dolor sit',
    header: 'Header',
    footer: 'Footer',
  },
};

export default meta;
