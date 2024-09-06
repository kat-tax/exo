import {Document as Component} from './Document';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Assets/Document',
  component: Component,
};

export const Document: Story = {
  args: {
    // ...
  },
};

export default meta;
