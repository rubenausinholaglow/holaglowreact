'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import ProductService from '@services/ProductService';
import MainLayout from 'app/components/layout/MainLayout';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import PsrpPage from 'app/tratamientos/psrp';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';

import HightLightedProduct from './HightLightedProduct/HightLightedProduct';
import { useCartStore } from './stores/userCartStore';

export default function Page() {
  const { setHighlightProduct } = useCartStore(state => state);
  const { setStateProducts, stateProducts } = useGlobalPersistedStore(
    state => state
  );
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
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getDashboardProducts();
        const products = data.map((product: Product) => ({
          ...product,
          visibility: true,
        }));
        products.sort((a: any, b: any) => (a.price > b.price ? 1 : -1));
        setStateProducts(products);
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
    <Flex layout="col-center" className="w-full gap-1">
      {stateProducts.length > 0 ? (
        <>
          <HightLightedProduct />
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
  );
}
