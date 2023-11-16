'use client';
import { useEffect } from 'react';
import ProductDetail from 'app/tratamientos/[slug]/components/ProductDetail';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Text } from 'designSystem/Texts/Texts';
import { SvgCart, SvgCross } from 'icons/IconsDs';

import { useCartStore } from '../stores/userCartStore';

type paramsDetail = {
  slug: string;
  isDashboard: boolean;
};
export default function HightLightedProduct() {
  const { productHighlighted, setHighlightProduct, totalItems, totalPrice } =
    useCartStore(state => state);

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
      <Modal isVisible={true} width="w-[90%]">
        <Flex className="p-6">
          <div className="w-1/2 ">
            <SvgCross
              onClick={() => {
                setHighlightProduct(null);
              }}
            />
          </div>
          <Flex className="w-1/2 justify-end gap-2">
            <Text>
              Total ({totalItems} ud.) {totalPrice} €
            </Text>
            <SvgCart
              height={32}
              width={32}
              className="p-2 bg-hg-black text-hg-primary rounded-full"
            />
          </Flex>
        </Flex>
        <ProductDetail params={params}></ProductDetail>
      </Modal>
    </>
  );
}
