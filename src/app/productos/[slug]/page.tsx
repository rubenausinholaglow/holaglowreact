'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgCalendar, SvgDiamond } from 'icons/Icons';
import { SvgInjection, SvgTimeLeft, SvgTimer } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import ProductIntro from './components/ProductIntro';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { stateProducts } = useGlobalPersistedStore(state => state);
  const [product, setProduct] = useState<Product | null>(null);
  const [slug, setSlug] = useState(params.slug);

  useEffect(() => {
    setSlug(params.slug);

    setProduct(
      stateProducts.filter(
        product => product.flowwwId.toString() === params.slug
      )[0]
    );
  }, [slug]);

  if (isEmpty(product)) {
    return <></>;
  }

  console.log(product);

  return (
    <MainLayout>
      <div className="bg-hg-cream500 rounded-t-3xl pt-8">
        <ProductIntro product={product} />

        <Container className="mt-8">
          <ul className="flex flex-col">
            <li className="mb-4 pb-4 border-b border-hg-black flex">
              <SvgInjection
                height={24}
                width={24}
                className="text-hg-secondary mr-3 mt-1"
              />
              <div>
                <Text size="lg" className="font-semibold">
                  {product.description}
                </Text>
                <Text>Producto aplicado</Text>
              </div>
            </li>
            <li className="mb-4 pb-4 border-b border-hg-black flex">
              <SvgTimeLeft
                height={24}
                width={24}
                className="text-hg-secondary mr-3 mt-1"
              />
              <div>
                <Text size="lg" className="font-semibold">
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
                <Text size="lg" className="font-semibold">
                  {product.applicationTimeMinutes.toString()} minutos
                </Text>
                <Text>Tiempo de aplicación</Text>
              </div>
            </li>
            <li className="pb-4 flex">
              <SvgCalendar
                height={24}
                width={24}
                className="text-hg-secondary mr-3 mt-1"
              />
              <div>
                <Text size="lg" className="font-semibold">
                  {(product.durationMin / 30).toString()} -{' '}
                  {(product.durationMax / 30).toString()} meses
                </Text>
                <Text>Duración del tratamiento</Text>
              </div>
            </li>
          </ul>
        </Container>
      </div>
    </MainLayout>
  );
}
