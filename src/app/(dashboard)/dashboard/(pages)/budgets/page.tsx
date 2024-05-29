'use client';

import { useEffect, useState } from 'react';
import ProductService from '@services/ProductService';
import FullScreenLoading from 'app/(web)/components/common/FullScreenLayout';
import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgSpinner } from 'app/icons/Icons';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Flex } from 'designSystem/Layouts/Layouts';
import { isEmpty } from 'lodash';

import HightLightedProduct from './HightLightedProduct/HightLightedProduct';
import PsrpDashboard from './PsrpDashboard';
import { useCartStore } from './stores/userCartStore';

export default function Page() {
  const { setHighlightProduct, productHighlighted } = useCartStore(
    state => state
  );
  const { dashboardProducts, setDashboardProducts, storedClinicId } =
    useGlobalPersistedStore(state => state);

  const {
    setFilteredProducts,
    setProductFilters,
    productFilters,
    isModalOpen,
  } = useGlobalStore(state => state);

  const [error, setError] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setFilteredProducts([]);
    setDashboardProducts([]);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsHydrated(false);

      try {
        const products =
          await ProductService.getDashboardProducts(storedClinicId);
        setDashboardProducts(products);
        setFilteredProducts(products);
        productFilters.isPack = true;
        setProductFilters(productFilters);
        setIsHydrated(true);
      } catch (error: any) {
        console.log('error', error);

        setError(error);
      }
    };

    if (!dashboardProducts || dashboardProducts.length === 0) fetchProducts();
    setHighlightProduct(null);
    productFilters.isPack = true;
    setProductFilters(productFilters);
  }, [dashboardProducts]);

  useEffect(() => {
    if (!isModalOpen) {
      setHighlightProduct(null);
    }
  }, [isModalOpen]);

  if (!isEmpty(error)) {
    return <>{error}</>;
  }

  if (!isHydrated) {
    return <FullScreenLoading />;
  }

  return (
    <App>
      <Flex layout="col-center" className="w-full gap-1">
        {dashboardProducts.length > 0 ? (
          <>
            {productHighlighted != null && <HightLightedProduct />}
            <PsrpDashboard />
          </>
        ) : (
          <MainLayout isDashboard>
            <p className="mb-4">Cargando productos...</p>
            <SvgSpinner
              height={30}
              width={30}
              fill={HOLAGLOW_COLORS['primary']}
            />
          </MainLayout>
        )}
      </Flex>
    </App>
  );
}
