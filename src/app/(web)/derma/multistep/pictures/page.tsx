'use client';

import ImageUploading from 'react-images-uploading';
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
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function Inquietudes() {
  const { pictures, setPictures } = useDermaStore(state => state);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setPictures(imageList);
  };

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
            <div>
              <Image
                alt="Dr. Basart"
                src="/images/derma/multistep/Basart.png"
                height={192}
                width={192}
                className="mx-auto w-24 mb-4"
              />
              <Text className="text-xs text-derma-primary500 mb-1">
                Paso 1. Necesidades personales
              </Text>
              <Title className="text-derma-primary font-light mb-1">
                Selecciona las inquietudes que te gustaría resolver en tu
                consulta
              </Title>
              <Text className="text-sm text-hg-black500">
                Elige tantas opciones como desees
              </Text>
            </div>

            <div className="w-full">
              <ImageUploading
                multiple
                value={pictures}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    <button
                      style={isDragging ? { color: 'red' } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Click or Drop here
                    </button>
                    &nbsp;
                    <button onClick={onImageRemoveAll}>
                      Remove all images
                    </button>
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <Image
                          src={image['data_url']}
                          alt=""
                          width={100}
                          height={100}
                        />
                        <div className="image-item__btn-wrapper">
                          <button onClick={() => onImageUpdate(index)}>
                            Update
                          </button>
                          <button onClick={() => onImageRemove(index)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>

              <Flex className="justify-between">
                <Button type="white" customStyles="bg-transparent border-none">
                  <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                  <Text className="text-derma-tertiary">Atrás</Text>
                </Button>
                <Button
                  href={ROUTES.derma.multistep.categories}
                  type={pictures !== undefined ? 'dermaDark' : 'disabled'}
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
