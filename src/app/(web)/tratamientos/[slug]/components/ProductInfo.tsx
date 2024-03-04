'use client';

import { useEffect, useState } from 'react';
import useSelectTreatments from '@dashboardComponents/useSelectTreatments';
import ROUTES from '@utils/routes';
import { Quantifier } from 'app/(dashboard)/dashboard/(pages)/budgets/HightLightedProduct/Quantifier';
import {
  Operation,
  useCartStore,
} from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { SvgCalendar } from 'app/icons/Icons';
import { SvgArrow, SvgEuro, SvgTimeLeft, SvgTimer } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { CartItem, EmlaType, Product } from 'app/types/product';
import { getDiscountedPrice } from 'app/utils/common';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

export default function ProductInfo({
  product,
  isDashboard = false,
  setBottomBarThreshold,
}: {
  product: Product;
  isDashboard?: boolean;
  setBottomBarThreshold?: (value: number) => void;
}) {
  const router = useRouter();

  const [discountedPrice, setDiscountedPrice] = useState<null | number>(null);
  const [pendingDiscount, setPendingDiscount] = useState(false);
  const {
    cart,
    addItemToCart,
    getQuantityOfProduct,
    removeSingleProduct,
    applyItemDiscount,
  } = useCartStore(state => state);

  const { setSelectedTreatments } = useSessionStore(state => state);
  const { addProduct, removeProduct } = useSelectTreatments();

  useEffect(() => {
    if (setBottomBarThreshold && typeof window !== 'undefined') {
      const videoElement = document.querySelector('video');

      setBottomBarThreshold(videoElement ? videoElement.offsetTop : 1200);
    }
  }, []);

  useEffect(() => {
    if (pendingDiscount) {
      const discountedPrice = getDiscountedPrice(product);

      if (discountedPrice !== null) {
        applyItemDiscount(cart[cart.length - 1].uniqueId, discountedPrice, '€');
        setPendingDiscount(false);
      }
    }
  }, [pendingDiscount]);

  useEffect(() => {
    if (product && !isEmpty(product.discounts)) {
      setDiscountedPrice(getDiscountedPrice(product));
    }
  }, [product]);

  return (
    <Container className="p-0 md:px-0 md:pb-0 md:py-0 mx-auto w-full">
      <div className="md:flex gap-8 justify-between items-start md:bg-hg-cream md:p-6 md:rounded-2xl w-full">
        <Container className="mt-8 md:mt-0 md:px-0 md:flex md:flex-col md:justify-center md:items-start">
          <Title size="xl" className="font-bold mb-8">
            Tu tratamiento
          </Title>
          <ul className="flex flex-col pb-4 w-full mb-4">
            <li className="mb-4 pb-4 border-b border-hg-black flex">
              {!isEmpty(product.appliedProducts)
                ? product.appliedProducts.map(item => {
                    const iconName = item.icon.split('/')[0] || 'SvgCross';
                    const iconFamily:
                      | 'default'
                      | 'category'
                      | 'suggestion'
                      | 'service' =
                      (item.icon.split('/')[1] as 'default') || 'default';

                    return (
                      <Flex key={item.titlte} className="items-start">
                        <DynamicIcon
                          height={24}
                          width={24}
                          className="mr-3 text-hg-secondary shrink-0"
                          name={iconName}
                          family={iconFamily}
                        />

                        <Text size="lg">{item.titlte}</Text>
                      </Flex>
                    );
                  })
                : product.description}
            </li>
            {(product.sessions > 0 || product.applicationTimeMinutes > 0) && (
              <li className="mb-4 pb-4 border-b border-hg-black flex">
                <div
                  className={`flex relative md:justify-center ${
                    isDashboard ? 'flex-row gap-4' : 'flex-col'
                  } w-full`}
                >
                  {product.sessions > 0 && (
                    <>
                      <div
                        className={`flex-1 flex items-start pr-4 ${
                          isDashboard ? 'border-r border-hg-black' : ''
                        } w-full`}
                      >
                        <SvgTimeLeft
                          height={24}
                          width={24}
                          className="text-hg-secondary mr-3"
                        />
                        <div>
                          <Text size="lg">
                            {product.sessions.toString()}{' '}
                            {product.sessions === 1 ? 'sesión' : 'sesiones'}
                          </Text>
                        </div>
                      </div>
                    </>
                  )}
                  {product.applicationTimeMinutes > 0 && (
                    <div className="flex-1 w-full md:w-1/6">
                      {isDashboard && (
                        <div className="flex items-start">
                          <SvgTimer
                            height={24}
                            width={24}
                            className="text-hg-secondary mr-3 mt-1"
                          />
                          <div>
                            <Text size="lg" className="mb-1 md:mb-2">
                              {product.emlaType === EmlaType.Required
                                ? product.applicationTimeMinutes * 2 + ''
                                : product.applicationTimeMinutes.toString()}{' '}
                              minutos
                            </Text>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </li>
            )}

            {!isDashboard && (
              <li className="mb-4 pb-4 border-b border-hg-black flex">
                <SvgTimer
                  height={24}
                  width={24}
                  className="text-hg-secondary mr-3"
                />
                <div>
                  <Text size="lg">
                    {product.emlaType === EmlaType.Required
                      ? product.applicationTimeMinutes * 2 + ''
                      : product.applicationTimeMinutes.toString()}{' '}
                    minutos
                  </Text>
                </div>
              </li>
            )}

            <li className="mb-4 pb-4 border-b border-hg-black flex">
              <SvgCalendar
                height={24}
                width={24}
                className="text-hg-secondary mr-3"
              />
              <div className="flex flex-col">
                {product.durationMin >= 30 ? (
                  <Text size="lg">
                    {(product.durationMin / 30).toString()}
                    {product.durationMax == product.durationMin && ' meses'}
                    {product.durationMax != product.durationMin &&
                      '-' + (product.durationMax / 30).toString() + ' meses'}
                  </Text>
                ) : (
                  <Text size="lg">Permanente</Text>
                )}
              </div>
            </li>

            <li className="pb-4 flex">
              <SvgEuro
                height={24}
                width={24}
                className="text-hg-secondary mr-3"
              />
              <div className="flex flex-col">
                <Text size="lg">desde {product.price} €</Text>
              </div>
            </li>
          </ul>
          {!isDashboard ? (
            <Button
              onClick={() => {
                setSelectedTreatments([product]);
                router.push(ROUTES.checkout.type);
              }}
              size="xl"
              type="tertiary"
              customStyles="bg-hg-primary"
              className="mb-12 md:mb-0 md:mt-auto"
              id="tmevent_click_book_anchor_button"
            >
              Me interesa
              <SvgArrow
                height={24}
                width={24}
                className="ml-4 pointer-events-none"
              />
            </Button>
          ) : (
            <Flex className="bg-white inline-flex rounded-full gap-2 pl-4 pr-2 py-2 mb-2 ">
              <span className="font-semibold text-hg-secondary text-xl">
                {discountedPrice ? discountedPrice : product.price} €
              </span>
              {discountedPrice && (
                <span className="inline-block line-through font-normal mr-1">
                  {product.price} €
                </span>
              )}
              <Quantifier
                handleUpdateQuantity={function handleUpdateQuantity(
                  operation: Operation
                ): void {
                  if (operation == 'increase') {
                    addItemToCart(product as CartItem);
                    addProduct(product);
                    setPendingDiscount(true);
                  } else {
                    removeProduct(product);
                    removeSingleProduct(product as CartItem);
                  }
                }}
                quantity={getQuantityOfProduct(product)}
              />
            </Flex>
          )}
        </Container>
        {!isDashboard && (
          <div className="md:w-2/5 shrink-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              src={product.videoUrl ? product.videoUrl : '/videos/pdp.mp4'}
              className="w-full h-full block bg-black object-center md:rounded-xl"
            />
          </div>
        )}
      </div>
    </Container>
  );
}
