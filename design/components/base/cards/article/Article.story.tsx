import {Article as Component} from 'components/base/cards/article';
import {Placeholder} from 'components/base/utilities/placeholder';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Base/Cards/Article',
  component: Component,
};

export const Article: Story = {
  args: {
    body: 'Lorem ipsum dolor sit amet.',
    footer: 'Footer',
    header: 'Header',
    hasFooter: true,
    hasTags: true,
    hasThumbnail: true,
    tags: (
      <Placeholder/>
    ),
    thumbnail: (
      <Placeholder/>
    ),
  },
};

export default meta;
