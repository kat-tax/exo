import {Icon as Component} from './Icon';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Assets/Icon',
  component: Component,
};

export const Sandbox: Story = {
  args: {
    name: 'ph:alien',
    color: '#666',
    size: 48,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/DFmPlavFWyMaYJtoGLhGz3/EXO-%5B45%5D-(Copy)?node-id=2029%3A647',
    },
  },
};

export default meta;
