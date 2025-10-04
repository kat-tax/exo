import {Badge as Component} from 'components/base/indicators/badge';
import {Icon} from 'react-exo/icon';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Base/Indicators/Badge',
  component: Component,
};

export const Default: Story = {
  args: {
    label: 'Label',
    mode: 'Default',
    showIcon: true,
    showLabel: true,
    icon: (
      <Icon name="ph:placeholder"/>
    ),
  },
};

export const Info: Story = {
  args: {
    ...Default.args,
    mode: 'Info',
  }
};

export const Success: Story = {
  args: {
    ...Default.args,
    mode: 'Success',
  }
};

export const Warning: Story = {
  args: {
    ...Default.args,
    mode: 'Warning',
  }
};

export const Error: Story = {
  args: {
    ...Default.args,
    mode: 'Error',
  }
};

export default meta;
