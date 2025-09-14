import {Panel as Component} from 'components/base/cards/panel';
import {Placeholder} from 'components/base/utilities/placeholder';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Base/Cards/Panel',
  component: Component,
};

export const Panel: Story = {
  args: {
    header: 'Header',
    message: 'Lorem ipsum dolor sit amet',
    content: (
      <Placeholder/>
    ),
    footer: (
      <Placeholder/>
    ),
  },
};

export default meta;
