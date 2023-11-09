'use client';

import { Product } from '@interface/product';
import { getProductCardColor, useImageProps } from 'app/utils/common';
import { ROUTES } from 'app/utils/routes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgArrow } from 'icons/IconsDs';
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

  const LANDINGS: { [key: string]: string } = {
    '/landing/ppc/holaglow': '#leadForm',
  };

  const isLanding = Object.keys(LANDINGS).includes(usePathname());

  const { imgSrc, alignmentStyles, setNextImgSrc } = useImageProps(product);

  return (
    <Link
      href={
        isLanding
          ? LANDINGS[pathName]
          : `${ROUTES.treatments}/${product?.extraInformation?.slug}`
      }
      className={`text-inherit ${className}`}
      {...rest}
    >
      <div className="flex flex-col h-full pt-4 overflow-hidden">
        <Flex layout="col-left" className="">
          <div className="relative h-[250px] w-full rounded-t-2xl">
            <div
              className="absolute inset-0 top-[10%] rounded-t-3xl "
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
          <div className="mt-auto">
            <div>
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
      </div>
    </Link>
  );
}
