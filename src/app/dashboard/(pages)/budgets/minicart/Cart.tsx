import { Budget } from '@interface/budget';
import { budgetService } from '@services/BudgetService';
import { INITIAL_STATE } from '@utils/constants';

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

  const handleFinalize = async () => {
    const budget: Budget = {
      userId: '9CE855BB-319C-4EC1-4CA5-08DB5B93470C',
      discountCode: '',
      priceDiscount: '0',
      percentageDiscount: '0',
      totalPrice: total,
      clinicInfoId: 'A1C0941E-5DC2-4433-9B03-2E5A9857F2C5',
      referenceId: '12353',
      statusBudget: 0,
      products: cart.map(CartItem => ({
        productId: CartItem.id,
        price: CartItem.price,
        quantity: CartItem.quantity ?? 0,
        percentageDiscount: CartItem.percentageDiscount,
        priceDiscount: CartItem.priceDiscount,
      })),
    };

    try {
      await budgetService.createBudget(budget);
      useCartStore.setState(INITIAL_STATE);
    } catch (error) {
      console.error('Error al enviar la solicitud POST:', error);
    }
  };

  return (
    <section>
      <h3 className="text-black text-2xl font-bold mb-4">Compra:</h3>
      <ul>
        {cart?.map(product => <CartItem key={product.id} product={product} />)}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <span className="text-black text-lg font-bold">Total: </span>
        <span className="text-black text-xl font-bold">
          {total.toFixed(2)}€
        </span>
      </div>
      <div>
        <button
          onClick={handleFinalize}
          className="text-white bg-blue-500 px-4 py-2 rounded mt-2"
        >
          Finalizar
        </button>
      </div>
    </section>
  );
}

export default Cart;
