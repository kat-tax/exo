import {Alert as Component} from 'components/base/indicators/alert';
import {Icon} from 'react-exo/icon';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Base/Indicators/Alert',
  component: Component,
};

export const Default: Story = {
  args: {
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    header: 'Header',
    mode: 'Default',
    hasIcon: true,
    icon: (
      <Icon
        name="ph:placeholder"
      />
    ),
  },
};

export const Destructive: Story = {
  args: {
    ...Default.args,
    mode: 'Destructive',
  }
};

export default meta;
