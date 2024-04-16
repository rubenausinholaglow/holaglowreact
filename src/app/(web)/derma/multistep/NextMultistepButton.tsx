import { useState } from 'react';
import { DermaQuestions } from '@interface/derma/dermaquestions';
import { dermaService } from '@services/DermaService';
import { SvgSpinner } from 'app/icons/Icons';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { useRouter } from 'next/navigation';

export default function NextMultistepButton({
  isDisabled,
  nextUrl,
}: {
  isDisabled: boolean;
  nextUrl: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    id,
    setId,
    pain,
    symptoms,
    skinType,
    skinSensibility,
    allergy,
    allergyInfo,
    illness,
    illnessInfo,
    medication,
    medicationInfo,
    lactating,
  } = useDermaStore(state => state);

  function handleNextMultistep() {
    const formattedPain =
      symptoms.length > 0
        ? symptoms.map(symptom => ({
            skinPain: pain,
            option: symptom,
          }))
        : [];

    const dermaQuestions = {
      id,
      pain: formattedPain,
      skinType,
      skinSensibility,
      allergy,
      allergyInfo,
      illness,
      illnessInfo,
      medication,
      medicationInfo,
      lactating,
    };

    dermaService.update(dermaQuestions as DermaQuestions).then(response => {
      if (response) {
        setId(response.toString());
      }
    });

    router.push(nextUrl);
  }

  return (
    <Button
      size="lg"
      onClick={() => {
        setIsLoading(true);
        if (!isDisabled) handleNextMultistep();
      }}
      type={isDisabled ? 'disabled' : 'dermaDark'}
      className={isLoading ? 'pointer-events-none' : ''}
    >
      {isLoading ? <SvgSpinner className="min-w-16" /> : 'Siguiente'}
    </Button>
  );
}
