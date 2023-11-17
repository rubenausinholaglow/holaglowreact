'use client';

import { useEffect, useState } from 'react';
import { CartItem, Product } from '@interface/product';
import HightLightedProduct from 'app/dashboard/(pages)/budgets/HightLightedProduct/HightLightedProduct';
import { useCartStore } from 'app/dashboard/(pages)/budgets/stores/userCartStore';
import { useGlobalStore } from 'app/stores/globalStore';
import {
  getDiscountedPrice,
  getProductCardColor,
  useImageProps,
} from 'app/utils/common';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgPlusSmall } from 'icons/Icons';
import { SvgArrow, SvgGlow } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AnimateOnViewport } from '../common/AnimateOnViewport';
import CategoryIcon from '../common/CategoryIcon';

export default function ProductCard({
  product,
  className = '',
  searchParams,
  isDashboard,
  ...rest
}: {
  product: Product;
  className?: string;
  isDashboard?: boolean;
  [key: string]: any;
}) {
  const ROUTES = useRoutes();

  const pathName = usePathname();
  const { imgSrc, alignmentStyles, setNextImgSrc } = useImageProps(product);
  const [discountedPrice, setDiscountedPrice] = useState<null | number>(null);
  const { productHighlighted, setHighlightProduct } = useCartStore(
    state => state
  );
  const addToCart = useCartStore(state => state.addItemToCart);

  const [showProductModal, setShowProductModal] = useState(false);

  const LANDINGS: { [key: string]: string } = {
    '/landing/ppc/holaglow': '#leadForm',
  };

  const isLanding = Object.keys(LANDINGS).includes(usePathname());
  const { isModalOpen, setShowModalBackground } = useGlobalStore(
    state => state
  );

  /*useEffect(() => {
    if (!isModalOpen) {
      setHighlightProduct(null);
    }
  }, [isModalOpen]);*/

  /* useEffect(() => {
    console.log(productHighlighted);
    setShowProductModal(!isEmpty(productHighlighted));
    setShowModalBackground(!isEmpty(productHighlighted));
  }, [productHighlighted]);*/

  useEffect(() => {
    if (!isEmpty(product.discounts)) {
      setDiscountedPrice(getDiscountedPrice(product));
    }
  }, [product]);

  function assignHighlightedProduct() {
    setHighlightProduct(product);
    setShowProductModal(true);
    setShowModalBackground(true);
  }

  const imgHeight = isDashboard ? 'h-[200px]' : 'h-[250px]';

  const productElement = (
    <div className="flex flex-col h-full pt-4 overflow-hidden">
      <Flex layout="col-left" className="">
        <div className={`relative ${imgHeight} w-full rounded-t-2xl`}>
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
            className={`relative ${alignmentStyles} ${imgHeight} w-auto`}
            onClick={() => isDashboard && assignHighlightedProduct()}
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
        <AnimateOnViewport origin="bottom">
          <Text className="mb-2 font-semibold">{product.title}</Text>
          <Text size="xs" className="text-hg-black500 mb-8">
            {product.description}
          </Text>
        </AnimateOnViewport>
        <AnimateOnViewport origin="bottom" className="w-full mt-auto">
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
            {isDashboard ? (
              <Button
                type="tertiary"
                className="mt-auto ml-4"
                bgColor="bg-hg-primary"
                onClick={e => {
                  e.stopPropagation();
                  addToCart(product as CartItem);
                }}
              >
                <p className="mr-2">Añadir </p>
                <SvgPlusSmall height={20} width={20} />
              </Button>
            ) : (
              <Button
                type="tertiary"
                className="mt-auto ml-4"
                bgColor="bg-hg-primary"
                customStyles="hover:bg-hg-secondary100"
              >
                <p className="mr-2">Saber más</p>
                <SvgArrow height={20} width={20} />
              </Button>
            )}
          </Flex>
        </AnimateOnViewport>
      </Flex>
    </div>
  );

  if (!isDashboard)
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
        {productElement}
      </Link>
    );

  if (isDashboard)
    return (
      <>
        {showProductModal && <HightLightedProduct />}
        {productElement}
      </>
    );
}
