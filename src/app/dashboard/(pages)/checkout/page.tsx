'use client';

import { ChangeEvent, useState } from 'react';
import { AlmaPayment } from '@components/Alma';
import { Budget } from '@interface/budget';
import { budgetService } from '@services/BudgetService';
import { INITIAL_STATE } from '@utils/constants';
import { ERROR_POST } from '@utils/textConstants';
import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';
import { Title } from 'components/Texts';
import { SvgAlma, SvgAngleDown, SvgPepper } from 'icons/Icons';
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
  const manualPrice = useCartStore(state => state.manualPrice);
  const [inputValue, setInputValue] = useState('');

  const [showPaymentButtons, setShowPaymentButtons] = useState(false);
  const [showProductDiscount, setShowProductDiscount] = useState(false);

  const [showAlma, setShowAlma] = useState(false);

  let productsPriceTotal = 0;
  if (cart) {
    productsPriceTotal = cart.reduce((acc, product) => acc + product.price, 0);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      value === '' ||
      (/^\d+(\.\d{0,2})?$/.test(value) &&
        parseFloat(value) <= productsPriceTotal)
    ) {
      setInputValue(value);
    }
  };

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
      await budgetService.createBudget(budget);
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
            <></>
          ) : (
            <>
              {showProductDiscount && (
                <ProductDiscountForm isCheckout={true} className="mt-4" />
              )}
              <Flex layout="col-left" className="gap-2 w-full mt-8">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    handleFinalize();
                    setShowPaymentButtons(!showPaymentButtons);
                  }}
                >
                  Finalizar
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
