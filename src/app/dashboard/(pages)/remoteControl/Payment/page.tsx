'use client';
import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import Notification from '@components/ui/Notification';
import { Budget, BudgetProduct } from '@interface/budget';
import { INITIAL_STATE_PAYMENT } from '@interface/paymentList';
import { budgetService } from '@services/BudgetService';
import { INITIAL_STATE } from '@utils/constants';
import MainLayout from 'app/components/layout/MainLayout';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';

import { useCartStore } from '../../budgets/stores/userCartStore';
import { PaymentModule } from '../../checkout/components/payment/Payments';
import { usePaymentList } from '../../checkout/components/payment/payments/usePaymentList';

export default function PaymentRemoteControl() {
  const addToCart = useCartStore(state => state.addItemToCart);
  const applyCartDiscount = useCartStore(state => state.applyCartDiscount);
  const applyItemDiscount = useCartStore(state => state.applyItemDiscount);
  const [finalBudget, setFinalBudget] = useState<Budget | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messageNotification, setMessageNotification] = useState<string | ''>(
    ''
  );
  useEffect(() => {
    const fetchData = async () => {
      await loadBudget();
      setIsLoading(false);
    };
    usePaymentList.setState(INITIAL_STATE_PAYMENT);
    useCartStore.setState(INITIAL_STATE);
    const budgetIdlocal = localStorage.getItem('BudgetId');

    if (!finalBudget && !budgetIdlocal) {
      fetchData();
    }
  }, []);

  async function loadBudget() {
    const userId = localStorage.getItem('id') || '';
    await budgetService
      .getLastBudgetCreated(userId)
      .then((budget: Budget | undefined) => {
        if (budget) {
          if (!finalBudget) {
            processBudget(budget);
          }
        } else {
          setMessageNotification('Error, presupuesto no encontrado');
        }
      })
      .catch(error => {
        setMessageNotification('Error cargando el presupuesto');
        Bugsnag.notify(error);
      });
  }

  function processBudget(budget: Budget) {
    usePaymentList.setState(INITIAL_STATE_PAYMENT);
    useCartStore.setState(INITIAL_STATE);
    localStorage.setItem('BudgetId', String(budget.id || ''));
    setFinalBudget(budget);
    applyCartDiscounts(budget);
    processBudgetItems(budget);
  }

  function processBudgetItems(budget: Budget) {
    budget.products.forEach(product => {
      const cartItem: any = {
        priceDiscount: product.priceDiscount,
        percentageDiscount: product.percentageDiscount,
        uniqueId: product.id,
        id: product.id,
        price: product.price,
      };
      addToCart(cartItem);
      applyItemDiscounts(product);
    });
  }

  function applyItemDiscounts(product: BudgetProduct) {
    if (product.id) {
      if (product.percentageDiscount > 0) {
        cartItemDiscount(product.id, product.percentageDiscount * 100, '%');
      } else if (product.priceDiscount > 0) {
        cartItemDiscount(product.id, product.priceDiscount, '€');
      }
    }
  }

  function applyCartDiscounts(budget: Budget) {
    if (budget.percentageDiscount > 0) {
      cartDiscount(budget.percentageDiscount * 100, '%');
    } else if (budget.manualPrice > 0) {
      cartDiscount(budget.manualPrice, '€');
    } else if (budget.priceDiscount > 0) {
      cartDiscount(budget.priceDiscount, 'total');
    }
  }
  const cartDiscount = (value: number, discountType: '%' | '€' | 'total') => {
    applyCartDiscount(value, discountType);
  };

  const cartItemDiscount = (
    id: string,
    value: number,
    discountType: '%' | '€' | 'total'
  ) => {
    applyItemDiscount(id, value, discountType);
  };

  return (
    <MainLayout isDashboard>
      <Flex layout="col-center">
        {isLoading ? (
          <SvgSpinner height={24} width={24} />
        ) : (
          <PaymentModule></PaymentModule>
        )}
      </Flex>
      {messageNotification ?? <Notification message={messageNotification} />}
    </MainLayout>
  );
}
