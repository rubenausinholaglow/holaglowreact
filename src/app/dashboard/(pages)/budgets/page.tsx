'use client';

import { useEffect, useState } from 'react';
import { Filters } from '@components/Filters';
import { Product } from '@interface/product';
import ProductService from '@services/ProductService';
import { normalizeString } from '@utils/validators';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalStore } from 'app/stores/globalStore';
import PsrpPage from 'app/tratamientos/psrp';
import isEmpty from 'lodash/isEmpty';

import { useCartStore } from './stores/userCartStore';

export default function Page() {
  const { setHighlightProduct } = useCartStore(state => state);

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [showPacks, setShowPacks] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getDashboardProducts();
        data.sort((a: any, b: any) => (a.price > b.price ? 1 : -1));
        setProducts(data);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchProducts();
    setShowPacks(!showPacks);
    setHighlightProduct(null);
  }, []);

  if (error) {
    return <>{error}</>;
  } else if (isEmpty(products)) {
    <></>;
  } else {
    return (
      <PsrpPage
        isDashboard={true}
        slug=""
        productsDashboard={products}
      ></PsrpPage>
    );
  }
}
