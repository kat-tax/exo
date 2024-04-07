import {Motion} from './index';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Motion.View>;

const meta: Meta<typeof Motion.View> = {
  title: 'Interactions/Motion',
  component: Motion.View,
  args: {
    initial: {y: -50},
    animate: {x: 0, y: 0},
    transition: {type: 'spring'},
    whileHover: {scale: 1.2},
    whileTap: {y: 20},
  },
};

export const Sandbox: Story = {};

export default meta;
