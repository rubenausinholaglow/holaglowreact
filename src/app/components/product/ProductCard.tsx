'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import {
  getDiscountedPrice,
  getProductCardColor,
  useImageProps,
} from 'app/utils/common';
import { ROUTES } from 'app/utils/routes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgArrow, SvgGlow } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import CategoryIcon from '../common/CategoryIcon';

export default function ProductCard({
  product,
  className = '',
  searchParams,
  ...rest
}: {
  product: Product;
  className?: string;
  [key: string]: any;
}) {
  const pathName = usePathname();
  const { imgSrc, alignmentStyles, setNextImgSrc } = useImageProps(product);
  const [discountedPrice, setDiscountedPrice] = useState<null | number>(null);

  const LANDINGS: { [key: string]: string } = {
    '/landing/ppc/holaglow': '#leadForm',
  };

  const isLanding = Object.keys(LANDINGS).includes(usePathname());

  useEffect(() => {
    if (!isEmpty(product.discounts)) {
      setDiscountedPrice(getDiscountedPrice(product));
    }
  }, [product]);

  return (
    <Link
      href={
        isLanding
          ? LANDINGS[pathName]
          : `${ROUTES.treatments}/${product?.extraInformation?.slug}`
      }
      className={`text-inherit ${className}`}
      {...rest}
      id={'tmevent_click_product_card'}
    >
      <div className="flex flex-col h-full pt-4 overflow-hidden">
        <Flex layout="col-left" className="">
          <div className="relative h-[250px] w-full rounded-t-2xl">
            <div
              className="absolute inset-0 top-[10%] rounded-t-2xl "
              style={{
                background: getProductCardColor(product.cardBackgroundColor),
              }}
            />

            <Image
              alt={product.title}
              width={400}
              height={300}
              src={imgSrc}
              onError={() => setNextImgSrc()}
              className={`relative ${alignmentStyles} h-[250px] w-auto`}
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
                      className="flex rounded-full"
                    >
                      <CategoryIcon category={category.name} hasBackground />
                    </Flex>
                  );
                })}
              </Flex>
            )}

            {!isEmpty(product.tags) && product.tags[0].tag === 'B.Friday' && (
              <Flex
                layout="row-center"
                className="bg-hg-black rounded-full p-1 px-2 absolute top-[24px] left-0 m-2"
              >
                <SvgGlow
                  height={12}
                  width={12}
                  className="text-hg-primary mr-1"
                />
                <Text className="text-hg-secondary" size="xs">
                  B.<span className="text-hg-primary">Friday</span>
                </Text>
              </Flex>
            )}
          </div>
        </Flex>
        <Flex
          layout="col-left"
          className="p-3 flex-grow bg-white rounded-b-2xl z-10"
        >
          <Text className="mb-2 font-semibold">{product.title}</Text>
          <Text size="xs" className="text-hg-black500 mb-8">
            {product.description}
          </Text>

          <Flex className="mt-auto justify-between w-full">
            <div>
              {discountedPrice && (
                <Text className="text-xs line-through text-hg-black500">
                  {product.price} €
                </Text>
              )}
              {!discountedPrice && !product.isPack && (
                <Text className="text-xs text-hg-secondary">desde</Text>
              )}
              <Text className=" text-hg-secondary font-semibold text-lg">
                {discountedPrice ? discountedPrice : product.price} €{' '}
              </Text>
            </div>
            <Button
              type="tertiary"
              className="mt-auto ml-4"
              bgColor="bg-hg-primary"
              customStyles="hover:bg-hg-secondary100"
            >
              <p className="mr-2">Saber más</p>
              <SvgArrow height={20} width={20} />
            </Button>
          </Flex>
        </Flex>
      </div>
    </Link>
  );
}
