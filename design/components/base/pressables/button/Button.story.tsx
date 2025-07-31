import {Button as Component} from 'components/base/pressables/button';
import {Icon} from 'react-exo/icon';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Base/Pressables/Button',
  component: Component,
};

export const PrimaryDefault: Story = {
  args: {
    label: 'Label',
    mode: 'Primary',
    state: 'Default',
    showIcon: true,
    icon: (
      <Icon
        name="ph:placeholder"
      />
    ),
  },
};

export const PrimaryHovered: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Primary',
    state: 'Hovered',
  }
};

export const PrimaryPressed: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Primary',
    state: 'Pressed',
  }
};

export const PrimaryFocused: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Primary',
    state: 'Focused',
  }
};

export const PrimaryDisabled: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Primary',
    state: 'Disabled',
  }
};

export const SecondaryDefault: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Secondary',
    state: 'Default',
  }
};

export const SecondaryHovered: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Secondary',
    state: 'Hovered',
  }
};

export const SecondaryPressed: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Secondary',
    state: 'Pressed',
  }
};

export const SecondaryFocused: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Secondary',
    state: 'Focused',
  }
};

export const SecondaryDisabled: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Secondary',
    state: 'Disabled',
  }
};

export const DestructiveDefault: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Destructive',
    state: 'Default',
  }
};

export const DestructiveHovered: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Destructive',
    state: 'Hovered',
  }
};

export const DestructivePressed: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Destructive',
    state: 'Pressed',
  }
};

export const DestructiveFocused: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Destructive',
    state: 'Focused',
  }
};

export const DestructiveDisabled: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Destructive',
    state: 'Disabled',
  }
};

export const TextDefault: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Text',
    state: 'Default',
  }
};

export const TextHovered: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Text',
    state: 'Hovered',
  }
};

export const TextPressed: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Text',
    state: 'Pressed',
  }
};

export const TextFocused: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Text',
    state: 'Focused',
  }
};

export const TextDisabled: Story = {
  args: {
    ...PrimaryDefault.args,
    mode: 'Text',
    state: 'Disabled',
  }
};

export default meta;
