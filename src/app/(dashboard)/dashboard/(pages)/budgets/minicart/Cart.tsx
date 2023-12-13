import { useEffect, useState } from 'react';
import ProductCard from 'app/(dashboard)/dashboard/components/checkout/ProductCard';
import { applyDiscountToCart } from 'app/(dashboard)/dashboard/utils/utils';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgCart } from 'icons/IconsDs';

import { useCartStore } from '../stores/userCartStore';

export function Cart() {
  const ROUTES = useRoutes();

  const { cart, priceDiscount, percentageDiscount, manualPrice } = useCartStore(
    state => state
  );

  const [showCart, setShowCart] = useState(cart.length > 0);

  let productsPriceTotal = 0;
  let productsPriceTotalWithDiscounts = 0;

  if (cart) {
    productsPriceTotal = cart.reduce((acc, product) => acc + product.price, 0);
    productsPriceTotalWithDiscounts = cart.reduce(
      (acc, product) => acc + Number(product.priceWithDiscount),
      0
    );
  }

  const cartTotalWithDiscount = applyDiscountToCart(
    percentageDiscount,
    priceDiscount,
    manualPrice,
    productsPriceTotalWithDiscounts
  );

  useEffect(() => {
    if (cart.length === 0) {
      setShowCart(false);
    } else {
      setShowCart(true);
    }
  }, [cart.length]);

  return (
    <Flex className="w-1/2 justify-end relative p-4 z-10">
      <Flex
        layout="col-left"
        className={`transition-all absolute right-0 bottom-0 left-0 bg-white pb-16 rounded-tl-2xl shadow-centered-black ${
          showCart && cart.length > 0 ? 'translate-y-0' : 'translate-y-[105%]'
        }`}
      >
        <ul className="flex flex-col w-full ">
          {cart?.map(cartItem => (
            <li key={cartItem.uniqueId}>
              <ProductCard product={cartItem} />
            </li>
          ))}
        </ul>
        <Flex className="w-full p-4 justify-between">
          <Button type="tertiary" size="sm" onClick={() => setShowCart(false)}>
            Cerrar
          </Button>
          <Button
            type="tertiary"
            customStyles="bg-hg-primary"
            size="sm"
            href={ROUTES.dashboard.checkOut}
          >
            Continuar compra
          </Button>
        </Flex>
      </Flex>
      <Flex className="gap-2 z-10">
        <Text className="text-xl font-semibold">
          {cartTotalWithDiscount.toFixed(2)} €
        </Text>
        <Text className="text-lg line-through text-hg-black500">
          {productsPriceTotal.toFixed(2) !==
            cartTotalWithDiscount.toFixed(2) && (
            <>{productsPriceTotal.toFixed(2)}€</>
          )}
        </Text>

        <SvgCart
          height={32}
          width={32}
          className={`p-2 text-hg-black rounded-full cursor-pointer ${
            showCart ? 'bg-hg-black100' : 'bg-white'
          }`}
          onClick={() => setShowCart(!showCart)}
        />
      </Flex>
    </Flex>
  );
}
