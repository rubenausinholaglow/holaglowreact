'use client';

import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import {
  SvgArrow,
  SvgCheckSquare,
  SvgCheckSquareActive,
} from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

import DermaStepHeader from '../../components/DermaStepHeader';
import { SKIN_SENSITIVITIES } from '../multistepConfig';

export default function Inquietudes() {
  const { skinSensitivity, setSkinSensitivity } = useDermaStore(state => state);

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <DermaLayout hideButton hideFooter>
        <Container className="px-0 md:px-4 md:pt-12">
          <div className="md:w-1/2 md:pr-8">
            <ul className="flex bg-derma-primary500/20 h-[4px] w-full rounded-full mb-6">
              <li className="h-[4px] rounded-full bg-derma-primary transition-all w-[25%]"></li>
            </ul>
          </div>
        </Container>
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16"
          >
            <DermaStepHeader
              intro="Paso 4. "
              title="¿Qué tan sensible es tu piel?"
            >
              <Text className="text-hg-black500 mt-2">
                Con esto nos referimos a enrojecimiento/sarpullido, picazón
                frecuente, sensación de tensión o ardor
              </Text>
              <Text className="text-xs mt-2">
                1 = Poco sensible / 5 = Muy sensible
              </Text>
            </DermaStepHeader>

            <div className="w-full">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {SKIN_SENSITIVITIES.map(item => (
                  <li
                    className={`transition-all rounded-xl p-3 flex justify-between ${
                      skinSensitivity === item
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={item}
                    onClick={() =>
                      setSkinSensitivity(
                        skinSensitivity === item ? undefined : item
                      )
                    }
                  >
                    {item}
                    {skinSensitivity === item ? (
                      <SvgCheckSquareActive className="h-6 w-6" />
                    ) : (
                      <SvgCheckSquare className="h-6 w-6" />
                    )}
                  </li>
                ))}
              </ul>
              <Flex className="justify-between">
                <Button type="white" customStyles="bg-transparent border-none">
                  <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                  <Text className="text-derma-tertiary">Atrás</Text>
                </Button>
                <Button
                  href={ROUTES.derma.multistep.pictures}
                  type={
                    skinSensitivity !== undefined ? 'dermaDark' : 'disabled'
                  }
                >
                  Siguiente
                </Button>
              </Flex>
            </div>
          </Flex>
        </Container>
      </DermaLayout>
    </div>
  );
}
