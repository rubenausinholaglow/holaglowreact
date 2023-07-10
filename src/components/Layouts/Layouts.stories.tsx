import type { Meta, StoryObj } from '@storybook/react';

import { Flex } from 'components/Layouts/Layouts';

const meta: Meta<typeof Flex> = {
  component: Flex,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Flex>;

const layoutChildren = () => {
  return (
    <>
      <div className='rounded-lg p-8 bg-[#e2e2e2]'></div>
      <div className='rounded-lg p-12 bg-[#e2e2e2]'></div>
      <div className='rounded-lg p-6 bg-[#e2e2e2]'></div>
      <div className='rounded-lg p-16 bg-[#e2e2e2]'></div>
    </>
  );
};

export const FlexComponent: Story = {
  args: {
    layout: 'row-left',
    className: 'gap-2',
    children: layoutChildren(),
  },
};
