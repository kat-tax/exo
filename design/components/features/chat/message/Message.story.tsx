import {Message as Component} from 'components/features/chat/message';
import {Placeholder} from 'components/base/utilities/placeholder';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Features/Chat/Message',
  component: Component,
};

export const RemoteDefault: Story = {
  args: {
    emote: '😺',
    message: 'Lorem ipsgum dolor...',
    timestamp: '9:56 PM',
    mode: 'Default',
    origin: 'Remote',
    avatar: (
      <Placeholder/>
    ),
    embed: (
      <Placeholder/>
    ),
  },
};

export const LocalDefault: Story = {
  args: {
    ...RemoteDefault.args,
    origin: 'Local',
    mode: 'Default',
  }
};

export const RemoteStart: Story = {
  args: {
    ...RemoteDefault.args,
    origin: 'Remote',
    mode: 'Start',
  }
};

export const LocalStart: Story = {
  args: {
    ...RemoteDefault.args,
    origin: 'Local',
    mode: 'Start',
  }
};

export const RemoteMiddle: Story = {
  args: {
    ...RemoteDefault.args,
    origin: 'Remote',
    mode: 'Middle',
  }
};

export const LocalMiddle: Story = {
  args: {
    ...RemoteDefault.args,
    origin: 'Local',
    mode: 'Middle',
  }
};

export const RemoteEnd: Story = {
  args: {
    ...RemoteDefault.args,
    origin: 'Remote',
    mode: 'End',
  }
};

export const LocalEnd: Story = {
  args: {
    ...RemoteDefault.args,
    origin: 'Local',
    mode: 'End',
  }
};

export const RemoteEmbedded: Story = {
  args: {
    ...RemoteDefault.args,
    origin: 'Remote',
    mode: 'Embedded',
  }
};

export const LocalEmbedded: Story = {
  args: {
    ...RemoteDefault.args,
    origin: 'Local',
    mode: 'Embedded',
  }
};

export default meta;
