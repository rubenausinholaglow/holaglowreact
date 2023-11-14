'use client';
import { useEffect } from 'react';
import ProductDetail from 'app/tratamientos/[slug]/components/ProductDetail';
import { Modal } from 'designSystem/Modals/Modal';

import { useCartStore } from '../stores/userCartStore';

type paramsDetail = {
  slug: string;
  isDashboard: boolean;
};
export default function HightLightedProduct() {
  const { productHighlighted } = useCartStore(state => state);

  const params: paramsDetail = {
    slug: productHighlighted?.extraInformation.slug || '',
    isDashboard: true,
  };

  useEffect(() => {
    (params.isDashboard = true),
      (params.slug = productHighlighted?.extraInformation.slug || '');
  }, [productHighlighted]);
  return (
    <Modal isVisible={true} width="w-3/4">
      {productHighlighted?.extraInformation.slug || ''}
      <ProductDetail params={params}></ProductDetail>
    </Modal>
  );
}
