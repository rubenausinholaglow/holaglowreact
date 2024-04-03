'use client';

import { useEffect, useState } from 'react';
import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

import DermaStepBar from '../../components/DermaStepBar';
import DermaStepHeader from '../../components/DermaStepHeader';
import ImageUploader from './ImageUploader';

export default function Pictures() {
  const [isDisabled, setIsDisabled] = useState(true);
  const { pictures } = useDermaStore(state => state);

  useEffect(() => {
    setIsDisabled(
      !pictures.every(picture => picture !== null && picture !== undefined)
    );
  }, [pictures]);

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <DermaLayout hideButton hideFooter>
        <DermaStepBar steps={7} step={7} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Paso 9. Hazte unas fotos"
              title="Sube las fotos de tu rostro"
            >
              <Text className="mt-2 text-hg-black500 text-sm">
                Necesitamos 3 fotos de tu rostro en detalle frontal y perfil de
                ambos lados para identificar tus necesidades y orientar tu
                consulta médica. Los datos se procesan de forma segura
              </Text>
            </DermaStepHeader>

            <div className="w-full md:w-1/2">
              <Flex layout="col-left" className="w-full gap-4 mb-8">
                <ImageUploader
                  title="Foto 1"
                  subtitle="Rostro frontal"
                  pictureIndex={0}
                />
                <ImageUploader
                  title="Foto 2"
                  subtitle="Perfil derecho"
                  pictureIndex={1}
                />
                <ImageUploader
                  title="Foto 3"
                  subtitle="Perfil izquierdo"
                  pictureIndex={2}
                />
              </Flex>

              <Flex className="justify-between">
                <Button type="white" customStyles="bg-transparent border-none">
                  <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                  <Text className="text-derma-tertiary">Atrás</Text>
                </Button>
                <Button
                  href={ROUTES.derma.multistep.extraInfo}
                  type={!isDisabled ? 'dermaDark' : 'disabled'}
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
