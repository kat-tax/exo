import {Rive as Component} from './Rive';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Assets/Rive',
  component: Component,
};

export const Sandbox: Story = {
  args: {
    url: 'https://get.ult.dev/samples/cursor.riv',
    style: {
      width: 320,
      height: 320,
    },
  },
};

export default meta;
