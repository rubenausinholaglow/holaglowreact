'use client';
import { useEffect, useState } from 'react';
import { Budget, BudgetProduct } from '@interface/budget';
import { INITIAL_STATE_PAYMENT } from '@interface/paymentList';
import { budgetService } from '@services/BudgetService';
import { INITIAL_STATE } from '@utils/constants';
import MainLayout from 'app/components/layout/MainLayout';
import { Flex } from 'designSystem/Layouts/Layouts';

import { useCartStore } from '../../budgets/stores/userCartStore';
import { PaymentModule } from '../../checkout/components/payment/Payments';
import { usePaymentList } from '../../checkout/components/payment/payments/usePaymentList';

export default function PaymentRemoteControl() {
  const addToCart = useCartStore(state => state.addItemToCart);
  const applyCartDiscount = useCartStore(state => state.applyCartDiscount);
  const applyItemDiscount = useCartStore(state => state.applyItemDiscount);
  const [finalBudget, setFinalBudget] = useState<Budget | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isLoading) {
      const fetchData = async () => {
        await loadBudget();
      };
      usePaymentList.setState(INITIAL_STATE_PAYMENT);
      useCartStore.setState(INITIAL_STATE);
      const budgetIdlocal = localStorage.getItem('BudgetId');

      if (!finalBudget && !budgetIdlocal) {
        fetchData();
      }
    }
    setIsLoading(false);
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
          // ERROR
        }
      })
      .catch(error => {
        // ERROR
      });
  }

  function processBudget(budget: Budget) {
    console.log(budget);
    console.log(finalBudget);
    usePaymentList.setState(INITIAL_STATE_PAYMENT);
    useCartStore.setState(INITIAL_STATE);
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

  if (!isLoading)
    return (
      <MainLayout isDashboard>
        <Flex layout="col-center">
          <PaymentModule></PaymentModule>
        </Flex>
      </MainLayout>
    );
}
