import {Form as Component} from './Form';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Services/Form',
  component: Component,
};

export const Sandbox: Story = {};

export default meta;
