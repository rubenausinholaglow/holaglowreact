import { useEffect } from 'react';
import { DermaQuestions, painObject } from '@interface/derma/dermaquestions';
import { dermaService } from '@services/DermaService';
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
            optionsSkinPain: symptom,
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
      if (id === undefined) {
        setId(response.toString());
      }
    });

    router.push(nextUrl);
  }

  return (
    <Button
      onClick={() => {
        if (!isDisabled) handleNextMultistep();
      }}
      type={isDisabled ? 'disabled' : 'dermaDark'}
    >
      Siguiente
    </Button>
  );
}
