import type { Meta, StoryObj } from '@storybook/react';

import { Flex } from 'components/Layouts';

import { Button } from './Buttons';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const DefaultButtons: Story = {
  render: () => (
    <Flex layout='row-left' className='gap-4'>
      <Button type='primary'>Primary</Button>
      <Button type='secondary'>Secondary</Button>
      <Button type='inverted'>Inverted</Button>
    </Flex>
  ),
};
