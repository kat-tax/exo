import {InputPassword as Component} from 'components/base/inputs/input-password';
import {Icon} from 'react-exo/icon';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Base/Inputs/InputPassword',
  component: Component,
};

export const Empty: Story = {
  args: {
    caption: 'Caption',
    label: 'Label',
    placeholder: 'Password',
    state: 'Empty',
    showCaption: true,
    showLabel: true,
    icon: (
      <Icon
        name="ph:lock"
      />
    ),
  },
};

export const Hover: Story = {
  args: {
    ...Empty.args,
    state: 'Hover',
  }
};

export const Focused: Story = {
  args: {
    ...Empty.args,
    state: 'Focused',
  }
};

export const FocusedFilled: Story = {
  args: {
    ...Empty.args,
    state: 'FocusedFilled',
  }
};

export const Disabled: Story = {
  args: {
    ...Empty.args,
    state: 'Disabled',
  }
};

export default meta;
