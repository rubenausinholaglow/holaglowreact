import type { Meta, StoryObj } from '@storybook/react';

import { Flex } from 'components/Layouts';

import { Button } from './Buttons';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    type: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    children: 'Button',
  },
};

export const Tertiary: Story = {
  args: {
    type: 'tertiary',
    children: 'Button',
  },
};
