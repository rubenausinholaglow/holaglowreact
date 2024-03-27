'use client';

import ImageUploading from 'react-images-uploading';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import DermaStepBar from '../../components/DermaStepBar';
import DermaStepHeader from '../../components/DermaStepHeader';

export default function Inquietudes() {
  const { pictures, setPictures } = useDermaStore(state => state);

  const onChange = (/* imageList, addUpdateIndex */) => {
    // data for submit
    //setPictures(imageList);
  };

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <DermaLayout hideButton hideFooter>
        <DermaStepBar steps={7} step={7} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16"
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

            <div className="w-full">
              <ImageUploading
                value={pictures}
                onChange={onChange}
                maxNumber={1}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <button
                    className="w-full mb-4"
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    <Flex
                      layout="row-left"
                      className="border border-derma-primary500 bg-white rounded-xl py-4 px-3 w-full"
                    >
                      <div className="relative h-16 w-16 aspect-square rounded-xl overflow-hidden mr-4">
                        {imageList.length > 0 ? (
                          imageList.map((image, index) => (
                            <Image
                              key={index}
                              src={image['data_url']}
                              alt=""
                              width={100}
                              height={100}
                            />
                          ))
                        ) : (
                          <Image
                            src="/images/derma/multistep/faceIcon.png"
                            fill
                            objectFit="cover"
                            alt="rostro frontal"
                          />
                        )}
                      </div>
                      <div>
                        <Text>
                          <span className="font-semibold text-sm">Foto 1.</span>{' '}
                          Rostro frontal
                        </Text>
                        <Text className="text-hg-black500 text-xs">
                          Haz una foto o selecciona de la galería
                        </Text>
                      </div>

                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <div className="image-item__btn-wrapper">
                            <button onClick={() => onImageRemove(index)}>
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </Flex>
                    {/* <button onClick={onImageRemoveAll}>
                    Remove all images
                  </button> */}
                  </button>
                )}
              </ImageUploading>

              <ImageUploading
                value={pictures}
                onChange={onChange}
                maxNumber={1}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <button
                    className="w-full mb-4"
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    <Flex
                      layout="row-left"
                      className="border border-derma-primary500 bg-white rounded-xl py-4 px-3 w-full"
                    >
                      <div className="relative h-16 w-16 aspect-square rounded-xl overflow-hidden mr-4">
                        {imageList.length > 0 ? (
                          imageList.map((image, index) => (
                            <Image
                              key={index}
                              src={image['data_url']}
                              alt=""
                              width={100}
                              height={100}
                            />
                          ))
                        ) : (
                          <Image
                            src="/images/derma/multistep/faceIcon.png"
                            fill
                            objectFit="cover"
                            alt="rostro frontal"
                          />
                        )}
                      </div>
                      <div>
                        <Text>
                          <span className="font-semibold text-sm">Foto 2.</span>{' '}
                          Perfil derecho
                        </Text>
                        <Text className="text-hg-black500 text-xs">
                          Haz una foto o selecciona de la galería
                        </Text>
                      </div>

                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <div className="image-item__btn-wrapper">
                            <button onClick={() => onImageRemove(index)}>
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </Flex>
                    {/* <button onClick={onImageRemoveAll}>
                    Remove all images
                  </button> */}
                  </button>
                )}
              </ImageUploading>

              <ImageUploading
                value={pictures}
                onChange={onChange}
                maxNumber={1}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <button
                    className="w-full mb-4"
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    <Flex
                      layout="row-left"
                      className="border border-derma-primary500 bg-white rounded-xl py-4 px-3 w-full"
                    >
                      <div className="relative h-16 w-16 aspect-square rounded-xl overflow-hidden mr-4">
                        {imageList.length > 0 ? (
                          imageList.map((image, index) => (
                            <Image
                              key={index}
                              src={image['data_url']}
                              alt=""
                              width={100}
                              height={100}
                            />
                          ))
                        ) : (
                          <Image
                            src="/images/derma/multistep/faceIcon.png"
                            fill
                            objectFit="cover"
                            alt="rostro frontal"
                          />
                        )}
                      </div>
                      <div>
                        <Text>
                          <span className="font-semibold text-sm">Foto 3.</span>{' '}
                          Perfil izquierdo
                        </Text>
                        <Text className="text-hg-black500 text-xs">
                          Haz una foto o selecciona de la galería
                        </Text>
                      </div>

                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <div className="image-item__btn-wrapper">
                            <button onClick={() => onImageRemove(index)}>
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </Flex>
                    {/* <button onClick={onImageRemoveAll}>
                    Remove all images
                  </button> */}
                  </button>
                )}
              </ImageUploading>

              <Flex className="justify-between">
                <Button type="white" customStyles="bg-transparent border-none">
                  <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                  <Text className="text-derma-tertiary">Atrás</Text>
                </Button>
                <Button
                  href="#"
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
