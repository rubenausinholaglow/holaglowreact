'use client';
import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { Product } from '@interface/product';
import { budgetService } from '@services/BudgetService';
import { messageService } from '@services/MessageService';
import { ERROR_POST } from '@utils/textConstants';
import useRoutes from '@utils/useRoutes';
import CheckoutTotal from 'app/(dashboard)/dashboard/components/checkout/CheckoutTotal';
import ProductCard from 'app/(dashboard)/dashboard/components/checkout/ProductCard';
import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';
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
  const { setSelectedTreatments } = useSessionStore(state => state);

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
    setTreatments();
    const budget: Budget = {
      userId: user?.id || '',
      discountCode:
        user?.flowwwToken.substring(0, user?.flowwwToken.length - 32) || '',
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
      professionalId: storedClinicProfessionalId,
      products: cart.map(CartItem => ({
        productId: CartItem.id,
        price: Number(CartItem.price.toFixed(2)),
        percentageDiscount: CartItem.percentageDiscount / 100,
        priceDiscount: Number(CartItem.priceDiscount.toFixed(2)),
      })),
    };
    try {
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

  function setTreatments() {
    setSelectedTreatments([]);
    const validTypes = [1, 2, 5, 7];
    const productsInCart: Product[] = cart
      .filter(cartItem => validTypes.includes(cartItem.type))
      .map(cartItem => {
        const productInCart: Product = {
          id: cartItem.id,
          title: cartItem.title,
          description: cartItem.description,
          detail: cartItem.detail,
          price: cartItem.price,
          isPack: cartItem.isPack,
          zone: cartItem.zone,
          order: cartItem.order,
          upgrades: cartItem.upgrades,
          category: cartItem.category,
          appliedProducts: cartItem.appliedProducts,
          clinicDetail: cartItem.clinicDetail,
          cardBackgroundColor: cartItem.cardBackgroundColor,
          extraInformation: cartItem.extraInformation,
          preTreatmentInfo: cartItem.preTreatmentInfo,
          postTreatmentInfo: cartItem.postTreatmentInfo,
          packUnities: cartItem.packUnities,
          discounts: cartItem.discounts,
          tags: cartItem.tags,
          packMoreInformation: cartItem.packMoreInformation,
          relatedProducts: cartItem.relatedProducts,
          flowwwId: cartItem.flowwwId,
          durationMin: cartItem.durationMin,
          durationMax: cartItem.durationMax,
          beforeAndAfterImages: cartItem.beforeAndAfterImages,
          applicationTimeMinutes: cartItem.applicationTimeMinutes,
          type: cartItem.type,
          visibility: cartItem.visibility,
          sessions: cartItem.sessions,
          productCardImagePosition: cartItem.productCardImagePosition,
          longDescription: cartItem.longDescription,
          numProductCardPhotos: cartItem.numProductCardPhotos,
          videoUrl: cartItem.videoUrl,
          emlaType: cartItem.emlaType,
        };

        return productInCart;
      });

    setSelectedTreatments(productsInCart);
  }

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
              {cart?.map(cartItem => (
                <li key={cartItem.uniqueId}>
                  <ProductCard isCheckout product={cartItem} />
                </li>
              ))}
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
                href={`${ROUTES.dashboard.checkIn.agenda}?isCheckin=false`}
                type="tertiary"
              >
                <span className="font-semibold">Agendar Cita</span>
              </Button>
            </Flex>
          </div>
        </Flex>
      </MainLayout>
    </App>
  );
};

export default Page;
