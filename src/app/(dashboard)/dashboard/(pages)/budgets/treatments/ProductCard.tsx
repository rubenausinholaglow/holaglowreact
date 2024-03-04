'use client';

import { useEffect, useState } from 'react';
import useSelectTreatments from '@dashboardComponents/useSelectTreatments';
import { SvgAngleDown, SvgClose } from 'app/icons/Icons';
import { SvgGlow } from 'app/icons/IconsDs';
import { useGlobalStore } from 'app/stores/globalStore';
import { CartItem } from 'app/types/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { getDiscountedPrice } from 'app/utils/common';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import ProductDiscountForm from '../../checkout/components/ProductDiscountForm';
import { useCartStore } from '../stores/userCartStore';

const DEFAULT_IMG_SRC = '/images/product/holaglowProduct.png?1';
interface Props {
  product: CartItem;
  isCheckout?: boolean;
}

export default function ProductCard({ product, isCheckout }: Props) {
  const { cart, removeFromCart, addItemToCart, setHighlightProduct } =
    useCartStore(state => state);
  const { removeProduct } = useSelectTreatments();
  const { setIsModalOpen } = useGlobalStore(state => state);

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
      const discountedPrice = getDiscountedPrice(product);

      if (discountedPrice !== null) {
        applyItemDiscount(cart[cart.length - 1].uniqueId, discountedPrice, '€');
        setPendingDiscount(false);
      }
    }
  }, [pendingDiscount]);

  return (
    <Flex
      layout={isCheckout ? 'row-left' : 'col-left'}
      className={`
        bg-white text-hg-secondary rounded-lg overflow-hidden relative
        ${!isCheckout && 'cursor-pointer'}`}
      onClick={() => {
        setHighlightProduct(product);
        if (!isCheckout) {
          setIsModalOpen(true);
        }
      }}
    >
      <SvgClose
        width={20}
        height={20}
        fill={HOLAGLOW_COLORS['black']}
        className="absolute top-2 right-2 cursor-pointer"
        onClick={e => {
          removeFromCart(product);
          removeProduct(product);
        }}
      />
      {!showDiscountForm && (
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
      )}
      {!isEmpty(product.tags) && product.tags[0].tag === 'B.Friday' && (
        <Flex
          layout="row-center"
          className="tagtest bg-hg-black rounded-full p-1 px-2 absolute top-[24px] left-0 m-2"
        >
          <SvgGlow height={12} width={12} className="text-hg-primary mr-1" />
          <Text className="text-hg-secondary" size="xs">
            B.<span className="text-hg-primary">Friday</span>
          </Text>
        </Flex>
      )}
      <Flex
        layout="col-left"
        className={isCheckout ? 'p-4' : 'p-4 text-left w-full h-full'}
      >
        <Text size={isCheckout ? 'md' : 'sm'} className="font-semibold mb-1">
          {product.title}{' '}
          {product.sessions > 1 && !product.isPack && 'x' + product.sessions}
        </Text>
        <Text size={isCheckout ? 'sm' : 'xs'} className="text-hg-tertiary mb-3">
          {product.description}
        </Text>
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
          )}
          {productHasDiscount && isCheckout && (
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
          {productHasPromoDiscount &&
            !isCheckout &&
            productPricewithPromoDiscount && (
              <Text size="lg" className={`font-semibold text-red ml-2`}>
                {productPricewithPromoDiscount.toFixed(2)}€
              </Text>
            )}
        </Flex>

        {!isCheckout && (
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
        {showDiscountForm && (
          <>
            <ProductDiscountForm
              cartUniqueId={product.uniqueId}
              productPrice={product.price}
              isCheckout={false}
            />
          </>
        )}
      </Flex>
    </Flex>
  );
}
