'use client';
import { Dispatch, SetStateAction, use, useEffect, useState } from 'react';
import ImageUploading, {
  ImageListType,
  ImageType,
} from 'react-images-uploading';
import Bugsnag from '@bugsnag/js';
import { dermaService } from '@services/DermaService';
import CheckHydration from '@utils/CheckHydration';
import FullScreenLoading from 'app/(web)/components/common/FullScreenLayout';
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
  imageIsLoading,
  setImageIsLoading,
  diagnosticId,
  userId,
}: {
  title: string;
  subtitle: string;
  pictureIndex: number;
  imageIsLoading: boolean;
  setImageIsLoading: Dispatch<SetStateAction<boolean>>;
  diagnosticId?: string;
  userId?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageListType>([]);
  const { picturesUrls, setPicturesUrls, id } = useDermaStore(state => state);

  function uploaderDefaultImage({
    index,
    isDisabled,
  }: {
    index: number;
    isDisabled: () => boolean;
  }) {
    if (pictureIndex === 1) {
      if (isDisabled())
        return '/images/derma/multistep/rightDisabledFaceIcon.png';

      return '/images/derma/multistep/rightFaceIcon.png';
    }

    if (pictureIndex === 2) {
      if (isDisabled())
        return '/images/derma/multistep/leftDisabledFaceIcon.png';

      return '/images/derma/multistep/leftFaceIcon.png';
    }

    return '/images/derma/multistep/faceIcon.png';
  }

  const onChange = (imageList: ImageListType) => {
    images.push(imageList);
    try {
      setIsLoading(true);
      setImageIsLoading(true);
      const picture = imageList[0];

      if (imageList[0]) {
        setImages(images);
        uploadImage(imageList);
      }
    } catch (ex) {
      if (ex instanceof Error) {
        alert(ex.message);
        Bugsnag.notify(ex);
      }
    }

    async function uploadImage(
      updatedPictures: ImageType[] | { file: Blob }[]
    ) {
      let position = 'front';
      if (pictureIndex == 1) position = 'right';
      if (pictureIndex == 2) position = 'left';
      const url = await dermaService.uploadImage(
        userId ? userId : undefined,
        updatedPictures[0].file!,
        position,
        'id',
        diagnosticId ? diagnosticId : ''
      );

      if (picturesUrls.length > pictureIndex) picturesUrls[pictureIndex] = url;
      else picturesUrls.push(url);

      setPicturesUrls(picturesUrls);
      //setIsLoading(false);
    }
  };

  const removePicture = (index: number) => {
    const updatedPictures = [...images];
    updatedPictures[pictureIndex] = [];

    setImages(updatedPictures);
    picturesUrls[index] = '';
    setPicturesUrls(picturesUrls);
  };

  const isDisabled = () => {
    if (pictureIndex === 1) {
      return (
        isEmpty(picturesUrls[0]) ||
        (imageIsLoading && !isLoading && isEmpty(picturesUrls[1]))
      );
    }

    if (pictureIndex === 2) {
      return (
        isEmpty(picturesUrls[0]) ||
        isEmpty(picturesUrls[1]) ||
        (imageIsLoading && !isLoading)
      );
    }

    return false;
  };

  return (
    <CheckHydration>
      <ImageUploading
        value={images[pictureIndex] as ImageListType}
        maxNumber={1}
        onChange={onChange}
        dataURLKey="data_url"
      >
        {({ onImageUpload }) => (
          <Flex
            layout="col-left"
            className={`gap-4 w-full ${
              isDisabled() ? 'pointer-events-none' : ''
            } `}
          >
            <div className="w-full relative">
              <button
                onClick={
                  isEmpty(images[pictureIndex]) &&
                  isEmpty(picturesUrls[pictureIndex])
                    ? onImageUpload
                    : undefined
                }
                className="w-full"
              >
                <Flex
                  layout="row-left"
                  className={`border border-derma-primary500 bg-white rounded-xl py-4 px-3 w-full relative min-h-[98px]
                  ${
                    !isEmpty(picturesUrls[pictureIndex]) && !isLoading
                      ? 'bg-derma-primary300 bg-opacity-20'
                      : ''
                  }`}
                >
                  <div className="relative h-16 md:h-24 w-16 md:w-24 aspect-square rounded-xl overflow-hidden mr-4 shrink-0">
                    {isLoading ? (
                      <FullScreenLoading isDerma />
                    ) : (
                      isEmpty(images[pictureIndex]) &&
                      isEmpty(picturesUrls[pictureIndex]) && (
                        <Image
                          src={uploaderDefaultImage({
                            index: pictureIndex,
                            isDisabled,
                          })}
                          fill
                          className="object-cover"
                          alt={subtitle}
                        />
                      )
                    )}

                    {!isEmpty(images[pictureIndex]) &&
                      !isEmpty(images[pictureIndex]['data_url']) && (
                        <Image
                          src={images[pictureIndex]['data_url']}
                          alt={subtitle}
                          fill
                          className="object-cover"
                        />
                      )}

                    {!isEmpty(picturesUrls[pictureIndex]) && (
                      <Image
                        src={picturesUrls[pictureIndex]}
                        alt={subtitle}
                        fill
                        className="object-cover"
                        onLoad={() => {
                          setIsLoading(false);
                          setImageIsLoading(false);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={`transition-opacity mr-auto overflow-hidden ${
                      isDisabled() ? 'opacity-30' : ''
                    }`}
                  >
                    <Text className="text-sm md:text-lg">
                      <span className="font-semibold">{title}.</span> {subtitle}
                    </Text>

                    {!isEmpty(images[pictureIndex]) && (
                      <Text className="text-hg-black400 text-xs">
                        <span className="inline-block">
                          {images[pictureIndex]?.file?.name}
                        </span>
                      </Text>
                    )}
                    {isEmpty(images[pictureIndex]) &&
                      isEmpty(picturesUrls[pictureIndex]) && (
                        <Text className="text-hg-black500 text-xs md:text-sm">
                          Haz una foto o selecciona de la galería
                        </Text>
                      )}
                  </div>
                  {(!isEmpty(images[pictureIndex]) ||
                    !isEmpty(picturesUrls[pictureIndex])) && (
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
    </CheckHydration>
  );
}
