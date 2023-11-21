'use client';
import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import CheckoutTotal from '@components/checkout/CheckoutTotal';
import ProductCard from '@components/checkout/ProductCard';
import { Budget, StatusBudget } from '@interface/budget';
import { budgetService } from '@services/BudgetService';
import { messageService } from '@services/MessageService';
import { ERROR_POST } from '@utils/textConstants';
import { applyDiscountToCart } from '@utils/utils';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';
import { SvgBag } from 'icons/IconsDs';

import { useCartStore } from '../budgets/stores/userCartStore';
import { PaymentModule } from './components/payment/Payments';

const Page = () => {
  const cart = useCartStore(state => state.cart);
  const totalPrice = useCartStore(state => state.totalPrice);
  const priceDiscount = useCartStore(state => state.priceDiscount);
  const percentageDiscount = useCartStore(state => state.percentageDiscount);
  const manualPrice = useCartStore(state => state.manualPrice);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentButtons, setShowPaymentButtons] = useState(true);
  const [showProductDiscount, setShowProductDiscount] = useState(false);
  const [clientToken, setClientToken] = useState<string | ''>('');
  const [budgetId, setBudgetId] = useState<string | ''>('');
  const [totalPriceToShow, setTotalPriceToShow] = useState<number>(0);
  const [isBudgetModified, setBudgetModified] = useState<boolean>(false);
  const [totalPriceInitial, setTotalPriceInitial] = useState<number>(0);
  const { storedBoxId, storedClinicId } = useGlobalPersistedStore(
    state => state
  );

  useEffect(() => {
    if (budgetId && totalPriceInitial != totalPriceToShow) {
      setBudgetModified(true);
    }
  }),
    [totalPriceInitial, totalPrice];

  useEffect(() => {
    const budgetId = localStorage.getItem('BudgetId');
    setClientToken(localStorage.getItem('flowwwToken') || '');
    setBudgetId(budgetId || '');
    if (budgetId && budgetId != '') setShowPaymentButtons(true);
  }, []);

  useEffect(() => {
    setTotalPriceToShow(cartTotalPrice());
  }, [cart, totalPrice, priceDiscount, percentageDiscount, manualPrice]);

  useEffect(() => {
    setBudgetId(localStorage.getItem('BudgetId') || '');
  }, [budgetId]);

  const handleFinalize = async () => {
    setTotalPriceInitial(totalPriceToShow);

    const GuidUser = localStorage.getItem('id') || '';
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
      clinicInfoId: storedClinicId,
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
      if (budgetId.length > 0) {
        setBudgetModified(false);
        setShowProductDiscount(false);
        budget.id = budgetId;
        await budgetService.updateBudget(budget);
      } else {
        const data = await budgetService.createBudget(budget);
        localStorage.setItem('BudgetId', data.id);
        setBudgetId(localStorage.getItem('BudgetId') || '');
      }
    } catch (error) {
      Bugsnag.notify(ERROR_POST + error);
    }
  };

  function cartTotalPrice() {
    let productsPriceTotalWithDiscounts = 0;

    if (cart) {
      productsPriceTotalWithDiscounts = cart.reduce(
        (acc, product) => acc + Number(product.priceWithDiscount),
        0
      );
    }

    const cartTotalWithDiscount = applyDiscountToCart(
      percentageDiscount,
      priceDiscount,
      manualPrice,
      productsPriceTotalWithDiscounts
    );
    return cartTotalWithDiscount;
  }

  return (
    <MainLayout isDashboard isCheckout>
      <Flex className="h-screen w-full">
        <div className="w-[55%] h-full p-4">
          {budgetId && !isBudgetModified && <PaymentModule />}
        </div>

        <div className="w-[45%] bg-white rounded-tl-2xl h-full">
          <Flex layout="col-left" className="p-4">
            <Flex className="gap-2">
              <SvgBag height={20} width={20} />
              Resumen del pedido
            </Flex>
          </Flex>
          <ul>
            {cart?.map(cartItem => (
              <li key={cartItem.uniqueId}>
                <ProductCard isCheckout product={cartItem} />
              </li>
            ))}
          </ul>

          <CheckoutTotal />

          <Flex layout="col-left" className="gap-4 mt-8 px-4">
            {(!budgetId || isBudgetModified || isLoading) && (
              <Button
                className="w-full"
                customStyles="bg-hg-primary"
                size="xl"
                type="tertiary"
                onClick={async () => {
                  setIsLoading(true);
                  await handleFinalize();
                  setIsLoading(false);
                  setShowPaymentButtons(!showPaymentButtons);
                  const message: any = {
                    clinicId: storedClinicId,
                    boxId: storedBoxId,
                    page: 'CheckOut',
                  };
                  messageService.goToPage(message);
                }}
              >
                {isLoading ? (
                  <SvgSpinner height={24} width={24} />
                ) : (
                  'Finalizar Presupuesto'
                )}
              </Button>
            )}

            <Button
              className="w-full"
              size="md"
              target="_blank"
              href={`https://agenda2.holaglow.com/schedule?mode=dashboard&token=${clientToken}`}
              type="tertiary"
            >
              <span className="font-semibold">Agendar Cita</span>
            </Button>
          </Flex>
        </div>
      </Flex>
    </MainLayout>
  );
};

export default Page;
