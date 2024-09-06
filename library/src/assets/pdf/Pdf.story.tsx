import {Pdf as Component} from './Pdf';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Assets/Pdf',
  component: Component,
};

export const Pdf: Story = {
  args: {
    // ...
  },
};

export default meta;
