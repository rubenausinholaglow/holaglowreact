'use client';

import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';
import { Title } from 'components/Texts';

import { CartTotal } from '../budgets/minicart/Cart';
import { useCartStore } from '../budgets/stores/userCartStore';
import ProductCard from '../budgets/treatments/ProductCard';

const Page = () => {
  const cart = useCartStore(state => state.cart);

  return (
    <Container>
      <Title size="2xl" className="text-left mb-4">
        Resumen
      </Title>

      <Flex layout="row-left" className="items-start">
        <ul className="w-3/4 shrink-0">
          {cart?.map(cartItem => (
            <li key={cartItem.uniqueId} className="mb-4">
              <ProductCard isCheckout product={cartItem} />
            </li>
          ))}
        </ul>
        <Flex layout="col-left" className="w-1/4 pl-8 shrink-0">
          <CartTotal isCheckout />
          <Button
            className="mt-8 w-full"
            size="lg"
            onClick={() => console.log(cart)}
          >
            Finalizar
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Page;
