'use client';

import { useState } from 'react';
import { Product } from '@interface/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgDiamond } from 'icons/Icons';
import { SvgArrow } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import Image from 'next/image';

export default function ProductCard({
  product,
  ...rest
}: {
  product: Product;
  [key: string]: any;
}) {
  const DEFAULT_IMG_SRC = '/images/product/holaglowProduct.png?1';

  const [imgSrc, setImgSrc] = useState(
    `/images/product/${product.flowwwId}/${product.flowwwId}.png`
  );

  /* 
  "category": [
    {
      "name": "\tRelleno\t",
      "value": 4,
      "id": "9627ef8b-4c26-4d60-89d8-edfca4b5b345",
      "creationDate": "2023-08-14T07:08:45.9733333",
      "active": true
    }
  ], */

  return (
    <div className="flex flex-col overflow-hidden h-full" {...rest}>
      <Flex layout="col-left" className="">
        <div className="relative aspect-[4/3] w-full">
          <Image
            alt={product.title}
            fill
            src={imgSrc}
            onError={() => setImgSrc(DEFAULT_IMG_SRC)}
            className="object-cover rounded-t-2xl"
          />

          {!isEmpty(product.category) && (
            <Flex
              layout="row-center"
              className="bg-white rounded-full p-1 absolute left-0 bottom-0 m-2"
            >
              {product.category.map(category => {
                return (
                  <Flex
                    key={category.name}
                    layout="row-left"
                    className="flex rounded-full bg-hg-darkMalva300"
                  >
                    <SvgDiamond
                      height={36}
                      width={36}
                      fill={HOLAGLOW_COLORS['purple']}
                      className="border rounded-full p-1"
                      style={{ borderColor: `${HOLAGLOW_COLORS['purple']}` }}
                    />
                  </Flex>
                );
              })}
            </Flex>
          )}
        </div>
      </Flex>
      <Flex layout="col-left" className="p-3 flex-grow bg-white rounded-b-2xl">
        <Text className="mb-2 font-semibold">{product.title}</Text>
        <Text size="xs" className="text-hg-gray-200 mb-8">
          {product.description}
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
