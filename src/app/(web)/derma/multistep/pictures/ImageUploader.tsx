import { useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { SvgCross } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

export default function ImageUploader({
  title,
  subtitle,
  pictureIndex,
}: {
  title: string;
  subtitle: string;
  pictureIndex: number;
}) {
  const [images, setImages] = useState<ImageListType>([]);

  const { pictures, setPictures } = useDermaStore(state => state);

  const onChange = (imageList: ImageListType) => {
    setImages(imageList as never[]);
  };

  useEffect(() => {
    const updatedPictures = [...pictures];
    updatedPictures[pictureIndex] = images[0];

    setPictures(updatedPictures);
  }, [images]);

  return (
    <ImageUploading
      value={images}
      maxNumber={1}
      onChange={onChange}
      dataURLKey="data_url"
    >
      {({ onImageUpload, onImageRemove }) => (
        <Flex layout="col-left" className="gap-4 w-full">
          <div className="w-full relative">
            <button onClick={onImageUpload} className="w-full">
              <Flex
                layout="row-left"
                className="border border-derma-primary500 bg-white rounded-xl py-4 px-3 w-full"
              >
                <div className="relative h-16 w-16 aspect-square rounded-xl overflow-hidden mr-4 shrink-0">
                  {!isEmpty(images[0]) ? (
                    <Image
                      src={images[0]['data_url']}
                      alt={subtitle}
                      width={100}
                      height={100}
                    />
                  ) : (
                    <Image
                      src="/images/derma/multistep/faceIcon.png"
                      fill
                      objectFit="cover"
                      alt={subtitle}
                    />
                  )}
                </div>
                <div className="mr-auto overflow-hidden">
                  <Text className="text-sm">
                    <span className="font-semibold">{title}.</span> {subtitle}
                  </Text>

                  {!isEmpty(images[0]) ? (
                    <Text className="text-hg-black400 text-xs text-ellipsis whitespace-nowrap overflow-hidden">
                      <span>
                        {images[0]?.file
                          ? `${
                              (images[0].file.size / 1024)
                                ?.toFixed(2)
                                ?.replace('.', "'") ?? ''
                            } kb`
                          : ''}
                      </span>
                      <span className="font-bold">{' · '}</span>
                      <span>{images[0]?.file?.name}</span>
                    </Text>
                  ) : (
                    <Text className="text-hg-black500 text-xs">
                      Haz una foto o selecciona de la galería
                    </Text>
                  )}
                </div>
                {!isEmpty(images[0]) && (
                  <SvgCross
                    className="h-4 w-4 ml-4 shrink-0 self-start"
                    onClick={() => onImageRemove(0)}
                  />
                )}
              </Flex>
            </button>
          </div>
        </Flex>
      )}
    </ImageUploading>
  );
}
