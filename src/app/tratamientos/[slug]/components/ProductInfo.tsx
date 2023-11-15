'use client';

import { useEffect, useState } from 'react';
import { CartItem, Product } from '@interface/product';
import DynamicIcon from 'app/components/common/DynamicIcon';
import { Quantifier } from 'app/dashboard/(pages)/budgets/HightLightedProduct/Quantifier';
import {
  Operation,
  useCartStore,
} from 'app/dashboard/(pages)/budgets/stores/userCartStore';
import { getDiscountedPrice } from 'app/utils/common';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgCalendar } from 'icons/Icons';
import { SvgTimeLeft, SvgTimer } from 'icons/IconsDs';
import { isEmpty } from 'lodash';

export default function ProductInfo({ product }: { product: Product }) {
  const [discountedPrice, setDiscountedPrice] = useState<null | number>(null);
  const {
    productHighlighted,
    addItemToCart,
    getQuantityOfProduct,
    removeSingleProduct,
  } = useCartStore(state => state);

  useEffect(() => {
    if (product && !isEmpty(product.discounts)) {
      setDiscountedPrice(getDiscountedPrice(product));
    }
  }, [product]);

  return (
    <Container className="p-0 md:px-0 md:pb-0 md:py-0 mx-auto w-full">
      <div className="md:flex gap-8 justify-between items-start md:bg-hg-cream md:p-6 md:rounded-2xl w-full">
        <Container className="mt-8 md:mt-0 md:px-0 md:flex md:flex-col md:justify-center md:items-start">
          <ul className="flex flex-col pb-4 w-full">
            <li className="mb-4 pb-4 border-b border-hg-black flex">
              <div>
                <Text size="lg" className="font-semibold mb-1 md:mb-2">
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
                          <Flex key={item.titlte} className="items-start mb-2">
                            <DynamicIcon
                              height={24}
                              width={24}
                              className="mr-3 mt-1 text-hg-secondary shrink-0"
                              name={iconName}
                              family={iconFamily}
                            />

                            <Text
                              size="lg"
                              className="font-semibold mb-1 md:mb-2"
                            >
                              {item.titlte}
                            </Text>
                          </Flex>
                        );
                      })
                    : product.description}
                </Text>
                <Text className="pl-9">Producto aplicado</Text>
              </div>
            </li>
            <li className="mb-4 pb-4 border-b border-hg-black flex">
              <div
                className={`flex  gap-4 relative md:justify-center ${
                  productHighlighted ? 'flex-row' : 'flex-col'
                } w-full`}
              >
                <div className="flex-1 flex items-start pr-4 border-r border-hg-black w-full">
                  <SvgTimeLeft
                    height={24}
                    width={24}
                    className="text-hg-secondary mr-3 mt-1"
                  />
                  <div>
                    <Text size="lg" className="font-semibold mb-1 md:mb-2">
                      {product.sessions.toString()}{' '}
                      {product.sessions === 1 ? 'sesión' : 'sesiones'}
                    </Text>
                    <Text>Número de sesiones</Text>
                  </div>
                </div>
                <div className="flex-1 w-full md:w-1/6">
                  {productHighlighted && (
                    <div className="flex items-start">
                      <SvgTimer
                        height={24}
                        width={24}
                        className="text-hg-secondary mr-3 mt-1"
                      />
                      <div>
                        <Text size="lg" className="font-semibold mb-1 md:mb-2">
                          {product.applicationTimeMinutes.toString()} minutos
                        </Text>
                        <Text>Tiempo de aplicación</Text>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>

            {!productHighlighted && (
              <li className="mb-4 pb-4 border-b border-hg-black flex">
                <SvgTimer
                  height={24}
                  width={24}
                  className="text-hg-secondary mr-3 mt-1"
                />
                <div>
                  <Text size="lg" className="font-semibold mb-1 md:mb-2">
                    {product.applicationTimeMinutes.toString()} minutos
                  </Text>
                  <Text>Tiempo de aplicación</Text>
                </div>
              </li>
            )}
            {product.durationMin >= 30 && (
              <li className="pb-4 flex">
                <SvgCalendar
                  height={24}
                  width={24}
                  className="text-hg-secondary mr-3 mt-1"
                />
                <div>
                  <Text size="lg" className="font-semibold mb-1 md:mb-2">
                    {(product.durationMin / 30).toString()}
                    {product.durationMax == product.durationMin && ' meses'}
                    {product.durationMax != product.durationMin &&
                      '- ' + (product.durationMax / 30).toString() + 'meses'}
                  </Text>
                  <Text>Duración del tratamiento</Text>
                </div>
              </li>
            )}
          </ul>
          {!productHighlighted ? (
            <Button
              size="xl"
              type="tertiary"
              bgColor="bg-hg-primary"
              className="hidden md:block md:mt-auto"
              href="#prices"
            >
              <span className="inline-block mr-1">
                Reserva cita {product.isPack ? '' : 'desde'}
              </span>

              {discountedPrice && (
                <span className="inline-block line-through font-normal mr-1">
                  {product.price} €
                </span>
              )}
              <span className="font-semibold text-lg">
                {discountedPrice ? discountedPrice : product.price} €
              </span>
            </Button>
          ) : (
            <Flex className="bg-white inline-flex rounded-3xl gap-4 px-2 py-2 mb-2 justify-start flex-row">
              {discountedPrice && (
                <span className="inline-block line-through font-normal mr-1">
                  {product.price} €
                </span>
              )}
              <span className="font-semibold text-lg">
                {discountedPrice ? discountedPrice : product.price} €
              </span>
              <Quantifier
                handleUpdateQuantity={function handleUpdateQuantity(
                  operation: Operation
                ): void {
                  if (operation == 'increase') {
                    addItemToCart(product as CartItem);
                  } else {
                    removeSingleProduct(product as CartItem);
                  }
                }}
                quantity={getQuantityOfProduct(product)}
              />
            </Flex>
          )}
        </Container>
        {!productHighlighted && (
          <div className="md:w-2/5 shrink-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              src="/videos/pdp.mp4"
              className="w-full h-full block bg-black object-center md:rounded-xl"
            />
          </div>
        )}
      </div>
    </Container>
  );
}
