'use client';

import { useState } from 'react';
import { CartItem } from '@interface/product';
import { Button } from 'components/Buttons/Buttons';
import { Flex } from 'components/Layouts/Layouts';
import { Text, Title } from 'components/Texts';
import { SvgClose } from 'icons/Icons';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { HOLAGLOW_COLORS } from 'utils/colors';

import ProductDiscountForm from '../../checkout/components/ProductDiscountForm';
import { useCartStore } from '../stores/userCartStore';

const DEFAULT_IMG_SRC = '/images/product/holaglowProduct.png?1';
interface Props {
  product: CartItem;
  isCheckout?: boolean;
}

export default function ProductCard({ product, isCheckout }: Props) {
  const cart = useCartStore(state => state.cart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const addToCart = useCartStore(state => state.addItemToCart);
  const setHighlightProduct = useCartStore(state => state.setHighlightProduct);

  const [imgSrc, setImgSrc] = useState(
    `/images/product/${product.flowwwId}/${product.flowwwId}.png`
  );

  console.log(cart);
  console.log(product);

  const productCartItem = cart.filter(
    item =>
      item.uniqueId === product.uniqueId &&
      product.priceWithDiscount !== product.price
  )[0];

  console.log(productCartItem);

  const productHasDiscount = !isEmpty(productCartItem);

  console.log(productHasDiscount);

  return (
    <Flex
      layout={isCheckout ? 'row-left' : 'col-left'}
      className={`
        border border-hg-darkMalva bg-white text-hg-darkMalva rounded-lg overflow-hidden relative
        ${!isCheckout && 'cursor-pointer'}`}
      onClick={() => setHighlightProduct(product)}
    >
      <SvgClose
        width={30}
        height={30}
        fill={HOLAGLOW_COLORS['darkMalva']}
        className="absolute top-2 right-2"
        onClick={() => removeFromCart(product)}
      />

      <div
        className={`aspect-[4/3] relative ${
          isCheckout ? 'w-[300px] mr-8' : 'w-full shrink-0'
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
        <Title size={isCheckout ? 'xl' : 'lg'} className="font-semibold">
          {product.title}
        </Title>
        <Text
          size={isCheckout ? 'lg' : 'sm'}
          className="text-hg-lightMalva mb-3"
        >
          {product.description}
        </Text>
        <Flex layout="row-left">
          {productHasDiscount && isCheckout && (
            <Text
              size={isCheckout ? '2xl' : 'xl'}
              className="text-hg-black font-semibold mb-3 mr-2"
            >
              {product.priceWithDiscount.toFixed(2)}€
            </Text>
          )}
          <Text
            size={isCheckout ? '2xl' : 'xl'}
            className={`font-semibold mb-3 text-red
            ${
              productHasDiscount && isCheckout
                ? 'text-red-600 text-lg text line-through opacity-50'
                : 'text-hg-black'
            }
              `}
          >
            {product.price.toFixed(2)}€
          </Text>
        </Flex>

        {!isCheckout ? (
          <Button
            style="primary"
            type="button"
            onClick={e => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="px-4 w-full mt-auto"
          >
            Seleccionar
          </Button>
        ) : (
          <>
            <ProductDiscountForm cartUniqueId={product.uniqueId} />
            {productHasDiscount && (
              <Flex layout="row-left" className="mt-2">
                {productCartItem.percentageDiscount !== '0' && (
                  <Text
                    className="bg-hg-lime text-hg-darkMalva rounded-full px-2 py-[2px] font-semibold mr-2"
                    size="sm"
                  >
                    -{productCartItem.percentageDiscount}%
                  </Text>
                )}
                {productCartItem.priceDiscount !== '0' && (
                  <Text
                    className="bg-hg-lime text-hg-darkMalva rounded-full px-2 py-[2px] font-semibold mr-2"
                    size="sm"
                  >
                    -{productCartItem.priceDiscount}€
                  </Text>
                )}
              </Flex>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
}
