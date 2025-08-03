import {Logo as Component} from 'components/base/utilities/logo';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Base/Utilities/Logo',
  component: Component,
};

export const Placeholder: Story = {
  // ...
};

export default meta;
