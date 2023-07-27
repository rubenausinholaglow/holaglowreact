import { Budget } from '@interface/budget';
import { budgetService } from '@services/BudgetService';
import { INITIAL_STATE } from '@utils/constants';
import { ERROR_POST } from '@utils/textConstants';
import { applyDiscountToCart } from '@utils/utils';
import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';
import { Text } from 'components/Texts';
import router from 'next/router';

import ProductDiscountForm from '../../checkout/components/ProductDiscountForm';
import { useCartStore } from '../stores/userCartStore';
import CartItem from './CartItem';

/* const handleFinalize = async => {
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
    router.push('/dashboard/checkout');
  } catch (error) {
    console.error(ERROR_POST, error);
  }
}; */

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

export function CartTotal({ isCheckout }: { isCheckout?: boolean }) {
  const cart = useCartStore(state => state.cart);
  const priceDiscount = useCartStore(state => state.priceDiscount);
  const percentageDiscount = useCartStore(state => state.percentageDiscount);

  let total = 0;
  if (cart) {
    total = cart.reduce((acc, product) => acc + product.priceWithDiscount, 0);
  }

  const priceWithDiscount = applyDiscountToCart(
    percentageDiscount,
    priceDiscount,
    Number(total.toFixed(2))
  );

  const hasDiscount = priceWithDiscount.toFixed(2) !== total.toFixed(2);

  return (
    <Flex layout="col-left" className="ml-auto text-hg-black w-full">
      <Flex layout="col-left" className={hasDiscount ? 'mb-2' : 'mb-8'}>
        <Text size="2xl" className="font-bold">
          Total:
        </Text>
        {hasDiscount && (
          <Text size="3xl" className="text-hg-black font-semibold">
            {priceWithDiscount.toFixed(2)}€
          </Text>
        )}
        <Text
          size={hasDiscount ? 'xl' : '3xl'}
          className={
            hasDiscount
              ? 'text-red-600 text-lg text line-through opacity-50 font-semibold'
              : 'text-hg-black font-semibold'
          }
        >
          {total.toFixed(2)}€
        </Text>
      </Flex>

      {hasDiscount && (
        <Flex layout="row-left" className="mb-6">
          {percentageDiscount !== '0' && (
            <Text
              className="bg-hg-lime text-hg-darkMalva rounded-full px-2 py-[2px] font-semibold mr-2"
              size="sm"
            >
              -{percentageDiscount}%
            </Text>
          )}
          {priceDiscount !== '0' && (
            <Text
              className="bg-hg-lime text-hg-darkMalva rounded-full px-2 py-[2px] font-semibold mr-2"
              size="sm"
            >
              -{priceDiscount}€
            </Text>
          )}
        </Flex>
      )}

      {isCheckout && <ProductDiscountForm isCheckout={true} />}
    </Flex>
  );
}
