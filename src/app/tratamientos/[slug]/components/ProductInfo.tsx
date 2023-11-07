'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import DynamicIcon from 'app/components/common/DynamicIcon';
import { getDiscountedPrice } from 'app/utils/common';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgCalendar } from 'icons/Icons';
import { SvgTimeLeft, SvgTimer } from 'icons/IconsDs';
import { isEmpty } from 'lodash';

export default function ProductInfo({ product }: { product: Product }) {
  const [discountedPrice, setDiscountedPrice] = useState<null | number>(null);

  useEffect(() => {
    if (product && !isEmpty(product.discounts)) {
      setDiscountedPrice(getDiscountedPrice(product));
    }
  }, [product]);

  return (
    <Container className="p-0 md:px-4 md:pb-16">
      <div className="md:flex gap-16 justify-between md:bg-hg-cream md:p-6 md:rounded-2xl">
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
            </li>
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
            {product.durationMin > 30 && (
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

          <Button
            size="xl"
            type="tertiary"
            bgColor="bg-hg-primary"
            className="hidden md:block md:mt-auto"
            href="#prices"
          >
            <span className="inline-block mr-1">Reserva cita desde</span>
            {discountedPrice && (
              <span className="inline-block line-through font-normal mr-1">
                {product.price} €
              </span>
            )}
            <span className="font-semibold text-lg">
              {discountedPrice ? discountedPrice : product.price} €
            </span>
          </Button>
        </Container>
      </div>
    </Container>
  );
}
