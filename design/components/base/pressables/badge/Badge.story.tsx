import {Badge as Component} from 'components/base/pressables/badge';
import {Status} from 'components/base/indicators/status';
import {Icon} from 'react-exo/icon';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Base/Pressables/Badge',
  component: Component,
};

export const DefaultDefault: Story = {
  args: {
    label: 'Label',
    mode: 'Default',
    state: 'Default',
    showIcon: true,
    showIndicator: false,
    showLabel: true,
    icon: (
      <Icon
        name="ph:placeholder"
      />
    ),
    indicator: (
      <Status
        value="1"
        mode="Default"
        hasValue
      />
    ),
  },
};

export const DefaultHovered: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Default',
    state: 'Hovered',
  }
};

export const DefaultPressed: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Default',
    state: 'Pressed',
  }
};

export const DefaultFocused: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Default',
    state: 'Focused',
  }
};

export const DefaultDisabled: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Default',
    state: 'Disabled',
  }
};

export const InfoDefault: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Info',
    state: 'Default',
  }
};

export const InfoHovered: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Info',
    state: 'Hovered',
  }
};

export const InfoPressed: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Info',
    state: 'Pressed',
  }
};

export const InfoFocused: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Info',
    state: 'Focused',
  }
};

export const InfoDisabled: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Info',
    state: 'Disabled',
  }
};

export const SuccessDefault: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Success',
    state: 'Default',
  }
};

export const SuccessHovered: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Success',
    state: 'Hovered',
  }
};

export const SuccessPressed: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Success',
    state: 'Pressed',
  }
};

export const SuccessFocused: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Success',
    state: 'Focused',
  }
};

export const SuccessDisabled: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Success',
    state: 'Disabled',
  }
};

export const WarningDefault: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Warning',
    state: 'Default',
  }
};

export const WarningHovered: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Warning',
    state: 'Hovered',
  }
};

export const WarningPressed: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Warning',
    state: 'Pressed',
  }
};

export const WarningFocused: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Warning',
    state: 'Focused',
  }
};

export const WarningDisabled: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Warning',
    state: 'Disabled',
  }
};

export const ErrorDefault: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Error',
    state: 'Default',
  }
};

export const ErrorHovered: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Error',
    state: 'Hovered',
  }
};

export const ErrorPressed: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Error',
    state: 'Pressed',
  }
};

export const ErrorFocused: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Error',
    state: 'Focused',
  }
};

export const ErrorDisabled: Story = {
  args: {
    ...DefaultDefault.args,
    mode: 'Error',
    state: 'Disabled',
  }
};

export default meta;
