import {RadioGroup} from './RadioGroup';
import {RadioButton} from './RadioButton';
import type {StoryObj, Meta} from '@storybook/react';

type Story = StoryObj<typeof RadioGroup>;

const meta: Meta<typeof RadioGroup> = {
  title: 'Widgets/Radio',
  component: RadioGroup,
};

export const Radio: Story = {
  args: {
    children: [
      <RadioButton key="1" value="1" label="Option 1"/>,
      <RadioButton key="2" value="2" label="Option 2"/>,
      <RadioButton key="3" value="3" label="Option 3"/>,
    ],
  },
};

export default meta;
