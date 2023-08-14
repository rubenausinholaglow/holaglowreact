'use client';

import { useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { Budget } from '@interface/budget';
import { budgetService } from '@services/BudgetService';
import { ERROR_POST } from '@utils/textConstants';
import { PaymentModule } from 'app/dashboard/(pages)/checkout/components/payment/Payments';
import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';
import { Title } from 'components/Texts';
import { SvgAngleDown, SvgSpinner } from 'icons/Icons';

import { CartTotal } from '../budgets/minicart/Cart';
import { useCartStore } from '../budgets/stores/userCartStore';
import ProductCard from '../budgets/treatments/ProductCard';
import ProductDiscountForm from './components/ProductDiscountForm';

const Page = () => {
  const cart = useCartStore(state => state.cart);
  const totalPrice = useCartStore(state => state.totalPrice);
  const priceDiscount = useCartStore(state => state.priceDiscount);
  const percentageDiscount = useCartStore(state => state.percentageDiscount);
  const manualPrice = useCartStore(state => state.manualPrice);
  const [isLoading, setIsLoading] = useState(false);

  const [showPaymentButtons, setShowPaymentButtons] = useState(false);
  const [showProductDiscount, setShowProductDiscount] = useState(false);

  const handleFinalize = async () => {
    const GuidUser = localStorage.getItem('id') || '';
    const GuidClinicId = localStorage.getItem('ClinicId') || '';
    const GuidProfessional = localStorage.getItem('ClinicProfessionalId') || '';

    const budget: Budget = {
      userId: GuidUser,
      discountCode: '',
      priceDiscount: priceDiscount,
      percentageDiscount: percentageDiscount,
      manualPrice: manualPrice,
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
      const data = await budgetService.createBudget(budget);
      localStorage.setItem('BudgetId', data.id);
    } catch (error) {
      Bugsnag.notify(ERROR_POST + error);
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
        <Flex layout="col-left" className="w-1/4 pl-8 shrink-0 relative">
          {!showPaymentButtons && (
            <SvgAngleDown
              height={20}
              width={20}
              fill="white"
              className={`transition-transform bg-slate-400 rounded-full mr-2 absolute top-2 right-2 cursor-pointer ${
                showProductDiscount ? 'rotate-180' : 'rotate-0'
              }`}
              onClick={() => setShowProductDiscount(!showProductDiscount)}
            />
          )}
          <CartTotal isCheckout />
          {showPaymentButtons ? (
            <Flex layout="col-left" className="gap-2 w-full mt-4">
              <PaymentModule></PaymentModule>
            </Flex>
          ) : (
            <>
              {showProductDiscount && (
                <ProductDiscountForm isCheckout={true} className="mt-4" />
              )}
              <Flex layout="col-left" className="gap-2 w-full mt-8">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={async () => {
                    setIsLoading(true);
                    if (!localStorage.getItem('BudgetId') || '') {
                      await handleFinalize();
                    }
                    setIsLoading(false);
                    setShowPaymentButtons(!showPaymentButtons);
                  }}
                >
                  {isLoading ? (
                    <SvgSpinner height={24} width={24} />
                  ) : (
                    'Finalizar'
                  )}
                </Button>
                <Button
                  className="w-full"
                  size="lg"
                  href="https://agenda.holaglow.com/schedule?mode=dashboard"
                  style="tertiary"
                >
                  Agendar Cita
                </Button>
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Page;
