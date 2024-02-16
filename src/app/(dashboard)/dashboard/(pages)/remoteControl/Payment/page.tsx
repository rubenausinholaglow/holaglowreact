'use client';
import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { budgetService } from '@services/BudgetService';
import ProductService from '@services/ProductService';
import { INITIAL_STATE } from '@utils/constants';
import Notification from 'app/(dashboard)/dashboard/components/ui/Notification';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgSpinner } from 'app/icons/Icons';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { Budget, BudgetProduct } from 'app/types/budget';
import { INITIAL_STATE_PAYMENT } from 'app/types/paymentList';
import { Product } from 'app/types/product';
import { Flex } from 'designSystem/Layouts/Layouts';

import { useCartStore } from '../../budgets/stores/userCartStore';
import { PaymentModule } from '../../checkout/components/payment/Payments';
import { usePaymentList } from '../../checkout/components/payment/payments/usePaymentList';

export default function PaymentRemoteControl() {
  const addItemToCart = useCartStore(state => state.addItemToCart);
  const applyCartDiscount = useCartStore(state => state.applyCartDiscount);
  const applyItemDiscount = useCartStore(state => state.applyItemDiscount);
  const [finalBudget, setFinalBudget] = useState<Budget | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messageNotification, setMessageNotification] = useState<string | ''>(
    ''
  );
  const { user } = useGlobalPersistedStore(state => state);

  const { setFilteredProducts, productFilters, setProductFilters } =
    useGlobalStore(state => state);

  const { setStateProducts, setBudgetId } = useGlobalPersistedStore(
    state => state
  );

  useEffect(() => {
    const fetchData = async () => {
      await loadBudget();
      setIsLoading(false);
    };
    usePaymentList.setState(INITIAL_STATE_PAYMENT);
    useCartStore.setState(INITIAL_STATE);

    if (!finalBudget) {
      fetchData();
    }
  }, []);

  async function loadBudget() {
    await budgetService
      .getLastBudgetCreated(user?.id || '')
      .then(async (budget: Budget | undefined) => {
        if (budget) {
          if (!finalBudget) {
            await processBudget(budget);
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

  async function processBudget(budget: Budget) {
    usePaymentList.setState(INITIAL_STATE_PAYMENT);
    useCartStore.setState(INITIAL_STATE);
    setFinalBudget(budget);
    setBudgetId(budget.id);
    applyCartDiscounts(budget);
    await processBudgetItems(budget);
  }

  async function processBudgetItems(budget: Budget) {
    budget.products.forEach(product => {
      const cartItem: any = {
        priceDiscount: product.priceDiscount,
        percentageDiscount: product.percentageDiscount,
        uniqueId: product.id,
        id: product.product?.id,
        price: product.price,
        title: product.product?.title,
      };
      addItemToCart(cartItem);
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

  useEffect(() => {
    setStateProducts([]);
    setFilteredProducts([]);
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getDashboardProducts();
        const products = data.map((product: Product) => ({
          ...product,
          visibility: true,
        }));
        products.sort((a: any, b: any) => (a.price > b.price ? 1 : -1));
        setStateProducts(products);
        setFilteredProducts(products);
        productFilters.isPack = true;
        setProductFilters(productFilters);
      } catch (error: any) {
        Bugsnag.notify(error);
      }
    };

    fetchProducts();
    setProductFilters(productFilters);
  }, []);

  return (
    <MainLayout isDashboard isCheckout>
      <Flex layout="col-center" className="w-full px-4">
        {isLoading ? <SvgSpinner height={24} width={24} /> : <PaymentModule />}
      </Flex>
      {messageNotification ?? <Notification message={messageNotification} />}
    </MainLayout>
  );
}
