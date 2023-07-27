import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';

import { useCartStore } from '../stores/userCartStore';
import CartItem from './CartItem';

export function Cart() {
  const cart = useCartStore(state => state.cart);

  console.log(cart);

  return (
    <div className="bg-white w-full text-left p-4">
      <Container>
        <Flex layout="row-left">
          <Flex layout="col-left">
            <p className="mb-2 text-hg-darkMalva">Productos seleccionados:</p>
            <ul>
              {cart?.map(product => (
                <CartItem key={product.id} product={product} />
              ))}
            </ul>
          </Flex>
          <CartTotal />
          <Button style="primary" href="checkout">
            Finalizar
          </Button>
        </Flex>
      </Container>
    </div>
  );
}

export function CartTotal() {
  const cart = useCartStore(state => state.cart);

  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) =>
        acc + product.priceWithDiscount * (product.quantity as number),
      0
    );
  }

  console.log(cart);

  return (
    <Flex layout="col-center" className="ml-auto text-hg-black">
      <span className=" text-lg font-bold">Total: </span>
      <span className=" text-xl font-bold">{total.toFixed(2)}€</span>
    </Flex>
  );
}
