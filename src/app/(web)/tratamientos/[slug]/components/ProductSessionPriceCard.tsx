'use client';

import { useState } from 'react';
import { SvgArrow } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { Product } from 'app/types/product';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

const HYDRAFACIAL_BULLETS = [
  [
    'Tratamiento de 30 minutos',
    'Limpieza profunda',
    'Peeling suave para eliminar las impurezas y las células muertas de la piel',
    'Eliminar los puntos negros y las obstrucciones de los poros',
    'Hidratación intensiva para nutrir y rejuvenecer la piel',
  ],
  [
    'Tratamiento de 45 minutos',
    'Todos los beneficios del <span class="font-semibold">Hydrafacial Express</span>',
    'Potenciador o booster personalizado ',
    'Terapia LED para estimular la producción de colágeno y lucir una piel más firme y luminosa',
  ],
  [
    'Tratamiento de 60 minutos',
    'Todos los beneficios del <span class="font-semibold">Hydrafacial Deluxe</span>',
    'Drenaje linfático para mejorar la circulación y eliminar toxinas',
  ],
];

const SESSION_PRODUCTS_EXTRA_INFO = [
  // mesoterapia facial
  {
    id: '60c17d01-c7f2-4377-84fc-cd9cfa47ed15',
    title: 'Mesoterapia facial x1',
    description:
      'Rejuvenece la piel, reduce arrugas y mejora la hidratación mediante microinyecciones de vitaminas y minerales.',
  },
  {
    id: '3863afcf-ba9d-46c5-85a7-bfe1fda67d40',
    title: 'Mesoterapia facial x3',
    description:
      'Consigue un resultado más rejuvenecida y visiblemente más saludable.',
  },
  {
    id: 'f99d66b2-1b9f-4794-a539-08db4c1d52cc',
    title: 'Mesoterapia facial x5',
    description:
      'Pack recomendado para maximizar el efecto de las vitaminas y conseguir un resultado más duradero.',
  },
  {
    id: '3f5b1dd7-b220-4a0e-967b-f4e6faf0f882',
    title: 'Hydrafacial Express x1',
    bullets: HYDRAFACIAL_BULLETS[0],
  },
  {
    id: 'fbeaa4fb-861e-4439-887f-6076665f1026',
    title: 'Hydrafacial Express x3',
    bullets: HYDRAFACIAL_BULLETS[0],
  },
  {
    id: '8fc8c043-4510-46f4-8534-8c3b58654904',
    title: 'Hydrafacial Express x5',
    bullets: HYDRAFACIAL_BULLETS[0],
  },
  {
    id: '62403dad-846f-46cf-b4cc-7dae946e028e',
    title: 'Hydrafacial Deluxe x1',
    bullets: HYDRAFACIAL_BULLETS[1],
  },
  {
    id: '758c0016-9426-4825-842b-f33a398dfdc2',
    title: 'Hydrafacial Deluxe x3',
    bullets: HYDRAFACIAL_BULLETS[1],
  },
  {
    id: '631c8564-fe40-41fa-a339-f16aba3110ec',
    title: 'Hydrafacial Deluxe x5',
    bullets: HYDRAFACIAL_BULLETS[1],
  },
  {
    id: 'fd3469c0-90b3-4d17-848d-0aff2a3952fb',
    title: 'Hydrafacial Platinum x1',
    bullets: HYDRAFACIAL_BULLETS[2],
  },
  {
    id: '40a41135-3c21-41a2-9ec7-98fb3b51d62b',
    title: 'Hydrafacial Platinum x3',
    bullets: HYDRAFACIAL_BULLETS[2],
  },
  {
    id: 'aa85f692-a339-4327-993c-3338413e7a03',
    title: 'Hydrafacial Platinum x5',
    bullets: HYDRAFACIAL_BULLETS[2],
  },
  {
    id: '7f2e85f1-ff32-4f2b-8d48-4117e9e5b4c7',
    title: 'Microneedling x1',
    description:
      'Promueve la generación natural de colágeno y elastina para mejorar la calidad y textura de la piel.',
  },
  {
    id: '567f1e64-5421-42a8-8060-6440de76f303',
    title: 'Microneedling x3',
    description:
      'Consigue unos resultados más visibles con el pack de 3 sesiones gracias al efecto acumulativo del tratamiento.',
  },
  {
    id: 'a335dc73-2951-4dde-8298-f1ffeb83bd2e',
    title: 'Microneedling x6',
    description:
      'Recomendado para maximizar los resultados visibles del tratamiento con varias sesiones y conseguir un resultado más duradero.',
  },
];

