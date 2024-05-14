'use client';

import React from 'react';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import FullWidthCarousel from 'app/(web)/components/product/fullWidthCarousel';
import { useDermaStore } from 'app/stores/dermaStore';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import { DERMA_INGREDIENTS } from '../multistepConfig';
import PainFeedback from './components/PainFeedback';
import SkinColorFeedback from './components/SkinColorFeedback';
import SkinTypeFeedback from './components/SkinTypeFeedback';
import SomethingElseFeedback from './components/SomethingElseFeedback';

export default function Feedback() {
  const { feedbackStep } = useDermaStore(state => state);

  return (
    <div className="bg-derma-secondary500 min-h-screen">
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />

      <DermaLayout hideButton hideFooter>
        <Container>
          <Flex
            layout="col-left"
            className="md:flex-row w-full md:gap-12 xl:gap-16"
          >
            {feedbackStep === 1 && <PainFeedback />}
            {feedbackStep === 2 && <SkinTypeFeedback />}
            {feedbackStep === 3 && <SkinColorFeedback />}
            {feedbackStep === 4 && <SomethingElseFeedback />}
          </Flex>
        </Container>

        <FullWidthCarousel className="pb-8" isDerma>
          {DERMA_INGREDIENTS.map(ingredient => (
            <Flex
              layout="col-left"
              className="w-full pr-6 gap-2"
              key={ingredient.name}
            >
              <Flex className="relative aspect-[3/2] w-full rounded-2xl bg-derma-secondary500 mb-2 py-4 overflow-hidden">
                <Image
                  alt={ingredient.name}
                  src={ingredient.imgSrc}
                  fill
                  className="scale-110 object-contain"
                />
              </Flex>

              <Text className="text-lg font-semibold">{ingredient.name}</Text>
              <Text className="">
                Concentración{' '}
                <span className="font-semibold">
                  {ingredient.concentration}
                </span>
              </Text>

              <ul className="flex gap-2">
                {ingredient.tags.map(tag => (
                  <li
                    key={tag}
                    className="px-2 py-1 rounded-full bg-derma-primary100 text-derma-primary text-xs"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <Text className="text-sm text-hg-black500">
                {ingredient.description}
              </Text>
            </Flex>
          ))}
        </FullWidthCarousel>
      </DermaLayout>
    </div>
  );
}
