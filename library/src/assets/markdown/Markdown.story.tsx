import {Markdown as Component} from './Markdown';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Assets/Markdown',
  component: Component,
};

export const Markdown: Story = {
  args: {
    children: '# Hello World',
  },
};

export default meta;
