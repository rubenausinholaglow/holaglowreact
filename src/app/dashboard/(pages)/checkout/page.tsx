'use client';

import { useState } from 'react';
import { Budget } from '@interface/budget';
import { budgetService } from '@services/BudgetService';
import { INITIAL_STATE } from '@utils/constants';
import { ERROR_POST } from '@utils/textConstants';
import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';
import { Title } from 'components/Texts';
import { SvgAlma, SvgPepper } from 'icons/Icons';
import router from 'next/router';

import { CartTotal } from '../budgets/minicart/Cart';
import { useCartStore } from '../budgets/stores/userCartStore';
import ProductCard from '../budgets/treatments/ProductCard';
import ProductDiscountForm from './components/ProductDiscountForm';

const Page = () => {
  const cart = useCartStore(state => state.cart);
  const totalPrice = useCartStore(state => state.totalPrice);
  const priceDiscount = useCartStore(state => state.priceDiscount);
  const percentageDiscount = useCartStore(state => state.percentageDiscount);

  const [showPaymentButtons, setShowPaymentButtons] = useState(false);

  const handleFinalize = async () => {
    const GuidUser = localStorage.getItem('id') || '';
    const GuidClinicId = localStorage.getItem('ClinicId') || '';
    const GuidProfessional = localStorage.getItem('ClinicProfessionalId') || '';

    const budget: Budget = {
      userId: GuidUser,
      discountCode: '',
      priceDiscount: priceDiscount,
      percentageDiscount: percentageDiscount,
      totalPrice: totalPrice,
      clinicInfoId: GuidClinicId,
      referenceId: '',
      statusBudget: 0,
      professionalId: GuidProfessional,
      products: cart.map(CartItem => ({
        productId: CartItem.id,
        price: CartItem.price,
        percentageDiscount: CartItem.percentageDiscount,
        priceDiscount: CartItem.priceDiscount,
      })),
    };
    try {
      await budgetService.createBudget(budget);
      useCartStore.setState(INITIAL_STATE);
      router.push('/dashboard/menu');
    } catch (error) {
      console.error(ERROR_POST, error);
    }
  };

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
          {showPaymentButtons ? (
            <Flex layout="col-center" className="gap-2 w-full">
              <Button
                style="tertiary"
                href="https://dashboard.getalma.eu/login"
                className="border-[#FA5022] w-full"
                target="_blank"
              >
                <SvgAlma height={25} width={75} fill="#FA5022" />
              </Button>
              <Button
                style="primary"
                href="https://www.pepperspain.com/pepper/Page.aspx?__IDAPPLGN=3470"
                className="bg-[#FF3333] border-[#FF3333]"
                target="_blank"
              >
                <SvgPepper height={24} width={88} fill="#ffffff" />
              </Button>
            </Flex>
          ) : (
            <>
              <ProductDiscountForm isCheckout={true} />
              <Button
                className="mt-8 w-full"
                size="lg"
                onClick={() => setShowPaymentButtons(!showPaymentButtons)}
              >
                Finalizar
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Page;
