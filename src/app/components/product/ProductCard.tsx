'use client';

import { useState } from 'react';
import { Product } from '@interface/product';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgArrow } from 'icons/IconsDs';
import Image from 'next/image';

export default function TreatmentCard({
  treatment,
  ...rest
}: {
  treatment: Product;
  [key: string]: any;
}) {
  const DEFAULT_IMG_SRC = '/images/product/holaglowProduct.png?1';

  const [imgSrc, setImgSrc] = useState(
    `/images/product/${treatment.flowwwId}/${treatment.flowwwId}.png`
  );

  return (
    <div className="flex flex-col overflow-hidden h-full" {...rest}>
      <Flex layout="col-left" className="">
        <div className="relative aspect-square w-full">
          <Image
            alt="treatment.title"
            fill
            src={imgSrc}
            onError={() => setImgSrc(DEFAULT_IMG_SRC)}
            className="object-cover rounded-t-2xl"
          />
        </div>
      </Flex>
      <Flex layout="col-left" className="p-3 flex-grow bg-white rounded-b-2xl">
        <Title size="xl" className="mb-2">
          {treatment.title}
        </Title>
        <Text size="sm" className="text-hg-gray-200 mb-8">
          {treatment.description}
        </Text>
        <Button
          style="tertiary"
          className="mt-auto bg-hg-lime border-hg-darkMalva text-hg-darkMalva"
        >
          <Flex layout="row-center">
            <Text size="sm" className="mr-2">
              Saber más
            </Text>
            <SvgArrow height={20} width={20} className="rotate-180" />
          </Flex>
        </Button>
      </Flex>
    </div>
  );
}
