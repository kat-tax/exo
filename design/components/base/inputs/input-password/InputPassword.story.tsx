import {InputPassword as Component} from 'components/base/inputs/input-password';
import {Icon} from 'react-exo/icon';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Base/Inputs/InputPassword',
  component: Component,
};

export const Default: Story = {
  args: {
    caption: 'Caption',
    label: 'Label',
    placeholder: 'Password',
    state: 'Default',
    showCaption: true,
    showLabel: true,
    icon: (
      <Icon name="ph:lock"/>
    ),
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    state: 'Empty',
  }
};

export const Hover: Story = {
  args: {
    ...Default.args,
    state: 'Hover',
  }
};

export const Failed: Story = {
  args: {
    ...Default.args,
    state: 'Failed',
  }
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    state: 'Disabled',
  }
};

export default meta;
