'use client';

import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { SvgAngleDown, SvgCalendar } from 'app/icons/Icons';
import {
  SvgEuro,
  SvgInjection,
  SvgTimeLeft,
  SvgTimer,
} from 'app/icons/IconsDs';
import { EmlaType, Product } from 'app/types/product';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import dynamic from 'next/dynamic';

const PepperWidget = dynamic(() => import('./PepperWidget'));
const ProductSelectorButton = dynamic(() => import('./ProductSelectorButton'), {
  ssr: false,
});

const HYDRAFACIAL_CONFIG = [
  {
    title: 'Hydrafacial Express',
    description:
      'Es la opción ideal para quienes buscan una limpieza facial en profundidad e hidratar el rostro. Tiene una duración de 30 minutos. El tratamiento empieza eliminando impurezas mediante una limpieza y un peeling suave y a continuación se eliminan puntos negros y obstrucciones de los poros. Para acabar, se aplica una hidratación intensiva que nutre y rejuvenece la piel.',
    products: 'Limpieza profunda',
    duration: '30 minutos',
    price: 'desde 150 €',
  },
  {
    title: 'Hydrafacial Deluxe',
    description:
      'El Hydrafacial Deluxe tiene una duración de 45 minutos e incluye todos los pasos de la versión Express y añade un booster personalizado según el efecto que quieras potenciar. Consúltanos y te ayudaremos a encontrar el tuyo (Dermaluilder, Peritenol, Regen GE, Nassif MD, Circadia Protec Plus y Circadia Skin Energizing). El tratamiento terminará con una terapia LED para estimular la producción de colágeno y promover una piel más firme y luminosa.',
    products: 'Limpieza profunda + Booster personalizado',
    duration: '45 minutos',
    price: 'desde 180 €',
  },
  {
    title: 'Hydrafacial Platinum',
    description:
      'Es la experiencia más completa de Hydrafacial. Combina todos los beneficios de la versión Deluxe añadiendo además un drenaje linfático que elimina toxinas y mejora la circulación. Es el tratamiento ideal para lograr una piel libre de toxinas y visiblemente más firme y luminosa en un tratamiento de 60 minutos.',
    products: 'Limpieza profunda + Booster personalizado + Drenaje linfático',
    duration: '60 minutos',
    price: 'desde 240 €',
  },
];

