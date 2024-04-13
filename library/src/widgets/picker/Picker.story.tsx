import {Picker} from './Picker';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Picker>;

const meta: Meta<typeof Picker> = {
  title: 'Widgets/Picker',
  component: Picker,
};

export const Sandbox: Story = {
  args: {
    style: {
      width: 300,
    },
  },
};

export default meta;
