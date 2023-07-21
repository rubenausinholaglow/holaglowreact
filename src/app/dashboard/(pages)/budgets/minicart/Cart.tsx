import { useEffect, useState } from 'react';
import { Budget } from '@interface/budget';
import { budgetService } from '@services/BudgetService';
import { INITIAL_STATE } from '@utils/constants';
import { ERROR_POST } from '@utils/textConstants';
import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';

import { useCartStore } from '../stores/userCartStore';
import CartItem from './CartItem';

function Cart() {
  const cart = useCartStore(state => state.cart);
  const [GuidUser, SetGuidUser] = useState('');
  const [GuidClinic, SetGuidClinic] = useState('');
  const [GuidProfessional, SetGuidProfessional] = useState('');

  useEffect(() => {
    SetGuidUser(localStorage.getItem('id') || '');
    SetGuidClinic(localStorage.getItem('ClinicId') || '');
    SetGuidProfessional(localStorage.getItem('ClinicProfessionalId') || '');
  }, []);

  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.price * (product.quantity as number),
      0
    );
  }

  const handleFinalize = async () => {
    const budget: Budget = {
      userId: GuidUser,
      discountCode: '',
      priceDiscount: '0',
      percentageDiscount: '0',
      totalPrice: total,
      clinicInfoId: GuidClinic,
      referenceId: '',
      statusBudget: 0,
      professionalId: GuidProfessional,
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
      console.error(ERROR_POST, error);
    }
  };

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
          <Flex layout="col-center" className="ml-auto text-hg-black">
            <span className=" text-lg font-bold">Total: </span>
            <span className=" text-xl font-bold">{total.toFixed(2)}€</span>
            <div>
              <Button style="primary" onClick={handleFinalize}>
                Finalizar
              </Button>
            </div>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
}

export default Cart;
