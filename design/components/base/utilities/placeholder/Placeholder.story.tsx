import {Placeholder as Component} from 'components/base/utilities/placeholder';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Base/Utilities/Placeholder',
  component: Component,
};

export const Placeholder: Story = {
  // ...
};

export default meta;
