'use client';
import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { budgetService } from '@services/BudgetService';
import { messageService } from '@services/MessageService';
import { ERROR_POST } from '@utils/textConstants';
import useRoutes from '@utils/useRoutes';
import CheckoutTotal from 'app/(dashboard)/dashboard/components/checkout/CheckoutTotal';
import ProductCard from 'app/(dashboard)/dashboard/components/checkout/ProductCard';
import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { usePromoUser } from 'app/hooks/usePromoUser';
import { SvgSpinner } from 'app/icons/Icons';
import { SvgBag } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Budget, StatusBudget } from 'app/types/budget';
import { applyDiscountToCart } from 'app/utils/utils';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

import { useCartStore } from '../budgets/stores/userCartStore';
import PepperWidget from './components/payment/paymentMethods/PepperWidget';
import { PaymentModule } from './components/payment/Payments';

const Page = () => {
  const ROUTES = useRoutes();
  const cart = useCartStore(state => state.cart);
  const totalPrice = useCartStore(state => state.totalPrice);
  const priceDiscount = useCartStore(state => state.priceDiscount);
  const percentageDiscount = useCartStore(state => state.percentageDiscount);
  const manualPrice = useCartStore(state => state.manualPrice);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAgenda, setIsLoadingAgenda] = useState(false);
  const [showPaymentButtons, setShowPaymentButtons] = useState(true);
  const [totalPriceToShow, setTotalPriceToShow] = useState<number>(0);
  const [isBudgetModified, setBudgetModified] = useState<boolean>(false);
  const [totalPriceInitial, setTotalPriceInitial] = useState<number>(0);
  const {
    storedClinicId,
    user,
    storedBudgetId,
    setBudgetId,
    storedClinicProfessionalId,
  } = useGlobalPersistedStore(state => state);
  const router = useRouter();
  const { setTreatmentPacks } = useSessionStore(state => state);

  const { fetchWalletBalance, promoCode } = usePromoUser();

  useEffect(() => {
    if (storedBudgetId && totalPriceInitial != totalPriceToShow) {
      setBudgetModified(true);
    }
  }),
    [totalPriceInitial, totalPrice];

  useEffect(() => {
    if (storedBudgetId && storedBudgetId != '') setShowPaymentButtons(true);
  }, []);

  useEffect(() => {
    setTotalPriceToShow(cartTotalPrice());
  }, [cart, totalPrice, priceDiscount, percentageDiscount, manualPrice]);

  const handleFinalize = async () => {
    setTotalPriceInitial(totalPriceToShow);

    const budget: Budget = {
      userId: user?.id || '',
      discountCode:
        user?.flowwwToken.substring(0, user?.flowwwToken.length - 32) || '',
      discountAmount: '',
      FlowwwId: '',
      priceDiscount: Number(priceDiscount > 0 ? priceDiscount.toFixed(2) : 0),
      percentageDiscount: percentageDiscount / 100,
      manualPrice: Number(manualPrice) > 0 ? Number(manualPrice.toFixed(2)) : 0,
      totalPrice: Number(totalPrice.toFixed(2)),
      totalPriceWithIva: Number(totalPrice.toFixed(2)),
      clinicInfoId: storedClinicId,
      referenceId: '',
      statusBudget: StatusBudget.Open,
      professionalId: storedClinicProfessionalId,
      products: cart.map(CartItem => ({
        productId: CartItem.id,
        price: Number(CartItem.price.toFixed(2)),
        percentageDiscount: CartItem.percentageDiscount / 100,
        priceDiscount: Number(CartItem.priceDiscount.toFixed(2)),
      })),
    };
    try {
      // if (promoCode == undefined) {
      fetchWalletBalance(user!.id);
      // }
      if (storedBudgetId.length > 0) {
        setBudgetModified(false);
        budget.id = storedBudgetId;
        await budgetService.updateBudget(budget);
      } else {
        const data = await budgetService.createBudget(budget);
        setBudgetId(data.id);
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

  const validProducts = [
    '6FA3561B-2650-4E00-8ED3-852E95A38A0B',
    '62403DAD-846F-46CF-B4CC-7DAE946E028E',
  ];

  const isValidProduct = (productId: string) => {
    return validProducts.includes(productId);
  };

  // Maintain a set to track which products have had their discount shown
  const shownDiscounts = new Set<string>();

  return (
    <App>
      <MainLayout isDashboard isCheckout>
        <Flex className="w-full">
          <div className="w-[55%] h-full p-4">
            {storedBudgetId && !isBudgetModified && !isLoading && (
              <PaymentModule />
            )}
            {!(storedBudgetId && !isBudgetModified && !isLoading) && (
              <PepperWidget
                totalPrice={Number(cartTotalPrice())}
              ></PepperWidget>
            )}
          </div>

          <div className="w-[45%] bg-white rounded-l-2xl h-full">
            <Flex layout="col-left" className="p-4">
              <Flex className="gap-2">
                <SvgBag height={20} width={20} />
                Resumen del pedido
              </Flex>
            </Flex>
            <ul>
              {cart?.map(cartItem => {
                // Check if the product is valid
                const isValid = isValidProduct(cartItem.id.toLocaleUpperCase());

                // Determine if the discount should be shown
                const showDiscount =
                  isValid &&
                  !shownDiscounts.has(cartItem.id.toLocaleUpperCase());

                // If valid and not shown yet, add to the set so it won't be shown again
                if (
                  isValid &&
                  !shownDiscounts.has(cartItem.id.toLocaleUpperCase())
                ) {
                  shownDiscounts.add(cartItem.id.toLocaleUpperCase());
                }

                return (
                  <li key={cartItem.uniqueId}>
                    <ProductCard
                      isCheckout
                      product={cartItem}
                      showDiscount={showDiscount}
                    />
                  </li>
                );
              })}
            </ul>

            <CheckoutTotal />

            <Flex layout="col-left" className="gap-4 my-8 px-4">
              {(!storedBudgetId || isBudgetModified || isLoading) && (
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
                      userId: user?.id,
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
                type="white"
                href=""
                onClick={e => {
                  setTreatmentPacks([]);
                  setIsLoadingAgenda(true);
                  router.push(ROUTES.dashboard.schedule);
                }}
              >
                <span className="font-semibold">Agendar Cita</span>
                {isLoadingAgenda && <SvgSpinner height={24} width={24} />}
              </Button>
              <Button
                className="w-full"
                size="md"
                href={`${ROUTES.dashboard.menu}`}
                type="white"
              >
                <span className="font-semibold">Menú</span>
              </Button>
            </Flex>
          </div>
        </Flex>
      </MainLayout>
    </App>
  );
};

export default Page;
