'use client';

import { useEffect, useState } from 'react';
import { CartItem } from '@interface/product';
import { useCartStore } from 'app/dashboard/(pages)/budgets/stores/userCartStore';
import ProductDiscountForm from 'app/dashboard/(pages)/checkout/components/ProductDiscountForm';
import { useGlobalStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { getDiscountedPrice } from 'app/utils/common';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgAngleDown, SvgClose } from 'icons/Icons';
import { SvgArrow, SvgGlow } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import Image from 'next/image';

const DEFAULT_IMG_SRC = '/images/product/holaglowProduct.png?1';
interface Props {
  product: CartItem;
  isCheckout?: boolean;
}

export default function ProductCard({ product, isCheckout }: Props) {
  const {
    cart,
    removeFromCart,
    addItemToCart,
    setHighlightProduct,
    removeItemDiscount,
  } = useCartStore(state => state);

  const { isModalOpen, setIsModalOpen } = useGlobalStore(state => state);

  const applyItemDiscount = useCartStore(state => state.applyItemDiscount);

  const [showDiscountForm, setShowDiscountBlock] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_PRODUCT_IMG_PATH}${product.flowwwId}/${product.flowwwId}.jpg`
  );
  const productCartItem = cart.filter(
    item =>
      item.uniqueId === product.uniqueId &&
      product.priceWithDiscount !== product.price
  )[0];

  const productHasDiscount = !isEmpty(productCartItem);
  const productHasPromoDiscount = !isEmpty(product.discounts);
  const productPricewithPromoDiscount = getDiscountedPrice(product);
  const [pendingDiscount, setPendingDiscount] = useState(false);

  useEffect(() => {
    if (pendingDiscount) {
      applyItemDiscount(
        cart[cart.length - 1].uniqueId,
        getDiscountedPrice(product),
        '€'
      );
      setPendingDiscount(false);
    }
  }, [pendingDiscount]);
  return (
    <Flex layout="col-left" className="border-b border-hg-black">
      <Flex className="w-full justify-between items-start p-4">
        <div>
          <Text className="font-semibold text-md">
            {product.title}{' '}
            {product.sessions > 1 && !product.isPack && 'x' + product.sessions}
          </Text>
          {product.description && (
            <Text size="sm" className="text-hg-black500">
              {product.description}
            </Text>
          )}
        </div>
        <SvgClose
          width={20}
          height={20}
          fill={HOLAGLOW_COLORS['black']}
          className="cursor-pointer shrink-0"
          onClick={() => removeFromCart(product)}
        />
      </Flex>
      <Flex className="p-4 w-full">
        {(productHasDiscount || productHasPromoDiscount) && (
          <Text className="text-hg-secondary font-semibold text-2xl mr-2 self-end">
            {Number(product.priceWithDiscount).toFixed(2)}€
          </Text>
        )}

        <Text
          size="lg"
          className={`font-semibold text-red self-end mb-1
            ${
              productHasDiscount || productHasPromoDiscount
                ? 'text-hg-black500 text-md text line-through opacity-50'
                : 'text-hg-secondary text-lg'
            }`}
        >
          {product.price.toFixed(2)}€
        </Text>

        <SvgArrow
          height={28}
          width={28}
          className={`ml-auto transition-transform border border-hg-black rounded-full cursor-pointer p-1.5 ${
            showDiscountForm
              ? 'rotate-90 bg-hg-secondary100 border-none'
              : 'rotate-0'
          }`}
          onClick={() => setShowDiscountBlock(!showDiscountForm)}
        />
      </Flex>
      {/* {!showDiscountForm && (
        <div
          className={`aspect-square relative ${
            isCheckout ? 'w-[125px]' : 'w-full shrink-0'
          } `}
        >
          <Image
            src={imgSrc}
            alt={product.title}
            fill={true}
            className="object-cover"
            onError={() => setImgSrc(DEFAULT_IMG_SRC)}
          />
        </div>
      )} */}
      {/* {!isEmpty(product.tags) && product.tags[0].tag === 'B.Friday' && (
        <Flex
          layout="row-center"
          className="tagtest bg-hg-black rounded-full p-1 px-2 absolute top-[24px] left-0 m-2"
        >
          <SvgGlow height={12} width={12} className="text-hg-primary mr-1" />
          <Text className="text-hg-secondary" size="xs">
            B.<span className="text-hg-primary">Friday</span>
          </Text>
        </Flex>
      )} */}
      {/*
      <Flex layout="col-left">
        <Text size={isCheckout ? 'md' : 'sm'} className="font-semibold mb-1">
          {product.title}{' '}
          {product.sessions > 1 && !product.isPack && 'x' + product.sessions}
        </Text>
        <Text size={isCheckout ? 'sm' : 'xs'} className="text-hg-tertiary mb-3">
          {product.description}
        </Text> */}
      {/* 
        <Flex layout="row-left" className="mb-3">
          {isCheckout && (
            <SvgAngleDown
              height={20}
              width={20}
              fill="white"
              className={`transition-transform bg-slate-400 rounded-full mr-2 cursor-pointer ${
                showDiscountForm ? 'rotate-180' : 'rotate-0'
              }`}
              onClick={() => setShowDiscountBlock(!showDiscountForm)}
            />
          )} */}
      {/* {productHasDiscount && isCheckout && (
            <Text className="text-hg-black font-semibold text-lg mr-2">
              {Number(product.priceWithDiscount).toFixed(2)}€
            </Text>
          )}

          <Text
            size="lg"
            className={`font-semibold text-red
            ${
              productHasDiscount && isCheckout
                ? 'text-red-600 text-sm text line-through opacity-50'
                : 'text-hg-black text-lg'
            } ${productHasPromoDiscount ? 'line-through text-xs' : ''}
              `}
          >
            {product.price.toFixed(2)}€
          </Text>
          {productHasPromoDiscount && !isCheckout && (
            <Text size="lg" className={`font-semibold text-red ml-2`}>
              {productPricewithPromoDiscount.toFixed(2)}€
            </Text>
          )} 
        </Flex>
          */}
      {/*         {!isCheckout && (
          <Button
            size="sm"
            type="secondary"
            onClick={e => {
              e.stopPropagation();
              addItemToCart(product);
              setPendingDiscount(true);
            }}
            className="w-full mt-auto"
          >
            Seleccionar
          </Button>
        )} 
</Flex>
        */}
      {showDiscountForm && (
        <div className="bg-hg-black100 p-4 w-full">
          <Text className="text-hg-black500 text-sm mb-2">Descuentos</Text>

          <ProductDiscountForm
            cartUniqueId={product.uniqueId}
            productPrice={product.price}
            isCheckout={false}
          />
          {productHasDiscount && (
            <Flex layout="row-left" className="mt-2">
              {productCartItem.priceDiscount < productCartItem.price &&
                productCartItem.priceDiscount !== 0 && (
                  <Flex
                    layout="row-left"
                    className="bg-hg-primary text-hg-tertiary rounded-full px-2 py-[2px] font-semibold mr-2"
                    onClick={() => removeItemDiscount(product.uniqueId, '€')}
                  >
                    <Text size="xs">
                      total: {productCartItem.priceDiscount}€
                    </Text>
                    <SvgClose height={12} width={12} className="ml-1" />
                  </Flex>
                )}
              {productCartItem.percentageDiscount > 0 && (
                <Flex
                  layout="row-left"
                  className="bg-hg-primary text-hg-tertiary rounded-full px-2 py-[2px] font-semibold mr-2"
                  onClick={() => removeItemDiscount(product.uniqueId, '%')}
                >
                  <Text size="xs">-{productCartItem.percentageDiscount}%</Text>
                  <SvgClose height={12} width={12} className="ml-1" />
                </Flex>
              )}
            </Flex>
          )}
        </div>
      )}
    </Flex>
  );
}
