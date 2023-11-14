'use client';
import { useEffect } from 'react';
import ProductDetail from 'app/tratamientos/[slug]/components/ProductDetail';
import { Modal } from 'designSystem/Modals/Modal';
import { Text } from 'designSystem/Texts/Texts';
import { SvgCross } from 'icons/IconsDs';

import { useCartStore } from '../stores/userCartStore';

type paramsDetail = {
  slug: string;
  isDashboard: boolean;
};
export default function HightLightedProduct() {
  const { productHighlighted, totalItems, totalPrice } = useCartStore(
    state => state
  );

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
      <div className="pb-24 flex">
        <SvgCross />
        <div className="w-1/2 flex justify-end pt-6 pr-8 gap-3">
          Total ({totalItems} ud.) {totalPrice} €
        </div>
      </div>
      <ProductDetail params={params}></ProductDetail>
    </Modal>
  );
}
