import {Note as Component} from './Note';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Assets/Note',
  component: Component,
};

export const Note: Story = {
  args: {
    // ...
  },
};

export default meta;
