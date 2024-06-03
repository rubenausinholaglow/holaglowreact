'use client';

import { useState } from 'react';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import ProductDiscountForm from 'app/(dashboard)/dashboard/(pages)/checkout/components/ProductDiscountForm';
import { SvgClose } from 'app/icons/Icons';
import { SvgArrow } from 'app/icons/IconsDs';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { applyDiscountToCart } from 'app/utils/utils';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function CheckoutTotal() {
  const {
    cart,
    totalPrice,
    priceDiscount,
    percentageDiscount,
    manualPrice,
    applyCartDiscount,
  } = useCartStore(state => state);

  const [showCartDiscount, setShowCartDiscount] = useState(false);

  let productsPriceTotal = 0;
  let productsPriceTotalWithDiscounts = 0;

  if (cart) {
    productsPriceTotal = cart.reduce((acc, product) => acc + product.price, 0);
    productsPriceTotalWithDiscounts = cart.reduce(
      (acc, product) => acc + Number(product.priceWithDiscount),
      0
    );
  }

  const { setPromoCode } = useGlobalPersistedStore(state => state);

  const hasProductsDiscount =
    productsPriceTotal !== productsPriceTotalWithDiscounts;

  const hasCartDiscount =
    percentageDiscount > 0 || priceDiscount > 0 || manualPrice > 0;

  const cartTotalWithDiscount = applyDiscountToCart(
    percentageDiscount,
    priceDiscount,
    manualPrice,
    productsPriceTotalWithDiscounts
  );
  /*const cartTotalWithDiscountFixed =
    Math.ceil(cartTotalWithDiscount * 100) / 100;
  const productsPriceTotalWithDiscountsFixed =
    Math.ceil(productsPriceTotalWithDiscounts * 100) / 100;*/

  const handleApplyDiscount = () => {
    setPromoCode(undefined);
    applyCartDiscount(0, '€');
  };
  return (
    <div>
      <Flex layout="col-left" className="p-4">
        <Flex layout="col-left" className="w-full gap-2">
          <Flex className="w-full">
            <Text className="text-hg-black400 text-sm">Subtotal</Text>
            <Flex className="ml-auto items-baseline gap-2">
              {(hasProductsDiscount || hasCartDiscount) && (
                <Text className="text-hg-black">
                  {hasCartDiscount ? (
                    <>{Number(cartTotalWithDiscount).toFixed(2)}€</>
                  ) : (
                    <>{Number(cartTotalWithDiscount).toFixed(2)}€</>
                  )}
                </Text>
              )}
              <Text
                className={
                  hasProductsDiscount || hasCartDiscount
                    ? 'text-hg-black400 text-sm line-through'
                    : 'text-hg-black'
                }
              >
                {productsPriceTotal.toFixed(2)}€
              </Text>
            </Flex>
          </Flex>
          <Flex className="w-full gap-2">
            <Text className="text-hg-black400 text-sm"> </Text>
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
          </Flex>
        </Flex>
      </Flex>
      {showCartDiscount && (
        <Flex layout="col-left" className="bg-hg-black100 p-4 gap-2">
          <ProductDiscountForm isCheckout={true} productPrice={totalPrice} />
          {hasCartDiscount && (
            <Flex layout="row-left">
              {manualPrice > 0 && (
                <Flex
                  layout="row-left"
                  className="bg-hg-primary text-hg-tertiary rounded-full px-2 py-[2px] font-semibold mr-2"
                  onClick={() => applyCartDiscount(0, 'total')}
                >
                  <Text size="xs">total: {manualPrice}€</Text>
                  <SvgClose height={12} width={12} className="ml-1" />
                </Flex>
              )}
              {percentageDiscount > 0 && (
                <Flex
                  layout="row-left"
                  className="bg-hg-primary text-hg-tertiary rounded-full px-2 py-[2px] font-semibold mr-2"
                  onClick={() => applyCartDiscount(0, '%')}
                >
                  <Text size="xs">- {percentageDiscount}%</Text>
                  <SvgClose height={12} width={12} className="ml-1" />
                </Flex>
              )}
              {priceDiscount > 0 && (
                <Flex
                  layout="row-left"
                  className="bg-hg-primary text-hg-tertiary rounded-full px-2 py-[2px] font-semibold mr-2"
                  onClick={() => handleApplyDiscount()}
                >
                  <Text size="xs">- {priceDiscount}€</Text>
                  <SvgClose height={12} width={12} className="ml-1" />
                </Flex>
              )}
            </Flex>
          )}
        </Flex>
      )}
      <Flex className="justify-end w-full p-4 border-t border-hg-black items-baseline gap-2">
        {(hasProductsDiscount || hasCartDiscount) && (
          <Text className="text-hg-secondary text-xl font-semibold">
            {hasCartDiscount ? (
              <>{Number(cartTotalWithDiscount).toFixed(2)}€</>
            ) : (
              <>{Number(productsPriceTotalWithDiscounts).toFixed(2)}€</>
            )}
          </Text>
        )}
        <Text
          className={
            hasProductsDiscount || hasCartDiscount
              ? 'text-hg-black500 text-lg line-through'
              : 'text-xl text-hg-secondary font-semibold'
          }
        >
          {productsPriceTotal.toFixed(2)}€
        </Text>
      </Flex>
    </div>
  );
}
