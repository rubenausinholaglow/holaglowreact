'use client';

import React, { useEffect } from 'react';
import ROUTES from '@utils/routes';
import { useDermaStore } from 'app/stores/dermaStore';
import { useRouter } from 'next/navigation';

import LastStepFeedback from './components/LastStepFeedback';
import PainFeedback from './components/PainFeedback';
import RoutineFeedback from './components/RoutineFeedback';
import SecondaryConcernsFeedback from './components/SecondaryConcernsFeedback';
import SkinColorFeedback from './components/SkinColorFeedback';
import SkinTypeFeedback from './components/SkinTypeFeedback';

export default function Feedback() {
  const router = useRouter();
  const { pain, feedbackStep } = useDermaStore(state => state);

  useEffect(() => {
    if (feedbackStep === 1 && pain !== 2 && pain != 0 && pain != 3) {
      router.push(ROUTES.derma.multistep.skinType);
    }

    if (feedbackStep === 4 && pain !== 2 && pain != 0 && pain != 3) {
      router.push(ROUTES.derma.multistep.routine);
    }
  }, []);

  if (feedbackStep === 1 && pain !== 1) return <PainFeedback />;
  if (feedbackStep === 2) return <SkinTypeFeedback />;
  if (feedbackStep === 3) return <SkinColorFeedback />;
  if (feedbackStep === 4 && pain !== 1) return <SecondaryConcernsFeedback />;
  if (feedbackStep === 5) return <RoutineFeedback />;
  if (feedbackStep === 6) return <LastStepFeedback />;

  return <></>;
}
