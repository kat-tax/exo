import {MenuItem as Component} from 'components/base/lists/menu-item';
import {Icon} from 'react-exo/icon';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Base/Lists/MenuItem',
  component: Component,
};

export const Default: Story = {
  args: {
    body: 'Lorem ipsum dolor sit amet',
    mode: 'Default',
    hasIcon: true,
    icon: (
      <Icon name="ph:placeholder"/>
    ),
  },
};

export const Active: Story = {
  args: {
    ...Default.args,
    mode: 'Active',
  }
};

export default meta;
