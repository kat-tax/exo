import {InputText as Component} from 'components/base/inputs/input-text';
import {Icon} from 'react-exo/icon';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Base/Inputs/InputText',
  component: Component,
};

export const Empty: Story = {
  args: {
    caption: 'Caption',
    label: 'Label',
    placeholder: 'Text',
    state: 'Empty',
    showCaption: true,
    showLabel: true,
    icon: (
      <Icon
        name="ph:placeholder"
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
