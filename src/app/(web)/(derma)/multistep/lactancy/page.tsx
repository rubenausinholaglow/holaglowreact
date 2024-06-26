'use client';

import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgCircle } from 'app/icons/Icons';
import { SvgArrow, SvgRadioChecked } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { useRouter } from 'next/navigation';

import DermaStepBar from '../../components/DermaStepBar';
import DermaStepHeader from '../../components/DermaStepHeader';
import { LACTANCY } from '../multistepConfig';
import NextMultistepButton, {
  HandleNextMultistep,
} from '../NextMultistepButton';

export default function Lactancy() {
  const router = useRouter();
  const { lactating, setLactating, setGender } = useDermaStore(state => state);

  const nextStep = HandleNextMultistep(ROUTES.derma.multistep.age);
  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary300 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block " />
      <div className="relative">
        <DermaStepBar steps={22} step={3.5} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Embarazo"
              title="¿Actualmente estás en periodo de lactancia y/o embarazo?"
            />
            <div className="w-full md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {LACTANCY.map(item => (
                  <li
                    className={`transition-all rounded-xl px-3 py-4 flex items-center justify-between gap-4 cursor-pointer ${
                      lactating === item.value
                        ? 'bg-derma-primary500/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={item.title}
                    onClick={async () => {
                      setLactating(lactating === item.value ? 0 : item.value);
                      if (item.value === 3 && lactating !== item.value)
                        await nextStep();
                    }}
                  >
                    {item.title}
                    {lactating === item.value ? (
                      <SvgRadioChecked className="h-7 w-7 shrink-0" />
                    ) : (
                      <SvgCircle className="h-7 w-7 shrink-0" />
                    )}
                  </li>
                ))}
              </ul>

              {lactating === 3 || lactating === 0 ? (
                <Flex className="justify-between pb-12">
                  <Button
                    type="whiteDerma"
                    customStyles="bg-transparent border-none"
                    onClick={() => router.back()}
                  >
                    <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                    <Text className="text-derma-tertiary">Atrás</Text>
                  </Button>
                </Flex>
              ) : (
                <div className="bg-white p-4 rounded-2xl text-hg-black500 text-sm">
                  <Text className="mb-1 font-semibold">
                    Gracias por tu interés
                  </Text>

                  <Text className="mb-2">
                    Lamentablemente, no podemos ayudarte ahora :(
                  </Text>
                  <Text className="mb-2">
                    Si estás embarazada o en periodo de lactancia, no podemos
                    recetarte algunos de los principios activos clave para la
                    eficacia de nuestras rutinas.
                  </Text>
                  <Text className="mb-6">
                    ¡Estaremos encantados de atenderte más adelante si sigues
                    interesada!
                  </Text>
                  <Button
                    type="whiteDerma"
                    customStyles="bg-transparent border-none"
                    onClick={() => {
                      setGender(undefined);
                      router.back();
                    }}
                  >
                    <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                    <Text className="text-derma-tertiary">Atrás</Text>
                  </Button>
                </div>
              )}
            </div>
          </Flex>
        </Container>
      </div>
    </DermaLayout>
  );
}
