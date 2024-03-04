import { useEffect, useState } from 'react';
import useSelectTreatments from '@dashboardComponents/useSelectTreatments';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { SvgPlusSmall } from 'app/icons/Icons';
import * as icon from 'app/icons/IconsDs';
import { SvgArrow } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { CartItem, Product } from 'app/types/product';
import { getDiscountedPrice } from 'app/utils/common';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function ProductSessionGroupedPriceCard({
  product,
}: {
  product: Product;
}) {
  const { setSelectedTreatments, selectedTreatments } = useSessionStore(
    state => state
  );
  const ROUTES = useRoutes();
  const { productHighlighted, cart } = useCartStore(state => state);
  const addToCart = useCartStore(state => state.addItemToCart);
  const [pendingDiscount, setPendingDiscount] = useState(false);
  const applyItemDiscount = useCartStore(state => state.applyItemDiscount);
  const { addProduct } = useSelectTreatments();

  useEffect(() => {
    if (pendingDiscount) {
      const discountedPrice = getDiscountedPrice(product);

      if (discountedPrice !== null) {
        applyItemDiscount(cart[cart.length - 1].uniqueId, discountedPrice, '€');
        setPendingDiscount(false);
      }
    }
  }, [pendingDiscount]);

  return (
    <div className="w-full">
      <Flex
        layout="row-between"
        className="items-start bg-hg-black50 p-3 rounded-xl"
      >
        <div className="w-full">
          <>
            <Text
              size="xl"
              className="w-full text-hg-secondary font-semibold mb-3 "
            >
              {product.price} €
            </Text>
          </>
          <Flex layout="col-left" className="w-full rounded-xl">
            <Flex className="text-sm ">
              <icon.SvgTimeLeft
                className="text-hg-secondary mr-2"
                height={16}
                width={16}
              />
              {product.sessions}{' '}
              {product.sessions === 1 ? 'sesión' : 'sesiones'}
            </Flex>
          </Flex>
        </div>
        {productHighlighted && (
          <Button
            size="sm"
            type="tertiary"
            className="mt-auto"
            customStyles="bg-hg-primary"
            onClick={e => {
              e.stopPropagation();
              addToCart(product as CartItem);
              addProduct(product);
              setPendingDiscount(true);
            }}
          >
            <p className="mr-2">Añadir </p>
            <SvgPlusSmall height={20} width={20} />
          </Button>
        )}
        {!productHighlighted && (
          <Button
            type="tertiary"
            className="shrink-0"
            customStyles="bg-hg-primary"
            onClick={() => {
              setSelectedTreatments([product]);
            }}
            href={ROUTES.checkout.clinics}
          >
            Reservar cita
            <SvgArrow height={16} width={16} className="ml-2" />
          </Button>
        )}
      </Flex>
    </div>
  );
}
