'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import ProductDiscountForm from 'app/(dashboard)/dashboard/(pages)/checkout/components/ProductDiscountForm';
import { SvgClose } from 'app/icons/Icons';
import { SvgArrow } from 'app/icons/IconsDs';
import { CartItem } from 'app/types/product';
import { getDiscountedPrice } from 'app/utils/common';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

interface Props {
  product: CartItem;
  isCheckout?: boolean;
}

export default function ProductCard({ product, isCheckout }: Props) {
  const { cart, removeFromCart, removeItemDiscount } = useCartStore(
    state => state
  );

  const applyItemDiscount = useCartStore(state => state.applyItemDiscount);

  const [showDiscountForm, setShowDiscountBlock] = useState(false);
  const [showCartDiscount, setShowCartDiscount] = useState(false);

  const productCartItem = cart.filter(
    item =>
      item.uniqueId === product.uniqueId &&
      product.priceWithDiscount !== product.price
  )[0];

  const productHasDiscount = !isEmpty(productCartItem);
  const productHasPromoDiscount = !isEmpty(product.discounts);
  const [pendingDiscount, setPendingDiscount] = useState(false);

  const minPriceToStartDiscount = Number(
    process.env.NEXT_PUBLIC_MIN_PRICE_TO_DISCOUNT
  );
  const productsPriceTotal = cart.reduce(
    (acc, product) => acc + product.price,
    0
  );
  const validProducts = ['5519', '2151'];

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
    if (isCheckout) {
      setShowDiscountBlock(true);
    }
  }, []);

  return (
    <Flex layout="col-left" className="border-b border-hg-black">
      <Flex className="w-full justify-between items-start px-4 pt-4 mb-4">
        <Text className="font-semibold text-md">
          {product.title}{' '}
          {!isCheckout &&
            product.sessions > 1 &&
            !product.isPack &&
            !product.title.includes('x') &&
            'x' + product.sessions}
        </Text>
        {isCheckout ? (
          <SvgClose
            width={20}
            height={20}
            className="cursor-pointer shrink-0"
            onClick={() => removeFromCart(product)}
          />
        ) : (
          <Button
            size="sm"
            onClick={() => removeFromCart(product)}
            type="white"
            className="shrink-0"
          >
            Eliminar
          </Button>
        )}
      </Flex>
      <Flex className="px-4 pb-4 w-full items-end">
        {(productHasDiscount || productHasPromoDiscount) && (
          <Text className="text-hg-secondary font-semibold text-lg mr-2 self-end">
            {Number(product.priceWithDiscount) % 1 === 0
              ? Number(product.priceWithDiscount)
              : Number(Number(product.priceWithDiscount).toFixed(2))}
            €
          </Text>
        )}
        <Text
          size="lg"
          className={
            productHasDiscount || productHasPromoDiscount
              ? 'text-hg-black500 text-md line-through'
              : 'text-hg-secondary text-lg font-semibold'
          }
        >
          {product.price.toFixed(2)}€
        </Text>
      </Flex>

      {showDiscountForm && (
        <>
          {validProducts.includes(product.flowwwId.toString()) &&
            productsPriceTotal > minPriceToStartDiscount && (
              <div className="bg-hg-black100 p-4 w-full justify-end">
                <SvgArrow
                  height={24}
                  width={24}
                  className={`ml-auto transition-transform border border-hg-black rounded-full cursor-pointer p-1 ${
                    showCartDiscount
                      ? 'rotate-90 bg-hg-secondary100 border-none'
                      : 'rotate-0'
                  }`}
                  onClick={() => setShowCartDiscount(!showCartDiscount)}
                />
                {showCartDiscount && (
                  <>
                    <ProductDiscountForm
                      cartUniqueId={product.uniqueId}
                      isCheckout={false}
                      showPercentage={true}
                    />
                    {productHasDiscount && (
                      <Flex layout="row-left" className="mt-2">
                        {productCartItem.priceDiscount <
                          productCartItem.price &&
                          productCartItem.priceDiscount !== 0 && (
                            <Flex
                              layout="row-left"
                              className="bg-hg-primary text-hg-tertiary rounded-full px-2 py-[2px] font-semibold mr-2"
                              onClick={() =>
                                removeItemDiscount(product.uniqueId, '€')
                              }
                            >
                              <Text size="xs">
                                total: {productCartItem.priceDiscount}€
                              </Text>
                              <SvgClose
                                height={12}
                                width={12}
                                className="ml-1"
                              />
                            </Flex>
                          )}
                        {productCartItem.percentageDiscount > 0 && (
                          <Flex
                            layout="row-left"
                            className="bg-hg-primary text-hg-tertiary rounded-full px-2 py-[2px] font-semibold mr-2"
                            onClick={() =>
                              removeItemDiscount(product.uniqueId, '%')
                            }
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
              </div>
            )}
        </>
      )}
    </Flex>
  );
}
