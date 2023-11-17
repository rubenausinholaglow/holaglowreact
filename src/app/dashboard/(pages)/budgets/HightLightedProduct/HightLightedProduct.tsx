'use client';
import { useEffect } from 'react';
import ProductDetail from 'app/tratamientos/[slug]/components/ProductDetail';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Text } from 'designSystem/Texts/Texts';
import { SvgCart, SvgCross } from 'icons/IconsDs';
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
