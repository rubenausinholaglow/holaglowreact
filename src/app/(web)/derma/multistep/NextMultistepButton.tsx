import { useEffect } from 'react';
import { DermaQuestions, painObject } from '@interface/derma/dermaquestions';
import { dermaService } from '@services/DermaService';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { useRouter } from 'next/navigation';

export const HandleNextMultistep = (nextUrl: string) => {
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

  const router = useRouter();
  const next = () => {
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
  };
  return next;
};
export default function NextMultistepButton({
  isDisabled,
  nextUrl,
}: {
  isDisabled: boolean;
  nextUrl: string;
}) {
  const nextStep = HandleNextMultistep(nextUrl);
  return (
    <Button
      size="lg"
      onClick={async () => {
        if (!isDisabled) {
          await nextStep();
        }
      }}
      type={isDisabled ? 'disabled' : 'dermaDark'}
    >
      Siguiente
    </Button>
  );
}
