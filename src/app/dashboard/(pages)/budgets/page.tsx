'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import ProductService from '@services/ProductService';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import PsrpPage from 'app/tratamientos/psrp';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';
import { isEmpty } from 'lodash';

import HightLightedProduct from './HightLightedProduct/HightLightedProduct';
import { useCartStore } from './stores/userCartStore';

export default function Page() {
  const { setHighlightProduct } = useCartStore(state => state);
  const { setStateProducts, stateProducts } = useGlobalPersistedStore(
    state => state
  );
  const { setFilteredProducts } = useGlobalStore(state => state);
  const [error, setError] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setStateProducts([]);
        setFilteredProducts([]);
        const data = await ProductService.getDashboardProducts();
        const products = data.map((product: Product) => ({
          ...product,
          visibility: true,
        }));
        products.sort((a: any, b: any) => (a.price > b.price ? 1 : -1));
        setStateProducts(products);
        setFilteredProducts(products);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchProducts();
    setHighlightProduct(null);
  }, []);

  useEffect(() => {
    setIsHydrated(true);
  }, [stateProducts]);

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
        <Flex layout="col-center">
          <p className="mb-4">Cargando productos...</p>
          <SvgSpinner
            height={30}
            width={30}
            fill={HOLAGLOW_COLORS['primary']}
          />
        </Flex>
      )}
    </Flex>
  );
}
