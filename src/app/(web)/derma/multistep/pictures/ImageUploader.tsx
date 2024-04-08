import { useEffect, useState } from 'react';
import ImageUploading, {
  ImageListType,
  ImageType,
} from 'react-images-uploading';
import Bugsnag from '@bugsnag/js';
import { SvgCross } from 'app/icons/IconsDs';
import {
  useDermaImageOneStore,
  useDermaImageThreeStore,
  useDermaImageTwoStore,
  useDermaStore,
} from 'app/stores/dermaStore';
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
  const [images, setImages] = useState<Array<ImageType>>([]);
  const [imageSize, setImageSize] = useState('');
  const { picture, setPicture } = useDermaImageOneStore(state => state);
  const { pictureTwo, setPictureTwo } = useDermaImageTwoStore(state => state);
  const { pictureThree, setPictureThree } = useDermaImageThreeStore(
    state => state
  );

  const onChange = (imageList: ImageListType) => {
    debugger;
    const imagesConcat: Array<ImageType> = [];
    if (picture) imagesConcat.push(picture);
    if (pictureTwo) imagesConcat.push(pictureTwo);
    if (pictureThree) imagesConcat.push(pictureThree);
    setImages(imagesConcat.concat(imageList));
  };

  const removePicture = (index: number) => {
    debugger;
    if (index == 0) setPicture(undefined);
    if (index == 1) setPictureTwo(undefined);
    if (index == 2) setPictureThree(undefined);
  };

  useEffect(() => {
    const pictureSize = ((picture?.file?.size ?? 0) / 1024)
      ?.toFixed(2)
      .replace('.', "'");

    setImageSize(pictureSize);
  }, [picture]);

  useEffect(() => {
    try {
      debugger;
      let pic = undefined;
      if (pictureIndex == 0) pic = images[0];
      if (pictureIndex == 1) pic = images[1];
      if (pictureIndex == 2) pic = images[2];

      if (pic?.file) {
        const fileSize = pic.file.size / 1024; // size in KB
        setImageSize(`${fileSize.toFixed(2).replace('.', "'")} kb`);
      }
      if (pictureIndex == 0) setPicture(images[0]);
      if (pictureIndex == 1) setPictureTwo(images[1]);
      if (pictureIndex == 2) setPictureThree(images[2]);
    } catch (ex) {
      if (ex instanceof Error) {
        alert(ex.message);
        Bugsnag.notify(ex);
      }
    }
  }, [images]);

  const isDisabled = () => {
    if (pictureIndex === 1) {
      return isEmpty(picture) && isEmpty(pictureTwo);
    }

    if (pictureIndex === 2) {
      return isEmpty(pictureTwo) && isEmpty(pictureThree);
    }

    return false;
  };

  return (
    <>
      <ImageUploading
        value={images[pictureIndex] as ImageListType}
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
                  isEmpty(images[pictureIndex]) ? onImageUpload : undefined
                }
                className="w-full"
              >
                <Flex
                  layout="row-left"
                  className="border border-derma-primary500 bg-white rounded-xl py-4 px-3 w-full"
                >
                  <div className="relative h-16 w-16 aspect-square rounded-xl overflow-hidden mr-4 shrink-0">
                    {!isEmpty(images[pictureIndex]) ? (
                      <Image
                        src={images[pictureIndex]['data_url']}
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

                    {!isEmpty(images[pictureIndex]) ? (
                      <Text className="text-hg-black400 text-xs">
                        {imageSize === "0'00" ? (
                          ''
                        ) : (
                          <>
                            <span>{`${imageSize} kb`}</span>
                            <span className="font-bold">{' · '}</span>
                          </>
                        )}
                        <span className="inline-block">
                          {images[pictureIndex]?.file?.name}
                        </span>
                      </Text>
                    ) : (
                      <Text className="text-hg-black500 text-xs">
                        Haz una foto o selecciona de la galería
                      </Text>
                    )}
                  </div>
                  {!isEmpty(images[pictureIndex]) && (
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
