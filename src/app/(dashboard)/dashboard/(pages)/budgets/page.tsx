'use client';

import { useEffect, useState } from 'react';
import { ProductClinics } from '@interface/clinic';
import ProductService from '@services/ProductService';
import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import PsrpPage from 'app/(web)/tratamientos/psrp';
import { SvgSpinner } from 'app/icons/Icons';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { Product } from 'app/types/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Flex } from 'designSystem/Layouts/Layouts';

import HightLightedProduct from './HightLightedProduct/HightLightedProduct';
import { useCartStore } from './stores/userCartStore';

export default function Page() {
  const { setHighlightProduct, productHighlighted } = useCartStore(
    state => state
  );
  const {
    setStateProducts,
    dashboardProducts,
    setDashboardProducts,
    storedClinicId,
  } = useGlobalPersistedStore(state => state);
  const {
    setFilteredProducts,
    setProductFilters,
    productFilters,
    isModalOpen,
  } = useGlobalStore(state => state);
  const [error, setError] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setStateProducts([]);
    setFilteredProducts([]);
    setDashboardProducts([]);
    const fetchProducts = async () => {
      try {
        const products =
          await ProductService.getDashboardProducts(storedClinicId);
        setDashboardProducts(products);
        setFilteredProducts(products);
        setIsHydrated(true);
        productFilters.isPack = true;
        setProductFilters(productFilters);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchProducts();
    setHighlightProduct(null);
    productFilters.isPack = true;
    setProductFilters(productFilters);
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      setHighlightProduct(null);
    }
  }, [isModalOpen]);

  if (error || !isHydrated) {
    return <>{error}</>;
  }

  return (
    <App>
      <Flex layout="col-center" className="w-full gap-1">
        {dashboardProducts.length > 0 ? (
          <>
            {productHighlighted != null && <HightLightedProduct />}
            <PsrpPage isDashboard />
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
