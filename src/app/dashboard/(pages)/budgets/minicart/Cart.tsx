import { useEffect, useState } from 'react';
import { applyDiscountToCart } from '@utils/utils';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgClose } from 'icons/Icons';
import { SvgCart } from 'icons/IconsDs';
import { Crafty_Girls } from 'next/font/google';

import { useCartStore } from '../stores/userCartStore';
import ProductCard from '../treatments/ProductCard';
import CartItem from './CartItem';

export function Cart() {
  const {
    cart,
    priceDiscount,
    percentageDiscount,
    manualPrice,
    applyCartDiscount,
  } = useCartStore(state => state);

  const [showCart, setShowCart] = useState(false);

  let productsPriceTotal = 0;

  if (cart) {
    productsPriceTotal = cart.reduce((acc, product) => acc + product.price, 0);
  }

  let productsPriceTotalWithDiscounts = 0;

  if (cart) {
    productsPriceTotalWithDiscounts = cart.reduce(
      (acc, product) => acc + Number(product.priceWithDiscount),
      0
    );
  }

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

  useEffect(() => {
    if (!showCart && cart.length > 0) {
      setShowCart(true);
    }
  }, [cart.length]);

  return (
    <Flex className="w-1/2 justify-end relative p-4">
      <Flex className="gap-2">
        <Text className="text-lg font-semibold">
          Total: {productsPriceTotal.toFixed(2)} €
        </Text>
        <SvgCart
          height={32}
          width={32}
          className="p-2 bg-white text-hg-black rounded-full"
          onClick={() => setShowCart(!showCart)}
        />
      </Flex>

      <Flex
        layout="col-left"
        className={`transition-all absolute right-0 bottom-0 bg-white p-4`}
      >
        <ul className="flex flex-col gap-1">
          {cart?.map(cartItem => (
            <li key={cartItem.uniqueId} className="mb-4">
              <ProductCard isCheckout product={cartItem} />
            </li>
          ))}
        </ul>
      </Flex>
    </Flex>
  );
}

export function CartTotal({ isCheckout }: { isCheckout?: boolean }) {
  const cart = useCartStore(state => state.cart);
  const priceDiscount = useCartStore(state => state.priceDiscount);
  const percentageDiscount = useCartStore(state => state.percentageDiscount);
  const manualPrice = useCartStore(state => state.manualPrice);
  const applyCartDiscount = useCartStore(state => state.applyCartDiscount);

  let productsPriceTotal = 0;
  if (cart) {
    productsPriceTotal = cart.reduce((acc, product) => acc + product.price, 0);
  }

  let productsPriceTotalWithDiscounts = 0;

  if (cart) {
    productsPriceTotalWithDiscounts = cart.reduce(
      (acc, product) => acc + Number(product.priceWithDiscount),
      0
    );
  }

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

  return <Flex className="gap-2">{}</Flex>;
}
