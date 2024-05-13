'use client';

import React from 'react';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { useDermaStore } from 'app/stores/dermaStore';
import { Container, Flex } from 'designSystem/Layouts/Layouts';

import PainFeedback from './components/PainFeedback';
import SkinColorFeedback from './components/SkinColorFeedback';
import SkinTypeFeedback from './components/SkinTypeFeedback';

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
          </Flex>
        </Container>
      </DermaLayout>
    </div>
  );
}