export default function ProductSessionPriceCard({
  isGroupedSessionProduct = false,
  productItems,
}: {
  isGroupedSessionProduct?: boolean;
  productItems: Product[];
}) {
  const [productIndexToAdd, setProductIndexToAdd] = useState(0);
  const { setSelectedTreatments } = useSessionStore(state => state);
  const ROUTES = useRoutes();

  //const [pendingDiscount, setPendingDiscount] = useState(false);
  //const applyItemDiscount = useCartStore(state => state.applyItemDiscount);

  /*   useEffect(() => {
    if (pendingDiscount) {
      const discountedPrice = getDiscountedPrice(product);

      if (discountedPrice !== null) {
        applyItemDiscount(cart[cart.length - 1].uniqueId, discountedPrice, '€');
        setPendingDiscount(false);
      }
    }
  }, [pendingDiscount]); */

  return (
    <Flex layout="col-left" className="md:flex-row md:gap-8 w-full">
      <Flex
        layout="col-left"
        className={`bg-white p-6 rounded-2xl w-full shadow-centered-secondary md:shadow-none ${
          isGroupedSessionProduct ? '' : 'md:w-1/2'
        }`}
      >
        <Text className="text-2xl font-semibold text-hg-secondary mb-4">
          {productItems[productIndexToAdd].price} €
        </Text>
        <ul className="flex flex-wrap gap-2 mb-4">
          {productItems.map((product: Product, index: number) => {
            return (
              <Button
                size="sm"
                type={productIndexToAdd === index ? 'primary' : 'white'}
                customStyles={
                  productIndexToAdd === index
                    ? ''
                    : 'border-none bg-derma-secondary300 font-normal'
                }
                key={product.sessions}
                onClick={() => setProductIndexToAdd(index)}
              >
                {product.sessions}{' '}
                {product.sessions === 1 ? 'sesión' : 'sesiones'}
              </Button>
            );
          })}
        </ul>

        <Text className="font-semibold text-lg mb-2">
          {
            SESSION_PRODUCTS_EXTRA_INFO.filter(
              item => item.id === productItems[productIndexToAdd].id
            )[0]?.title
          }
        </Text>

        {SESSION_PRODUCTS_EXTRA_INFO.filter(
          item => item.id === productItems[productIndexToAdd].id
        )[0]?.description && (
          <Text className="text-hg-black500 text-sm mb-12">
            {
              SESSION_PRODUCTS_EXTRA_INFO.filter(
                item => item.id === productItems[productIndexToAdd].id
              )[0]?.description
            }
          </Text>
        )}

        {SESSION_PRODUCTS_EXTRA_INFO.filter(
          item => item.id === productItems[productIndexToAdd].id
        )[0]?.bullets && (
          <ul className="text-hg-black500 text-sm mb-12 flex flex-col gap-2">
            {SESSION_PRODUCTS_EXTRA_INFO.filter(
              item => item.id === productItems[productIndexToAdd].id
            )[0]?.bullets?.map(bullet => (
              <li key={bullet} className="flex w-full gap-2">
                <div className="h-1 w-1 shrink-0 bg-hg-black400 rounded-full mt-2" />
                <p dangerouslySetInnerHTML={{ __html: bullet }} />
              </li>
            ))}
          </ul>
        )}

        <Button
          type="primary"
          className=""
          size="lg"
          onClick={() =>
            setSelectedTreatments([productItems[productIndexToAdd]])
          }
          href={ROUTES.checkout.type}
        >
          Reservar cita
          <SvgArrow height={16} width={16} className="ml-2" />
        </Button>
      </Flex>
    </Flex>
  );

  /* return (
    <div className="w-full">
      <Flex
        layout="row-between"
        className="items-start bg-hg-black50 p-3 rounded-xl md:flex-col"
      >
        <div className="w-full">
          <Text
            size="xl"
            className="w-full text-hg-secondary font-semibold mb-3 md:mb-0 md:px-3 md:pt-3 md:text-2xl"
          >
            {product.price} €
          </Text>
          <Text
            size="lg"
            className="w-full hidden font-semibold mb-3 md:block md:px-3 md:pb-3"
          >
            {product.title}
          </Text>
          <Flex
            layout="col-left"
            className="w-full md:bg-hg-black100 md:p-4 rounded-xl"
          >
            <Flex className="text-sm md:mx-3 mb-2">
              <icon.SvgTimeLeft
                className="text-hg-secondary mr-2"
                height={16}
                width={16}
              />
              {product.sessions}{' '}
              {product.sessions === 1 ? 'sesión' : 'sesiones'}
            </Flex>
            {!isDashboard && (
              <Button
                type="primary"
                className="hidden md:block shrink-0"
                onClick={() => {
                  setSelectedTreatments([product]);
                }}
                href={ROUTES.checkout.type}
              >
                Reservar cita
                <SvgArrow height={16} width={16} className="ml-2" />
              </Button>
            )}
          </Flex>
        </div>

        {isDashboard && (
          <Button
            size="sm"
            type="tertiary"
            className="mt-auto"
            customStyles="bg-hg-primary"
            onClick={e => {
              e.stopPropagation();
              addToCart(product as CartItem);
              setPendingDiscount(true);
            }}
          >
            <p className="mr-2">Añadir </p>
            <SvgPlusSmall height={20} width={20} />
          </Button>
        )}
      </Flex>
    </div>
  ); */
}
