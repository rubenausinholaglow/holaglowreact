'use client';

import { useEffect, useState } from 'react';
import { CartItem } from '@interface/product';
import { useGlobalStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgAngleDown, SvgClose } from 'icons/Icons';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import ProductDiscountForm from '../../checkout/components/ProductDiscountForm';
import { useCartStore } from '../stores/userCartStore';

const DEFAULT_IMG_SRC = '/images/product/holaglowProduct.png?1';
interface Props {
  product: CartItem;
  isCheckout?: boolean;
  budget: string;
}

export default function ProductCard({ product, isCheckout, budget }: Props) {
  const cart = useCartStore(state => state.cart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const addToCart = useCartStore(state => state.addItemToCart);
  const setHighlightProduct = useCartStore(state => state.setHighlightProduct);
  const setIsModalOpen = useGlobalStore(state => state.setIsModalOpen);
  const removeItemDiscount = useCartStore(state => state.removeItemDiscount);

  const [showDiscountForm, setShowDiscountBlock] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    `https://budgetimages.blob.core.windows.net/images/products/${product.flowwwId}/${product.flowwwId}.jpg`
  );
  const productCartItem = cart.filter(
    item =>
      item.uniqueId === product.uniqueId &&
      product.priceWithDiscount !== product.price
  )[0];

  const productHasDiscount = !isEmpty(productCartItem);

  return (
    <Flex
      layout={isCheckout ? 'row-left' : 'col-left'}
      className={`
        border border-hg-darkMalva bg-white text-hg-darkMalva rounded-lg overflow-hidden relative
        ${!isCheckout && 'cursor-pointer'}`}
      onClick={() => {
        setHighlightProduct(product);
        if (!isCheckout) {
          setIsModalOpen(true);
        }
      }}
    >
      {!budget && (
        <SvgClose
          width={30}
          height={30}
          fill={HOLAGLOW_COLORS['darkMalva']}
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => removeFromCart(product)}
        />
      )}
      <div
        className={`aspect-square relative ${
          isCheckout ? 'w-[225px] mr-8' : 'w-full shrink-0'
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
      <Flex
        layout="col-left"
        className={
          isCheckout
            ? 'py-4'
            : 'border-t border-hg-darkMalva p-4 text-left w-full h-full'
        }
      >
        <Text size={isCheckout ? 'lg' : 'md'} className="font-semibold">
          {product.title}
        </Text>
        <Text
          size={isCheckout ? 'md' : 'xs'}
          className="text-hg-lightMalva mb-3"
        >
          {product.description}
        </Text>
        <Flex layout="row-left" className="mb-3">
          {isCheckout && !budget && (
            <SvgAngleDown
              height={20}
              width={20}
              fill="white"
              className={`transition-transform bg-slate-400 rounded-full mr-2 cursor-pointer ${
                showDiscountForm ? 'rotate-180' : 'rotate-0'
              }`}
              onClick={() => setShowDiscountBlock(!showDiscountForm)}
            />
          )}
          {productHasDiscount && isCheckout && (
            <Text className="text-hg-black font-semibold text-xl mr-2">
              {Number(product.priceWithDiscount).toFixed(2)}€
            </Text>
          )}
          <Text
            size={isCheckout ? 'xl' : 'lg'}
            className={`font-semibold text-red
            ${
              productHasDiscount && isCheckout
                ? 'text-red-600 text-lg text line-through opacity-50'
                : 'text-hg-black text-lg'
            }
              `}
          >
            {product.price.toFixed(2)}€
          </Text>
        </Flex>

        {!isCheckout && (
          <Button
            size="md"
            type="secondary"
            onClick={e => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full mt-auto"
          >
            Seleccionar
          </Button>
        )}
        {showDiscountForm && !budget && (
          <>
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
                      className="bg-hg-lime text-hg-darkMalva rounded-full px-2 py-[2px] font-semibold mr-2"
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
                    className="bg-hg-lime text-hg-darkMalva rounded-full px-2 py-[2px] font-semibold mr-2"
                    onClick={() => removeItemDiscount(product.uniqueId, '%')}
                  >
                    <Text size="xs">
                      -{productCartItem.percentageDiscount}%
                    </Text>
                    <SvgClose height={12} width={12} className="ml-1" />
                  </Flex>
                )}
              </Flex>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
}
