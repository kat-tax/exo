import {Map as Component} from './Map';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Assets/Map',
  component: Component,
};

export const Map: Story = {
  args: {
    // ...
  }
};

export default meta;
