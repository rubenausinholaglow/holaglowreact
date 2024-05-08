'use client';

import { useEffect, useState } from 'react';
import { Diagnostic } from '@interface/derma/diagnosis';
import { dermaService } from '@services/DermaService';
import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgSpinner } from 'app/icons/Icons';
import { SvgArrow } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty, update } from 'lodash';
import { useRouter } from 'next/navigation';

import DermaStepHeader from '../../components/DermaStepHeader';
import ImageUploader from '../../multistep/pictures/ImageUploader';

export default function Seguimiento({
  diagnostic,
  userId,
}: {
  diagnostic: Diagnostic;
  userId: string;
}) {
  const router = useRouter();

  const [textAreaValue, setTextAreaValue] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const { picturesUrls, setPicturesUrls } = useDermaStore(state => state);

  function updatePictures() {
    setPicturesUrls([diagnostic.front, diagnostic.right, diagnostic.left]);
  }

  function checkIsDisabled() {
    setIsDisabled(
      isEmpty(picturesUrls[0]) ||
        isEmpty(picturesUrls[1]) ||
        isEmpty(picturesUrls[2]) ||
        imageIsLoading
    );
  }

  useEffect(() => {
    checkIsDisabled();
    setTextAreaValue(diagnostic.userComment);

    updatePictures();
  }, []);

  useEffect(() => {
    checkIsDisabled();
  }, [
    picturesUrls.length,
    picturesUrls[0],
    picturesUrls[1],
    picturesUrls[2],
    imageIsLoading,
  ]);

  async function handleDiagnosticComment() {
    if (textAreaValue.length > 0) {
      dermaService.addDiagnosticComment(diagnostic.id, textAreaValue);
    }

    router.push(ROUTES.derma.diagnostico.home);
  }

  return (
    <div className="bg-derma-secondary300 min-h-screen">
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />

      <DermaLayout hideButton hideFooter>
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader intro="" title="Sube las fotos de tu rostro">
              <Text className="mt-2 text-hg-black500 text-sm">
                Necesito un copy molón para cada check!
              </Text>
            </DermaStepHeader>

            <div className="w-full md:w-1/2">
              <Flex layout="col-left" className="w-full gap-4 mb-8">
                <ImageUploader
                  title="Foto 1"
                  subtitle="Frontal"
                  pictureIndex={0}
                  imageIsLoading={imageIsLoading}
                  setImageIsLoading={setImageIsLoading}
                  diagnosticId={diagnostic.id}
                  userId={userId}
                />

                <ImageUploader
                  title="Foto 2"
                  subtitle="Perfil derecho"
                  pictureIndex={1}
                  imageIsLoading={imageIsLoading}
                  setImageIsLoading={setImageIsLoading}
                  diagnosticId={diagnostic.id}
                  userId={userId}
                />

                <ImageUploader
                  title="Foto 3"
                  subtitle="Perfil izquierdo"
                  pictureIndex={2}
                  imageIsLoading={imageIsLoading}
                  setImageIsLoading={setImageIsLoading}
                  diagnosticId={diagnostic.id}
                  userId={userId}
                />
              </Flex>

              <div className="relative w-full">
                <Text className="absolute top-4 left-4 text-hg-black500 text-sm">
                  Cuéntanos
                </Text>
                <textarea
                  className="w-full h-56 md:h-64 p-4 text-sm rounded-2xl border border-derma-secondary500 mb-8 pt-10 resize-none"
                  placeholder="Cualquier información adicional que nos des, nos ayudará a diseñar la mejor rutina para ti."
                  onChange={event => {
                    setTextAreaValue(event.target.value);
                  }}
                  value={
                    textAreaValue && textAreaValue.length > 0
                      ? textAreaValue.replace(/^\s+/, '')
                      : ''
                  }
                />
              </div>
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
                  size="lg"
                  className={isDisabled ? 'pointer-events-none' : ''}
                  type={!isDisabled ? 'dermaDark' : 'disabled'}
                  onClick={() => {
                    setLoadingButton(true);
                    handleDiagnosticComment();
                  }}
                >
                  {!loadingButton ? 'Enviar' : <SvgSpinner className="w-20" />}
                </Button>
              </Flex>
            </div>
          </Flex>
        </Container>
      </DermaLayout>
    </div>
  );
}
