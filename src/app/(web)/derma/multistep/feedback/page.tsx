'use client';

import React from 'react';
import { isMobile } from 'react-device-detect';
import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow, SvgStethoscope, SvgVerify } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import router from 'next/router';

import PainFeedback from './components/PainFeedback';
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
          </Flex>
        </Container>
      </DermaLayout>
    </div>
  );
}
