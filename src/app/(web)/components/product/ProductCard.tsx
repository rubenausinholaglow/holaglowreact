'use client';

import { useEffect, useState } from 'react';
import Tracker from '@utils/tracker';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { SvgPlusSmall } from 'app/icons/Icons';
import { SvgArrow, SvgGlow } from 'app/icons/IconsDs';
import { CartItem, Product } from 'app/types/product';
import {
  getDiscountedPrice,
  getProductCardColor,
  useImageProps,
} from 'app/utils/common';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const tracker = new Tracker();
  const ROUTES = useRoutes();

  const pathName = usePathname();
  const { imgSrc, alignmentStyles, setNextImgSrc } = useImageProps(product);
  const [discountedPrice, setDiscountedPrice] = useState<0 | number>(0);
  const { setHighlightProduct, cart } = useCartStore(state => state);
  const addToCart = useCartStore(state => state.addItemToCart);

  const LANDINGS: { [key: string]: string } = {
    '/landing/ppc/holaglow': '#leadForm',
  };

  const isLanding = Object.keys(LANDINGS).includes(usePathname());

  const applyItemDiscount = useCartStore(state => state.applyItemDiscount);
  const [pendingDiscount, setPendingDiscount] = useState(false);

  useEffect(() => {
    if (pendingDiscount) {
      const discountedPrice = getDiscountedPrice(product);

      if (discountedPrice !== null) {
        applyItemDiscount(cart[cart.length - 1].uniqueId, discountedPrice, '€');
        setPendingDiscount(false);
      }
    }
  }, [pendingDiscount]);

  useEffect(() => {
    if (!isEmpty(product.discounts)) {
      const discountedPrice = getDiscountedPrice(product);

      if (discountedPrice !== null) {
        setDiscountedPrice(discountedPrice);
      }
    }
  }, [product]);

  const imgHeight = isDashboard ? 'h-[200px]' : 'h-[250px]';

  const productElement = (
    <div
      className="flex flex-col h-full pt-4 overflow-hidden"
      onClick={() => {
        if (isDashboard) setHighlightProduct(product);
      }}
    >
      <Flex layout="col-left" className="">
        <div className={`relative ${imgHeight} w-full rounded-t-2xl`}>
          <div
            className="absolute inset-0 top-[10%] rounded-t-2xl bg-gradient from-hg-pink to-hg-pink/5"
            /* style={{
              background: getProductCardColor(product.cardBackgroundColor),
            }} */
          />

          <Image
            alt={product.title}
            width={400}
            height={300}
            src={imgSrc}
            onError={() => setNextImgSrc()}
            className={`relative ${alignmentStyles} ${imgHeight} w-auto`}
          />

          {/* {!isEmpty(product.category) && (
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
          )} */}

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
        {!isDashboard && (
          <Text size="xs" className="text-hg-black500 mb-8">
            {product.longDescription}
          </Text>
        )}
        <Flex
          layout={isDashboard ? 'col-left' : 'row-left'}
          className="mt-auto justify-between w-full"
        >
          <Flex layout={isDashboard ? 'row-left' : 'col-left'}>
            {discountedPrice > 0 && (
              <Text
                className={`text-xs line-through text-hg-black500 ${
                  isDashboard ? 'order-2 text-md' : ''
                }`}
              >
                {product.price} €
              </Text>
            )}
            {!discountedPrice && !product.isPack && (
              <Text className="text-xs text-hg-black500">Desde</Text>
            )}
            <Text
              className={`text-hg-secondary font-semibold ${
                isDashboard ? 'text-xl' : 'text-lg'
              }`}
            >
              {discountedPrice ? discountedPrice : product.price} €{' '}
            </Text>
          </Flex>
          {isDashboard ? (
            <Button
              size="sm"
              type="tertiary"
              className="mt-auto"
              customStyles="bg-hg-primary"
              onClick={e => {
                e.stopPropagation();
                addToCart(product as CartItem);
                setPendingDiscount(true);
              }}
            >
              <p className="mr-2">Añadir </p>
              <SvgPlusSmall height={20} width={20} />
            </Button>
          ) : (
            <Button type="primary" className="mt-auto ml-4">
              <p className="mr-2">Saber más</p>
              <SvgArrow height={20} width={20} />
            </Button>
          )}
        </Flex>
      </Flex>
    </div>
  );

  if (!isDashboard)
    return (
      <Link
        id="tmevent_click_product_card"
        onClick={() =>
          tracker.track('Click', 'ProductCard', product?.extraInformation?.slug)
        }
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

  if (isDashboard) return productElement;
}