export default function ProductInfoSSR({ product }: { product: Product }) {
  const handleScroll = () => {
    const element = document.getElementById('prices');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container className="mb-12 ">
      {process.env.NEXT_PUBLIC_HYDRAFACIAL_ID !== product.id && (
        <div className="md:flex gap-8 justify-between items-start bg-derma-secondary400 md:rounded-2xl w-full">
          <Container className="py-6 md:px-6 md:flex md:flex-col md:justify-center md:items-start">
            <Title size="2xl" className="font-bold mb-8 md:hidden">
              Tu tratamiento
            </Title>
            <ul className="flex flex-col pb-4 w-full mb-4">
              <li className="mb-4 pb-4 border-b border-hg-black flex">
                {!isEmpty(product.appliedProducts) ? (
                  product.appliedProducts.map(item => {
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

                        <Text className="font-semibold md:text-lg">
                          {item.titlte}
                        </Text>
                      </Flex>
                    );
                  })
                ) : (
                  <Flex className="items-start">
                    <SvgInjection
                      height={24}
                      width={24}
                      className="mr-3 text-hg-secondary shrink-0"
                    />

                    <Text className="font-semibold md:text-lg">
                      {product.description}
                    </Text>
                  </Flex>
                )}
              </li>
              {(product.sessions > 0 || product.applicationTimeMinutes > 0) && (
                <li className="mb-4 pb-4 border-b border-hg-black flex">
                  <div
                    className={`flex relative md:justify-center flex-col w-full`}
                  >
                    {product.sessions > 0 && (
                      <>
                        <div className={`flex-1 flex items-start pr-4w-full`}>
                          <SvgTimeLeft
                            height={24}
                            width={24}
                            className="text-hg-secondary mr-3"
                          />
                          <Text className="font-semibold md:text-lg">
                            {product.sessions.toString()}{' '}
                            {product.sessions === 1 ? 'sesión' : 'sesiones'}
                          </Text>
                        </div>
                      </>
                    )}
                  </div>
                </li>
              )}

              <li className="mb-4 pb-4 border-b border-hg-black flex">
                <SvgTimer
                  height={24}
                  width={24}
                  className="text-hg-secondary mr-3"
                />
                <div>
                  <Text className="font-semibold md:text-lg">
                    {product.emlaType === EmlaType.Required
                      ? product.applicationTimeMinutes * 2 + ''
                      : product.applicationTimeMinutes?.toString()}{' '}
                    minutos
                  </Text>
                </div>
              </li>

              <li className="mb-4 pb-4 border-b border-hg-black flex">
                <SvgCalendar
                  height={24}
                  width={24}
                  className="text-hg-secondary mr-3"
                />
                <div className="flex flex-col">
                  {product.durationMin >= 30 ? (
                    <Text className="font-semibold md:text-lg">
                      Duración de {(product.durationMin / 30).toString()}
                      {product.durationMax == product.durationMin && ' meses'}
                      {product.durationMax != product.durationMin &&
                        ' a ' +
                          (product.durationMax / 30).toString() +
                          ' meses'}
                    </Text>
                  ) : (
                    <Text className="font-semibold md:text-lg">Permanente</Text>
                  )}
                </div>
              </li>

              <li className="flex">
                <SvgEuro
                  height={24}
                  width={24}
                  className="text-hg-secondary mr-3"
                />
                <div className="flex flex-col">
                  <Text className="font-semibold md:text-lg">
                    {product.price} €
                  </Text>
                </div>
              </li>
            </ul>

            <ProductSelectorButton product={product} />
            {product.price < 2000 && <PepperWidget price={product.price} />}
          </Container>
        </div>
      )}

      {process.env.NEXT_PUBLIC_HYDRAFACIAL_ID === product.id && (
        <Accordion
          type="single"
          defaultValue="item-0"
          className="flex flex-col w-full gap-4"
        >
          {HYDRAFACIAL_CONFIG.map((item, index) => (
            <AccordionItem
              key={item.title}
              value={`item-${index}`}
              className="rounded-2xl overflow-hidden"
            >
              <AccordionTrigger>
                <Flex className="w-full justify-between bg-derma-secondary500 p-4">
                  <Text className="md:text-lg text-left font-semibold">
                    {item.title}
                  </Text>
                  <SvgAngleDown
                    height={24}
                    width={24}
                    className="transition-transform origin-center group-radix-state-open:rotate-180 group-radix-state-open:duration-200 shrink-0"
                  />
                </Flex>
              </AccordionTrigger>
              <AccordionContent>
                <div className="md:flex gap-8 justify-between items-start bg-derma-secondary400 w-full">
                  <Container className="py-6 md:px-6 md:flex md:flex-col md:justify-center md:items-start">
                    <ul className="flex flex-col pb-4 w-full mb-4">
                      <li className="mb-4 pb-4 flex text-sm text-hg-black500">
                        {item.description}
                      </li>
                      <li className="mb-4 pb-4 border-b border-hg-black flex">
                        <Flex className="items-start">
                          <SvgInjection
                            height={24}
                            width={24}
                            className="mr-3 text-hg-secondary shrink-0"
                          />

                          <Text className="font-semibold md:text-lg">
                            {item.products}
                          </Text>
                        </Flex>
                      </li>
                      {/*                       {(product.sessions > 0 ||
                        product.applicationTimeMinutes > 0) && (
                        <li className="mb-4 pb-4 border-b border-hg-black flex">
                          <div
                            className={`flex relative md:justify-center flex-col w-full`}
                          >
                            {product.sessions > 0 && (
                              <>
                                <div
                                  className={`flex-1 flex items-start pr-4w-full`}
                                >
                                  <SvgTimeLeft
                                    height={24}
                                    width={24}
                                    className="text-hg-secondary mr-3"
                                  />
                                  <Text className="font-semibold md:text-lg">
                                    {product.sessions.toString()}{' '}
                                    {product.sessions === 1
                                      ? 'sesión'
                                      : 'sesiones'}
                                  </Text>
                                </div>
                              </>
                            )}
                          </div>
                        </li>
                      )} */}

                      <li className="mb-4 pb-4 border-b border-hg-black flex">
                        <SvgTimer
                          height={24}
                          width={24}
                          className="text-hg-secondary mr-3"
                        />
                        <div>
                          <Text className="font-semibold md:text-lg">
                            {item.duration}
                          </Text>
                        </div>
                      </li>

                      <li className="mb-4 pb-4 border-b border-hg-black flex">
                        <SvgCalendar
                          height={24}
                          width={24}
                          className="text-hg-secondary mr-3"
                        />
                        <div className="flex flex-col">
                          {product.durationMin >= 30 ? (
                            <Text className="font-semibold md:text-lg">
                              Duración de{' '}
                              {(product.durationMin / 30).toString()}
                              {product.durationMax == product.durationMin &&
                                ' meses'}
                              {product.durationMax != product.durationMin &&
                                ' a ' +
                                  (product.durationMax / 30).toString() +
                                  ' meses'}
                            </Text>
                          ) : (
                            <Text className="font-semibold md:text-lg">
                              Permanente
                            </Text>
                          )}
                        </div>
                      </li>

                      <li className="flex">
                        <SvgEuro
                          height={24}
                          width={24}
                          className="text-hg-secondary mr-3"
                        />
                        <div className="flex flex-col">
                          <Text className="font-semibold md:text-lg">
                            {item.price}
                          </Text>
                        </div>
                      </li>
                    </ul>

                    <Button
                      onClick={() => handleScroll()}
                      size="lg"
                      type="primary"
                      className="mb-6 md:mb-0 md:mt-auto"
                      id="tmevent_click_book_anchor_button"
                    >
                      Me interesa
                    </Button>

                    {product.price < 2000 && (
                      <PepperWidget price={product.price} />
                    )}
                  </Container>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </Container>
  );
}
