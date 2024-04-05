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
  const [images, setImages] = useState([]);
  const [imageSize, setImageSize] = useState('');
  const { pictures, setPictures } = useDermaStore(state => state);

  const onChange = (imageList: ImageListType) => {
    setImages(imageList as never[]);
  };

  const removePicture = (index: number) => {
    const updatedPictures = [...pictures];
    updatedPictures[pictureIndex] = [];

    setPictures(updatedPictures);
  };

  useEffect(() => {
    const pictureSize = ((pictures[pictureIndex]?.file?.size ?? 0) / 1024)
      ?.toFixed(2)
      .replace('.', "'");

    setImageSize(pictureSize);
  }, [pictures]);

  useEffect(() => {
    const updatedPictures = [...pictures];
    updatedPictures[pictureIndex] = images[0];

    const picture = pictures[pictureIndex];

    if (picture?.file) {
      const fileSize = picture.file.size / 1024; // size in KB
      setImageSize(`${fileSize.toFixed(2).replace('.', "'")} kb`);
    }

    setPictures(updatedPictures);
  }, [images]);

  const isDisabled = () => {
    if (pictureIndex === 1) {
      return isEmpty(pictures[0]) && isEmpty(pictures[1]);
    }

    if (pictureIndex === 2) {
      return isEmpty(pictures[1]) && isEmpty(pictures[2]);
    }

    return false;
  };

  return (
    <>
      <ImageUploading
        value={pictures[pictureIndex] as ImageListType}
        maxNumber={1}
        onChange={onChange}
        dataURLKey="data_url"
      >
        {({ onImageUpload }) => (
          <Flex
            layout="col-left"
            className={`transition-opacity gap-4 w-full ${
              isDisabled() ? 'opacity-30 pointer-events-none' : ''
            } `}
          >
            <div className="w-full relative">
              <button
                onClick={
                  isEmpty(pictures[pictureIndex]) ? onImageUpload : undefined
                }
                className="w-full"
              >
                <Flex
                  layout="row-left"
                  className="border border-derma-primary500 bg-white rounded-xl py-4 px-3 w-full"
                >
                  <div className="relative h-16 w-16 aspect-square rounded-xl overflow-hidden mr-4 shrink-0">
                    {!isEmpty(pictures[pictureIndex]) ? (
                      <Image
                        src={pictures[pictureIndex]['data_url']}
                        alt={subtitle}
                        fill
                        objectFit="cover"
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

                    {!isEmpty(pictures[pictureIndex]) ? (
                      <Text className="text-hg-black400 text-xs text-ellipsis whitespace-nowrap overflow-hidden">
                        {imageSize === "0'00" ? (
                          ''
                        ) : (
                          <>
                            <span>{`${imageSize} kb`}</span>
                            <span className="font-bold">{' · '}</span>
                          </>
                        )}
                        <span>{pictures[pictureIndex]?.file?.name}</span>
                      </Text>
                    ) : (
                      <Text className="text-hg-black500 text-xs">
                        Haz una foto o selecciona de la galería
                      </Text>
                    )}
                  </div>
                  {!isEmpty(pictures[pictureIndex]) && (
                    <SvgCross
                      className="h-4 w-4 ml-4 shrink-0 self-start"
                      onClick={() => removePicture(pictureIndex)}
                    />
                  )}
                </Flex>
              </button>
            </div>
          </Flex>
        )}
      </ImageUploading>
    </>
  );
}
