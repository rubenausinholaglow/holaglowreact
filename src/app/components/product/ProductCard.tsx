'use client';

import { useState } from 'react';
import { Product } from '@interface/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
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
        <Text className="mb-2 font-semibold">{treatment.title}</Text>
        <Text size="xs" className="text-hg-gray-200 mb-8">
          {treatment.description}
        </Text>
        <Button
          type="tertiary"
          className="mt-auto"
          color={HOLAGLOW_COLORS['black']}
          bgColor={HOLAGLOW_COLORS['lime']}
        >
          <Flex layout="row-center">
            <Text size="sm" className="mr-2">
              Saber más
            </Text>
            <SvgArrow height={20} width={20} />
          </Flex>
        </Button>
      </Flex>
    </div>
  );
}
