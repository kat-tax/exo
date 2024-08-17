import {Book as Component} from './Book';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Assets/Book',
  component: Component,
};

export const Book: Story = {
  args: {
    url: 'https://get.ult.dev/samples/book.epub',
  },
};

export default meta;
