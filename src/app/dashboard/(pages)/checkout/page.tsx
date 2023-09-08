'use client';

import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { Budget, StatusBudget } from '@interface/budget';
import { INITIAL_STATE_PAYMENT } from '@interface/paymentList';
import { budgetService } from '@services/BudgetService';
import { INITIAL_STATE } from '@utils/constants';
import { ERROR_POST } from '@utils/textConstants';
import { PaymentModule } from 'app/dashboard/(pages)/checkout/components/payment/Payments';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';
import { SvgAngleDown, SvgSpinner } from 'icons/Icons';
import { useRouter } from 'next/navigation';
import CheckHydration from 'utils/CheckHydration';

import { CartTotal } from '../budgets/minicart/Cart';
import { useCartStore } from '../budgets/stores/userCartStore';
import ProductCard from '../budgets/treatments/ProductCard';
import { usePaymentList } from './components/payment/payments/usePaymentList';
import ProductDiscountForm from './components/ProductDiscountForm';

const Page = () => {
  const cart = useCartStore(state => state.cart);
  const totalPrice = useCartStore(state => state.totalPrice);
  const priceDiscount = useCartStore(state => state.priceDiscount);
  const percentageDiscount = useCartStore(state => state.percentageDiscount);
  const manualPrice = useCartStore(state => state.manualPrice);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showPaymentButtons, setShowPaymentButtons] = useState(false);
  const [showProductDiscount, setShowProductDiscount] = useState(false);
  const [clientToken, setClientToken] = useState<string | ''>('');
  const [budgetId, setBudgetId] = useState<string | ''>('');

  useEffect(() => {
    const budgetId = localStorage.getItem('BudgetId');
    setClientToken(localStorage.getItem('flowwwToken') || '');
    setBudgetId(budgetId || '');
    if (budgetId && budgetId != '') setShowPaymentButtons(true);
  }, []);

  useEffect(() => {
    setBudgetId(localStorage.getItem('BudgetId') || '');
  }, [budgetId]);

  const handleFinalize = async () => {
    const GuidUser = localStorage.getItem('id') || '';
    const GuidClinicId = localStorage.getItem('ClinicId') || '';
    const GuidProfessional = localStorage.getItem('ClinicProfessionalId') || '';

    const budget: Budget = {
      userId: GuidUser,
      discountCode: clientToken.substring(0, clientToken.length - 32),
      discountAmount: '',
      FlowwwId: '',
      priceDiscount: Number(priceDiscount.toFixed(2)),
      percentageDiscount: percentageDiscount / 100,
      manualPrice: Number(manualPrice.toFixed(2)),
      totalPrice: Number(totalPrice.toFixed(2)),
      totalPriceWithIva: Number(totalPrice.toFixed(2)),
      clinicInfoId: GuidClinicId,
      referenceId: '',
      statusBudget: StatusBudget.Open,
      professionalId: GuidProfessional,
      products: cart.map(CartItem => ({
        productId: CartItem.id,
        price: Number(CartItem.price.toFixed(2)),
        percentageDiscount: CartItem.percentageDiscount / 100,
        priceDiscount: Number(CartItem.priceDiscount.toFixed(2)),
      })),
    };

    try {
      const data = await budgetService.createBudget(budget);
      localStorage.setItem('BudgetId', data.id);
      setBudgetId(localStorage.getItem('BudgetId') || '');
    } catch (error) {
      Bugsnag.notify(ERROR_POST + error);
    }
  };

  function cancelBudget() {
    localStorage.removeItem('BudgetId');
    usePaymentList.setState(INITIAL_STATE_PAYMENT);
    useCartStore.setState(INITIAL_STATE);
    router.push('/dashboard/menu');
  }
  return (
    <CheckHydration>
      <Container>
        <Title size="2xl" className="text-left mb-4">
          Resumen
        </Title>

        <Flex layout="row-left" className="items-start">
          <ul className="w-2/3 shrink-0">
            {cart?.map(cartItem => (
              <li key={cartItem.uniqueId} className="mb-4">
                <ProductCard isCheckout product={cartItem} budget={budgetId} />
              </li>
            ))}
          </ul>
          <Flex layout="col-left" className="w-1/3 pl-8 shrink-0 relative">
            {!showPaymentButtons && !budgetId && (
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
                  <ProductDiscountForm
                    isCheckout={true}
                    className="mt-4"
                    productPrice={totalPrice}
                  />
                )}
                <Flex layout="col-left" className="gap-2 w-full mt-8">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={async () => {
                      setIsLoading(true);
                      await handleFinalize();
                      setIsLoading(false);
                      setShowPaymentButtons(!showPaymentButtons);
                    }}
                  >
                    {isLoading ? (
                      <SvgSpinner height={24} width={24} />
                    ) : (
                      'Finalizar Presupuesto'
                    )}
                  </Button>
                </Flex>
              </>
            )}
            <Flex layout="col-left" className="gap-2 w-full mt-8">
              <Button
                className="w-full"
                size="lg"
                target="_blank"
                href={`https://agenda.holaglow.com/schedule?mode=dashboard&token=${clientToken}`}
                type="tertiary"
              >
                <span className="font-semibold">Agendar Cita</span>
              </Button>
              <Button size="xl" className="w-full mt-4" onClick={cancelBudget}>
                {!budgetId ? 'Cancelar Presupuesto' : 'Volver al dashboard'}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </CheckHydration>
  );
};

export default Page;
