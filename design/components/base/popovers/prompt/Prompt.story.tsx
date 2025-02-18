import {Prompt as Component} from 'components/base/popovers/prompt';
import {Button} from 'components/base/pressables/button';
import {Icon} from 'react-exo/icon';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Base/Popovers/Prompt',
  component: Component,
};

export const Prompt: Story = {
  args: {
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    title: 'Header',
    showClose: true,
    confirmButton: (
      <Button
        label="Confirm"
        mode="Primary"
        state="Default"
        showIcon
        icon={
          <Icon
            name="ph:placeholder"
          />
        }
      />
    ),
  },
};

export default meta;
