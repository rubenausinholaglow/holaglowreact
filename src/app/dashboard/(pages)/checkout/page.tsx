'use client';

import { useState } from 'react';
import { Budget } from '@interface/budget';
import { budgetService } from '@services/BudgetService';
import { INITIAL_STATE } from '@utils/constants';
import { ERROR_POST } from '@utils/textConstants';
import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';
import { Text } from 'components/Texts';
import { SvgAlma, SvgAngleDown, SvgPepper } from 'icons/Icons';
import router from 'next/router';
import CheckHydration from 'utils/CheckHydration';

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
      await budgetService.createBudget(budget);
      useCartStore.setState(INITIAL_STATE);
      router.push('/dashboard/menu');
    } catch (error) {
      console.error(ERROR_POST, error);
    }
  };

  return (
    <CheckHydration>
      <Container>
        <Text size="xl" className="text-left font-semibold mb-4">
          Resumen
        </Text>

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
                <Button
                  style="tertiary"
                  href="https://dashboard.getalma.eu/login"
                  className="border-[#FA5022]"
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
                {showProductDiscount && (
                  <ProductDiscountForm isCheckout={true} className="mt-4" />
                )}
                <Flex layout="col-left" className="gap-2 w-full mt-8">
                  <Button
                    className="w-full"
                    size="md"
                    onClick={() => {
                      handleFinalize();
                      setShowPaymentButtons(!showPaymentButtons);
                    }}
                  >
                    <span className="font-semibold">Finalizar</span>
                  </Button>
                  <Button
                    className="w-full"
                    size="md"
                    href="https://agenda.holaglow.com/schedule?mode=dashboard"
                    style="tertiary"
                  >
                    <span className="font-semibold">Agendar Cita</span>
                  </Button>
                </Flex>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </CheckHydration>
  );
};

export default Page;
