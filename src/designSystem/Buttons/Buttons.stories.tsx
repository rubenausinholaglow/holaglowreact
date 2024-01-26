import type { Meta, StoryObj } from '@storybook/react';
import { SvgArrowSmallLeft } from 'app/icons/Icons';
import { Flex } from 'designSystem/Layouts/Layouts';

import { Button } from './Buttons';

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
    <Flex layout="row-left">
      <SvgArrowSmallLeft height={20} width={20} />
      <span className="ml-2">Atrás</span>
    </Flex>
  );
};

export const ButtonWithIcon: Story = {
  args: {
    type: 'primary',
    children: buttonWithIconContent(),
  },
};
