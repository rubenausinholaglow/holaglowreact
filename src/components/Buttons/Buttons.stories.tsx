import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Buttons';
import { Flex } from 'components/Layouts/Layouts';
import { SvgArrowSmallLeft } from 'icons/Icons';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const ButtonDefault: Story = {
  args: {
    type: 'primary',
    children: 'Button',
  },
};

const buttonWithIconContent = () => {
  return (
    <Flex layout='row-left'>
      <SvgArrowSmallLeft height={20} width={20} />
      <span className='ml-2'>Atrás</span>
    </Flex>
  );
};

export const ButtonWithIcon: Story = {
  args: {
    type: 'primary',
    children: buttonWithIconContent(),
  },
};

/* 
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

export const LargeButton: Story = {
  args: {
    type: 'primary',
    size: 'lg',
    children: 'Button',
  },
};
 */
