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
import Link from 'next/link';

export default function ProductCard({
  product,
  ...rest
}: {
  product: Product;
  [key: string]: any;
}) {
  const DEFAULT_IMG_SRC = '/images/product/holaglowProduct.png?1';

  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_PRODUCT_IMG_PATH}${product.flowwwId}/${product.flowwwId}.jpg`
  );

  console.log(product);

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
              className="bg-white rounded-full p-1 absolute left-0 bottom-0 m-2 gap-1"
            >
              {product.category.map(category => {
                return (
                  <Flex
                    key={category.name}
                    layout="row-left"
                    className="flex rounded-full bg-hg-tertiary300"
                  >
                    <SvgDiamond
                      height={36}
                      width={36}
                      fill={HOLAGLOW_COLORS['secondary']}
                      className="border rounded-full p-1"
                      style={{ borderColor: `${HOLAGLOW_COLORS['secondary']}` }}
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
        <Text size="xs" className="text-hg-black500 mb-8">
          {product.description}
        </Text>
        <Button
          type="tertiary"
          className="mt-auto"
          bgColor="bg-hg-primary"
          customStyles="hover:bg-hg-secondary100"
        >
          <Link href={`/productos/${product.slug}`} className="text-inherit">
            <Flex layout="row-center">
              <p className="mr-2">Saber más</p>
              <SvgArrow height={20} width={20} />
            </Flex>
          </Link>
        </Button>
      </Flex>
    </div>
  );
}
