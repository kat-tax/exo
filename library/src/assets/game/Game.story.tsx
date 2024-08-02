import {Game as Component} from './Game';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Assets/Game',
  component: Component,
};

export const Game: Story = {
  args: {
    url: 'https://get.ult.dev/samples/game.rom',
  },
};

export default meta;
