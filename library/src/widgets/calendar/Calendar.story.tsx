import {Calendar as Component} from 'react-exo/calendar';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Widgets/Calendar',
  component: Component,
};

export const Calendar: Story = {
  args: {

  },
};

export default meta;
