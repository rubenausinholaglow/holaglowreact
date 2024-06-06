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
    const fetchProducts = async () => {
      try {
        const products =
          await ProductService.getDashboardProducts(storedClinicId);
        productFilters.isPack = true;
        setProductFilters(productFilters);
        setDashboardProducts(products);
        setFilteredProducts(products);
        setIsHydrated(true);
      } catch (error: any) {
        setError(error);
      }
    };
    fetchProducts();
    setHighlightProduct(null);
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      setHighlightProduct(null);
    }
  }, [isModalOpen]);

  if (error) {
    return <>{error}</>;
  }

  return (
    <App>
      <Flex layout="col-center" className="w-full gap-1">
        <>
          {productHighlighted != null && <HightLightedProduct />}
          <PsrpPage isDashboard={true} />
        </>
      </Flex>
    </App>
  );
}
