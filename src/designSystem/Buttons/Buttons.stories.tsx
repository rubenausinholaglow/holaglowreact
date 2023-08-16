import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgArrowSmallLeft } from 'icons/Icons';

import { Button } from './Buttons';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const ButtonDefault: Story = {
  args: {
    style: 'primary',
    children: 'Button',
  },
};

const buttonWithIconContent = () => {
  return (
    <Flex layout="row-left">
      <SvgArrowSmallLeft height={20} width={20} />
      <span className="ml-2">Atrás</span>
    </Flex>
  );
};

export const ButtonWithIcon: Story = {
  args: {
    style: 'primary',
    children: buttonWithIconContent(),
  },
};
