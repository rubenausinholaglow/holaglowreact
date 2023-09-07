import { applyDiscountToCart } from '@utils/utils';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgClose } from 'icons/Icons';

import { useCartStore } from '../stores/userCartStore';
import CartItem from './CartItem';

export function Cart() {
  const cart = useCartStore(state => state.cart);

  return (
    <div className="bg-white w-full text-left py-6">
      <Container>
        <Flex layout="row-left">
          <Flex layout="col-left">
            <Text size="md" className="font-semibold text-hg-darkMalva mb-2">
              Productos seleccionados:
            </Text>
            <ul className="flex flex-col gap-1">
              {cart?.map(product => (
                <CartItem key={product.id} product={product} />
              ))}
            </ul>
          </Flex>
          <CartTotal />
          <Button type="primary" href="checkout">
            Continuar
          </Button>
        </Flex>
      </Container>
    </div>
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

  return (
    <Flex
      layout="col-left"
      className={`ml-auto text-hg-black ${isCheckout && 'w-full'}`}
    >
      <Flex layout={isCheckout ? 'col-left' : 'row-left'} className={`mr-4`}>
        {(hasProductsDiscount || hasCartDiscount) && (
          <Text size="xl" className="text-hg-black font-semibold mr-2">
            {hasCartDiscount ? (
              <>{cartTotalWithDiscount}€</>
            ) : (
              <>{Number(productsPriceTotalWithDiscounts).toFixed(2)}€</>
            )}
          </Text>
        )}
        <Text
          className={
            hasProductsDiscount || hasCartDiscount
              ? 'text-red-600 text-lg line-through opacity-50 font-semibold'
              : 'text-hg-black text-xl font-semibold'
          }
        >
          {productsPriceTotal.toFixed(2)}€
        </Text>
      </Flex>
      {hasCartDiscount && (
        <Flex layout="row-left" className="mt-2 mb-6">
          {manualPrice > 0 && (
            <Flex
              layout="row-left"
              className="bg-hg-lime text-hg-darkMalva rounded-full px-2 py-[2px] font-semibold mr-2"
              onClick={() => applyCartDiscount(0, 'total')}
            >
              <Text size="xs">total: {manualPrice}€</Text>
              <SvgClose height={12} width={12} className="ml-1" />
            </Flex>
          )}
          {percentageDiscount > 0 && (
            <Flex
              layout="row-left"
              className="bg-hg-lime text-hg-darkMalva rounded-full px-2 py-[2px] font-semibold mr-2"
              onClick={() => applyCartDiscount(0, '%')}
            >
              <Text size="xs">- {percentageDiscount}%</Text>
              <SvgClose height={12} width={12} className="ml-1" />
            </Flex>
          )}
          {priceDiscount > 0 && (
            <Flex
              layout="row-left"
              className="bg-hg-lime text-hg-darkMalva rounded-full px-2 py-[2px] font-semibold mr-2"
              onClick={() => applyCartDiscount(0, '€')}
            >
              <Text size="xs">- {priceDiscount}€</Text>
              <SvgClose height={12} width={12} className="ml-1" />
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
}
