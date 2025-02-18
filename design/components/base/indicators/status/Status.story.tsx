import {Status as Component} from 'components/base/indicators/status';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Base/Indicators/Status',
  component: Component,
};

export const Default: Story = {
  args: {
    value: '!',
    mode: 'Default',
    hasValue: true,
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
