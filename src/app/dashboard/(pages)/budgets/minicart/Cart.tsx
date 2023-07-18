import { useCartStore } from '../stores/userCartStore';
import CartItem from './CartItem';

function Cart() {
  const cart = useCartStore(state => state.cart);

  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.price * (product.quantity as number),
      0
    );
  }

  console.log(cart);

  return (
    <section>
      <h3 className="text-black text-2xl font-bold mb-4">Compra:</h3>
      <ul>
        {cart?.map(product => <CartItem key={product.id} product={product} />)}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <span className="text-black text-lg font-bold">Total:</span>
        <span className="text-black text-xl font-bold">
          ${total.toFixed(2)}
        </span>
      </div>
    </section>
  );
}

export default Cart;
