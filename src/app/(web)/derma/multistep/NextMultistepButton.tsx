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
    const formattedPain = [
      {
        skinPain: pain,
        option: '',
      },
    ];

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

    setTimeout(() => {
      router.push(nextUrl);
    }, 250);
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
  const [isLoading, setIsLoading] = useState(false);

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
