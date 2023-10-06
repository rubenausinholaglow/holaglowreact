'use client';

import { useState } from 'react';
import { Product } from '@interface/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { ROUTES } from 'app/utils/routes';
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
  const DEFAULT_IMG_SRC = '/images/product/fakeProduct.png';

  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_PRODUCT_IMG_PATH}${product.flowwwId}/${product.flowwwId}.jpg`
  );

  const tempBgColors = [
    ['#BBC7FFFF'],
    ['#FFC7C7FF'],
    ['#BBC7FFFF', '#FFC7C7FF'],
    ['#BFE090FF'],
    ['#BFE090FF'],
    ['#FF75144D'],
    ['#98A2B34D'],
    ['#EBFF0D80', '#B7F9F980'],
  ];

  const randomIndex = Math.floor(Math.random() * tempBgColors.length);
  const randomValue = tempBgColors[randomIndex];
  console.log(randomValue.length, randomValue);

  const imgBackgroundStyle =
    randomValue.length === 2
      ? `linear-gradient(45deg, ${randomValue[0]} 0%, ${randomValue[1]} 100%)`
      : randomValue[0];

  console.log(imgBackgroundStyle);

  return (
    <Link
      className="text-inherit"
      href={`${ROUTES.products}/${product?.extraInformation?.slug}`}
    >
      <div className="flex flex-col h-full" {...rest}>
        <Flex layout="col-left" className="">
          <div
            className={`relative aspect-[4/3] w-full rounded-t-2xl`}
            style={{ background: imgBackgroundStyle }}
          >
            <Image
              alt={product.title}
              fill
              src={DEFAULT_IMG_SRC}
              onError={() => setImgSrc(DEFAULT_IMG_SRC)}
              className="object-contain rounded-t-2xl scale-110 -translate-y-[5%]"
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
                        style={{
                          borderColor: `${HOLAGLOW_COLORS['secondary']}`,
                        }}
                      />
                    </Flex>
                  );
                })}
              </Flex>
            )}
          </div>
        </Flex>
        <Flex
          layout="col-left"
          className="p-3 flex-grow bg-white rounded-b-2xl"
        >
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
            <Link
              href={`/productos/${product?.extraInformation?.slug}`}
              className="text-inherit"
            >
              <Flex layout="row-center">
                <p className="mr-2">Saber más</p>
                <SvgArrow height={20} width={20} />
              </Flex>
            </Link>
          </Button>
        </Flex>
      </div>
    </Link>
  );
}
