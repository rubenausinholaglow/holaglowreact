'use client';

import { useEffect, useState } from 'react';
import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

import DermaStepBar from '../../components/DermaStepBar';
import DermaStepHeader from '../../components/DermaStepHeader';
import ImageUploader from './ImageUploader';

export default function Pictures() {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(true);
  const { picturesUrls } = useDermaStore(state => state);

  function checkIsDisabled() {
    setIsDisabled(
      isEmpty(picturesUrls[0]) ||
        isEmpty(picturesUrls[1]) ||
        isEmpty(picturesUrls[2])
    );
  }

  useEffect(() => {
    checkIsDisabled();
  }, []);

  useEffect(() => {
    checkIsDisabled();
  }, [picturesUrls.length]);

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />

      <DermaLayout hideButton hideFooter>
        <DermaStepBar steps={11} step={9} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Paso 9. Fotos"
              title="Sube las fotos de tu rostro"
            >
              <Text className="mt-2 text-hg-black500 text-sm">
                Necesitamos 3 fotos de tu rostro para que el médico pueda hacer
                un diagnóstico correcto y diseñar tu rutina personalizada.
              </Text>
            </DermaStepHeader>

            <div className="w-full md:w-1/2">
              <Flex layout="col-left" className="w-full gap-4 mb-8">
                <ImageUploader
                  title="Foto 1"
                  subtitle="Frontal"
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
                <Button
                  type="white"
                  customStyles="bg-transparent border-none"
                  onClick={() => router.back()}
                >
                  <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                  <Text className="text-derma-tertiary">Atrás</Text>
                </Button>
                <Button
                  className={isDisabled ? 'pointer-events-none' : ''}
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
