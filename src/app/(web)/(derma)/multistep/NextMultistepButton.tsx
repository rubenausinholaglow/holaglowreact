import { useState } from 'react';
import { DermaQuestions } from '@interface/derma/dermaquestions';
import { dermaService } from '@services/DermaService';
import { SvgSpinner } from 'app/icons/Icons';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { useRouter } from 'next/navigation';

export const HandleNextMultistep = (nextUrl: string) => {
  const {
    id,
    setId,
    pain,
    symptoms,
    gender,
    lactating,
    age,
    skinType,
    skinSensibility,
    skinColor,
    allergy,
    allergyInfo,
    illness,
    illnessInfo,
    medication,
    medicationInfo,
    extraInfo,
    secondaryConcerns,
  } = useDermaStore(state => state);

  const router = useRouter();
  const next = () => {
    const dermaQuestions = {
      id,
      skinPain: pain,
      skinType,
      gender,
      lactating,
      ageRange: age,
      skinSensibility,
      skinColor,
      allergy,
      allergyInfo,
      illness,
      illnessInfo,
      medication,
      medicationInfo,
      skinConcerns: symptoms.map(x => ({ concern: x })),
      objectives: secondaryConcerns.map(x => ({ objective: x })),
      extraInfo,
    };

    dermaService.update(dermaQuestions as DermaQuestions).then(response => {
      if (response && !id) {
        setId(response.toString());
        router.push(nextUrl);
      }
    });

    if (id) {
      setTimeout(() => {
        router.push(nextUrl);
      }, 250);
    }
  };
  return next;
};

export default function NextMultistepButton({
  isDisabled,
  nextUrl,
  feedbackStep,
}: {
  isDisabled: boolean;
  nextUrl: string;
  feedbackStep?: number;
}) {
  const nextStep = HandleNextMultistep(nextUrl);
  const [isLoading, setIsLoading] = useState(false);

  const { setFeedbackStep } = useDermaStore(state => state);

  if (feedbackStep) {
    setFeedbackStep(feedbackStep);
  }

  return (
    <Button
      size="lg"
      onClick={async () => {
        if (!isDisabled) {
          setIsLoading(true);
          await nextStep();
        }
      }}
      type={isDisabled ? 'disabled' : 'dermaDark'}
      className={isLoading ? 'pointer-events-none' : ''}
    >
      {isLoading ? <SvgSpinner className="min-w-16" /> : 'Siguiente'}
    </Button>
  );
}
