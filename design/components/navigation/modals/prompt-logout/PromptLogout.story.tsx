import {PromptLogout as Component} from 'components/navigation/modals/prompt-logout';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Navigation/Modals/PromptLogout',
  component: Component,
};

export const PromptLogout: Story = {
  // ...
};

export default meta;
