import {Picker as Component} from './Picker';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Widgets/Picker',
  component: Component,
};

export const Picker: Story = {
  args: {
    children: [
      <Component.Item key="default" label="Default" value=""/>,
      <Component.Item key="light" label="Light" value="light"/>,
      <Component.Item key="dark" label="Dark" value="dark"/>,
    ]
  },
};

export default meta;
