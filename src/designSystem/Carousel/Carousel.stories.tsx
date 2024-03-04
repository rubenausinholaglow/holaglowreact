import type { Meta, StoryObj } from '@storybook/react';

import Carousel from './Carousel';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const CarouselDefault: Story = {
  render: () => (
    <Carousel totalSlides={4} currentSlide={0} class="w-[50%] m-auto">
      <div className="rounded-lg p-16 bg-[#e2e2e2] text-center">1</div>
      <div className="rounded-lg p-16 bg-[#e2e2e2] text-center">2</div>
      <div className="rounded-lg p-16 bg-[#e2e2e2] text-center">3</div>
      <div className="rounded-lg p-16 bg-[#e2e2e2] text-center">4</div>
    </Carousel>
  ),
};
