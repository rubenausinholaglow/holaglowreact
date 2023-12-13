'use client';
import { useEffect, useState } from 'react';
import ProductDetail from 'app/(web)/tratamientos/[slug]/components/ProductDetail';
import { getDiscountedPrice } from 'app/utils/common';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { SvgCross } from 'icons/IconsDs';
import { isEmpty } from 'lodash';

import { useCartStore } from '../stores/userCartStore';

type paramsDetail = {
  slug: string;
  isDashboard: boolean;
};
export default function HightLightedProduct() {
  const { productHighlighted, setHighlightProduct } = useCartStore(
    state => state
  );
  const [pendingDiscount, setPendingDiscount] = useState(false);
  const applyItemDiscount = useCartStore(state => state.applyItemDiscount);
  const cart = useCartStore(state => state.cart);

  useEffect(() => {
    if (pendingDiscount) {
      const discountedPrice = productHighlighted
        ? getDiscountedPrice(productHighlighted)
        : null;

      if (discountedPrice !== null) {
        applyItemDiscount(cart[cart.length - 1].uniqueId, discountedPrice, '€');
        setPendingDiscount(false);
      }
    }
  }, [pendingDiscount]);

  const params: paramsDetail = {
    slug: productHighlighted?.extraInformation.slug || '',
    isDashboard: true,
  };

  useEffect(() => {
    (params.isDashboard = true),
      (params.slug = productHighlighted?.extraInformation.slug || '');
  }, [productHighlighted]);

  return (
    <>
      <Modal isVisible={!isEmpty(productHighlighted)} width="w-[90%]">
        <Flex className="p-6">
          <SvgCross
            onClick={() => {
              setHighlightProduct(null);
            }}
          />
        </Flex>
        <ProductDetail params={params}></ProductDetail>
      </Modal>
    </>
  );
}
