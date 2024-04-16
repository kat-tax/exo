import {Picker as Component} from 'react-exo/picker';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Widgets/Picker',
  component: Component,
};

export const Picker: Story = {
  args: {
    children: [
      <Component.Item label="Default" value=""/>,
      <Component.Item label="Light" value="light"/>,
      <Component.Item label="Dark" value="dark"/>,
    ]
  },
};

export default meta;
