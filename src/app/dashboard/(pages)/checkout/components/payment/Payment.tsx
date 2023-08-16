'use client';
import { useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { TicketBudget } from '@interface/budget';
import { INITIAL_STATE_PAYMENT } from '@interface/paymentList';
import { Ticket } from '@interface/ticket';
import { budgetService } from '@services/BudgetService';
import { INITIAL_STATE } from '@utils/constants';
import { applyDiscountToCart } from '@utils/utils';
import { useCartStore } from 'app/dashboard/(pages)/budgets/stores/userCartStore';
import { Button } from 'components/Buttons/Buttons';
import { SvgSpinner } from 'icons/Icons';
import { useRouter } from 'next/navigation';

import PaymentItem from './PaymentItem';
import PaymentClient from './paymentMethods/PaymentClient';
import { paymentItems } from './paymentMethods/PaymentItems';
import { usePaymentList } from './payments/usePaymentList';

export const PaymentModule = () => {
  const [activePaymentMethod, setActivePaymentMethod] = useState('');
  const [onLoad, setOnLoad] = useState(false);
  const cart = useCartStore(state => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const paymentList = usePaymentList(state => state.paymentRequest);
  const totalPrice = useCartStore(state => state.totalPrice);
  const totalAmount = usePaymentList(state => state.totalAmount);

  const priceDiscount = useCartStore(state => state.priceDiscount);
  const percentageDiscount = useCartStore(state => state.percentageDiscount);
  const manualPrice = useCartStore(state => state.manualPrice);

  let productsPriceTotal = 0;
  if (cart) {
    productsPriceTotal = cart.reduce((acc, product) => acc + product.price, 0);
  }

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
  const missingAmount = cartTotalWithDiscount - totalAmount;
  const missingAmountFormatted = missingAmount.toFixed(2);

  const sendTicket = async () => {
    const GuidUser = localStorage.getItem('id') || '';
    const GuidClinicId = localStorage.getItem('ClinicId') || '';
    const GuidProfessional = localStorage.getItem('ClinicProfessionalId') || '';
    const BudgetId = localStorage.getItem('BudgetId') || '';
    const ClinicFlowwwId = localStorage.getItem('ClinicFlowwwId') || '';
    const ClientFlowToken = localStorage.getItem('flowwwToken') || '';

    const finalBudget: TicketBudget = {
      id: BudgetId,
      DiscountAmount: '',
      userId: GuidUser,
      discountCode: '',
      priceDiscount: 0,
      percentageDiscount: 0,
      manualPrice: 0,
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
        name: CartItem.description,
      })),
    };

    const ticket: Ticket = {
      promoCode: '',
      reference: '',
      userId: GuidUser,
      clientFlowwwToken: ClientFlowToken,
      clinicFlowwwId: '3',
      professional: '',
      budget: finalBudget,
      paymentProductRequest: paymentList.map(payItem => ({
        amount: payItem.amount,
        bank: payItem.bank,
        method: payItem.method,
        paymentReference: payItem.paymentReference,
        id: payItem.id,
      })),
    };
    try {
      return await budgetService.createTicket(ticket);
    } catch (error: any) {
      Bugsnag.notify(error);
    }
  };

  const handleOnButtonPaymentClick = (paymentKey: any) => {
    setOnLoad(true);
    if (activePaymentMethod === paymentKey) {
      setOnLoad(false);
      setActivePaymentMethod('');
    } else {
      setActivePaymentMethod(paymentKey);
    }
  };

  const createTicket = async () => {
    if (totalAmount < cartTotalWithDiscount) {
      alert('Hay cantidad pendiente de pagar');
      return;
    }
    setIsLoading(true);
    try {
      const result = await sendTicket();
      if (result) {
        localStorage.removeItem('BudgetId');
        usePaymentList.setState(INITIAL_STATE_PAYMENT);
        useCartStore.setState(INITIAL_STATE);
        router.push('/dashboard/menu');
      } else {
        //TODO - ALERT MESSAGE
      }
    } catch (error: any) {
      setIsLoading(false);
      Bugsnag.notify(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      {paymentItems.map(method => (
        <Button
          key={method.key}
          style="tertiary"
          className={`border-[#FA5022] ${
            onLoad && activePaymentMethod != method.key ? 'hidden' : ''
          }`}
          target="_blank"
          onClick={() => handleOnButtonPaymentClick(method.key)}
        >
          {method.label}
        </Button>
      ))}

      {paymentItems.map(method =>
        activePaymentMethod === method.key ? (
          <PaymentClient
            key={method.key}
            paymentBank={method.paymentBank}
            paymentMethod={method.paymentMethod}
            onPaymentClick={() => {
              setActivePaymentMethod('');
              setOnLoad(false);
            }}
          ></PaymentClient>
        ) : null
      )}

      {totalAmount ? (
        <div>
          <span className="font-bold">Pagos Realizados:</span>
          <ul>
            {paymentList?.map(paymentRequest => (
              <PaymentItem
                key={paymentRequest.id}
                paymentRequest={paymentRequest}
              />
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
      <span className="font-bold mr-1">Total Pagado {totalAmount}€</span>
      {totalAmount ? (
        <span className="font-bold mr-1">Faltan {missingAmountFormatted}€</span>
      ) : (
        <></>
      )}
      <Button onClick={createTicket}>
        {' '}
        {isLoading ? <SvgSpinner height={24} width={24} /> : 'Generar Tiquet'}
      </Button>
    </>
  );
};

