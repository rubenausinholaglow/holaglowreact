import { useState } from 'react';
import { Product } from '@interface/product';
import Dropdown from 'app/components/forms/Dropdown';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { ROUTES } from 'app/utils/routes';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgAdd, SvgArrow, SvgInjection, SvgMinus } from 'icons/IconsDs';
import * as icon from 'icons/IconsDs';
import { isEmpty } from 'lodash';

const UPGRADE_TYPES: Record<
  string,
  {
    title: string;
    icon: string;
    options: { label: string; value: string }[];
  }
> = {
  '0': {
    title: 'Ácido Hialurónico',
    icon: 'Injection',
    options: [
      {
        label: 'Aumento de labios',
        value: 'Aumento de labios',
      },
      {
        label: 'Código de barras',
        value: 'Código de barras',
      },
      {
        label: 'Proyección de mandíbula',
        value: 'Proyección de mandíbula',
      },
      {
        label: 'Proyección de mentón',
        value: 'Proyección de mentón',
      },
      {
        label: 'Proyección de Pómulos',
        value: 'Proyección de Pómulos',
      },
      {
        label: 'Relleno de ojeras',
        value: 'Relleno de ojeras',
      },
      {
        label: 'Relleno lineas marioneta',
        value: 'Relleno lineas marioneta',
      },
      {
        label: 'Rinomodelación',
        value: 'Rinomodelación',
      },
      {
        label: 'Sonrisa Gingival',
        value: 'Sonrisa Gingival',
      },
      {
        label: 'Surco Nasogeniano',
        value: 'Surco Nasogeniano',
      },
      {
        label: 'Volumen y perfilado de Cejas',
        value: 'Volumen y perfilado de Cejas',
      },
    ],
  },
  '1': {
    title: 'BabyBotox',
    icon: 'Injection',
    options: [
      { label: 'Baby botox', value: 'Baby botox' },
      {
        label: 'Arrugas entrecejo y patas de gallo',
        value: 'Arrugas entrecejo y patas de gallo',
      },
    ],
  },
  '2': {
    title: 'Botox',
    icon: 'Injection',
    options: [
      {
        label: 'Arrugas expresión: frente, entrecejo y patas de gallo',
        value: 'Arrugas expresión: frente, entrecejo y patas de gallo',
      },
    ],
  },
  '3': {
    title: 'Piel',
    icon: 'Injection',
    options: [
      {
        label: 'Hydrafacial express (1 sesión)',
        value: 'Hydrafacial express (1 sesión)',
      },
      {
        label: 'Mesoterapia (1 sesión)',
        value: 'Mesoterapia (1 sesión)',
      },
    ],
  },
  '4': {
    title: 'Piel Profunda',
    icon: 'Injection',
    options: [
      {
        label: 'Hydrafacial deluxe (1 sesión)',
        value: 'Hydrafacial deluxe (1 sesión)',
      },
      {
        label: 'Dermapen (1 sesión)',
        value: 'Dermapen (1 sesión)',
      },
    ],
  },
  '5': {
    title: 'Vitaminas',
    icon: 'Medicine',
    options: [],
  },
};

function ProductPackItem({
  item,
  showDropdown,
}: {
  item: any;
  showDropdown: boolean;
}) {
  const iconComponentName = `Svg${UPGRADE_TYPES[item.type.toString()].icon}`;
  const IconComponent = (icon as any)[iconComponentName] || null;

  return (
    <Flex layout="col-left" className="w-full">
      <Flex layout="row-left">
        <IconComponent
          height={16}
          width={16}
          className="text-hg-secondary mr-2"
        />
        <Text className="text-sm md:text-md">
          {UPGRADE_TYPES[item.type.toString()].title}
        </Text>
      </Flex>

      {showDropdown && (
        <Dropdown
          className="mt-2 w-full mb-4"
          options={UPGRADE_TYPES[item.type.toString()].options}
        />
      )}
    </Flex>
  );
}

function ProductPriceItem({
  product,
  isSessionProduct = false,
}: {
  product: Product;
  isSessionProduct?: boolean;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { setSelectedTreatments } = useGlobalPersistedStore(state => state);

  return (
    <>
      {isSessionProduct && (
        <>
          <Text
            size="2xl"
            className="pt-6 px-6 font-semibold text-hg-secondary hidden md:block"
          >
            {product.price} €
          </Text>
          <Text size="lg" className="pb-6 px-6 font-semibold hidden md:block">
            {product.title.slice(0, -4)}
          </Text>

          <div className="md:p-4 md:pt-0 w-full">
            <Flex
              layout="row-between"
              className="items-start bg-hg-black50 p-3 rounded-xl md:flex-col"
            >
              <div>
                <Text
                  size="xl"
                  className="text-hg-secondary font-semibold mb-3 md:hidden"
                >
                  {product.price} €
                </Text>
                <Flex className="text-sm">
                  <icon.SvgTimeLeft
                    className="text-hg-secondary mr-2"
                    height={16}
                    width={16}
                  />
                  {product.sessions}{' '}
                  {product.sessions === 1 ? 'sesión' : 'sesiones'}
                </Flex>
              </div>
              <Button
                type="tertiary"
                customStyles="bg-hg-primary md:mt-4"
                onClick={() => {
                  setSelectedTreatments([product]);
                }}
                href={ROUTES.checkout.clinics}
              >
                Reservar cita
                <SvgArrow height={16} width={16} className="ml-2" />
              </Button>
            </Flex>
          </div>
        </>
      )}

      {!isSessionProduct && (
        <div className="bg-hg-black50 p-3 w-full rounded-xl">
          {isEmpty(product.packUnities) ? (
            <Flex layout="row-left">
              <SvgInjection
                height={16}
                width={16}
                className="text-hg-secondary mr-2"
              />
              <Text size="sm">{product.description}</Text>
            </Flex>
          ) : (
            <Flex layout="col-left" className="gap-1">
              {product.packUnities.map((item, index) => (
                <ProductPackItem
                  item={item}
                  key={index}
                  showDropdown={showDropdown}
                />
              ))}
            </Flex>
          )}

          {product?.packMoreInformation && (
            <Accordion>
              <AccordionItem value="accordion">
                <AccordionContent>
                  <p className="pl-5 pt-3 pb-0 text-sm md:text-md">
                    {product?.packMoreInformation}
                  </p>
                </AccordionContent>
                <AccordionTrigger>
                  <span className="text-hg-secondary underline block text-left pt-3 pl-5 text-sm md:text-md">
                    + info
                  </span>
                </AccordionTrigger>
              </AccordionItem>
            </Accordion>
          )}

          {product.isPack ? (
            <Button
              type="tertiary"
              className="mt-4"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Seleccionar viales
            </Button>
          ) : (
            <Button
              type="tertiary"
              customStyles="bg-hg-primary md:mt-4"
              onClick={() => {
                setSelectedTreatments([product]);
              }}
              href={ROUTES.checkout.clinics}
            >
              Reservar cita
              <SvgArrow height={16} width={16} className="ml-2" />
            </Button>
          )}
        </div>
      )}
    </>
  );
}

export default function ProductPrices({ product }: { product: Product }) {
  const { deviceSize } = useGlobalPersistedStore(state => state);

  const isSessionProduct =
    !isEmpty(product.upgrades) &&
    product.upgrades?.every(upgrade => {
      const regex = / x /;
      return regex.test(upgrade.product.title);
    });

  const areUpgradesSessionProducts =
    !isEmpty(product.upgrades) &&
    product.upgrades.every(upgrade => {
      const regex = / x /;
      return regex.test(upgrade.product.title);
    });

  return (
    <div
      className="bg-gradient from-hg-secondary500 to-hg-primary300"
      id="prices"
    >
      <Container className="py-12">
        <Title size="2xl" className="font-bold mb-6 md:mb-12">
          <Underlined color={HOLAGLOW_COLORS['primary']}>
            Personaliza
          </Underlined>{' '}
          tu experiencia
        </Title>

        <Flex layout="col-left" className="md:flex-row mb-8 gap-8">
          {!isSessionProduct && (
            <>
              <Flex className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary">
                <Accordion value="accordion">
                  <AccordionItem value="accordion">
                    <AccordionTrigger
                      className={`${
                        !deviceSize.isMobile ? 'pointer-events-none' : ''
                      }`}
                    >
                      <Flex layout="col-left" className="p-3">
                        <Flex layout="row-between" className="w-full">
                          <Text
                            size="xl"
                            className="text-hg-secondary font-semibold md:text-2xl"
                          >
                            {product.price} €
                          </Text>
                          <Flex layout="row-right">
                            <Text
                              size="xs"
                              className="py-1 px-2 bg-hg-pink/20 text-hg-pink rounded-md"
                            >
                              Básico
                            </Text>

                            {deviceSize.isMobile && (
                              <>
                                <SvgAdd
                                  height={24}
                                  width={24}
                                  className="ml-4 group-radix-state-open:hidden"
                                />
                                <SvgMinus
                                  height={24}
                                  width={24}
                                  className="ml-4 hidden group-radix-state-open:block"
                                />
                              </>
                            )}
                          </Flex>
                        </Flex>
                        <Text className="font-semibold md:text-lg">
                          {product.title}
                        </Text>
                      </Flex>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ProductPriceItem product={product} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Flex>

              {product.upgrades
                ?.sort((a, b) => a.order - b.order)
                ?.map((upgrade: any, index) => {
                  const { product }: { product: Product } = upgrade;

                  return (
                    <Flex
                      key={product.id}
                      className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary"
                    >
                      <Accordion
                        value={`${
                          deviceSize.isMobile ? '' : `accordion${index}`
                        }`}
                      >
                        <AccordionItem value={`accordion${index}`}>
                          <AccordionTrigger
                            className={`${
                              !deviceSize.isMobile ? 'pointer-events-none' : ''
                            }`}
                          >
                            <Flex layout="col-left" className="p-3">
                              <Flex layout="row-between" className="w-full">
                                <Text
                                  size="xl"
                                  className="text-hg-secondary font-semibold md:text-2xl"
                                >
                                  {product.price} €
                                </Text>
                                <Flex layout="row-right">
                                  {product.isPack ? (
                                    <Text
                                      size="xs"
                                      className="py-1 px-2 bg-hg-turquoise/20 text-hg-turquoise rounded-md"
                                    >
                                      Oferta especial
                                    </Text>
                                  ) : (
                                    <Text
                                      size="xs"
                                      className="py-1 px-2 bg-hg-orange/20 text-hg-orange rounded-md"
                                    >
                                      Upgrade
                                    </Text>
                                  )}
                                  {deviceSize.isMobile && (
                                    <>
                                      <SvgAdd
                                        height={24}
                                        width={24}
                                        className="ml-4 group-radix-state-open:hidden"
                                      />
                                      <SvgMinus
                                        height={24}
                                        width={24}
                                        className="ml-4 hidden group-radix-state-open:block"
                                      />
                                    </>
                                  )}
                                </Flex>
                              </Flex>
                              <Text className="font-semibold md:text-lg">
                                {product.title}
                              </Text>
                            </Flex>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ProductPriceItem product={product} />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </Flex>
                  );
                })}
            </>
          )}

          {areUpgradesSessionProducts && (
            <Flex layout="col-left" className="w-full">
              <Flex
                layout="col-left"
                className="md:flex-row bg-white md:bg-transparent p-3 md:p-0 rounded-2xl w-full shadow-centered-secondary md:shadow-none gap-4 md:gap-16"
              >
                <Flex
                  layout="col-left"
                  className="w-full md:shadow-centered-secondary md:bg-white rounded-2xl"
                >
                  <Text className="p-3 pb-0 font-semibold md:hidden">
                    {product.title}
                  </Text>
                  <ProductPriceItem product={product} isSessionProduct />
                </Flex>

                {product.upgrades
                  ?.sort((a, b) => a.order - b.order)
                  ?.map(upgrade => {
                    return (
                      <Flex
                        key={upgrade.product.title}
                        layout="col-left"
                        className="w-full md:shadow-centered-secondary md:bg-white rounded-2xl"
                      >
                        <ProductPriceItem
                          product={upgrade.product}
                          isSessionProduct
                        />
                      </Flex>
                    );
                  })}
              </Flex>
            </Flex>
          )}

          {/* {product.isPack && (
            <Flex layout="col-left" className="w-full gap-4">
              <Flex
                layout="col-left"
                className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary"
              >
                <Flex layout="row-between" className="w-full p-2 mb-4">
                  <Text size="xl" className="font-semibold text-hg-secondary">
                    1.299 €
                  </Text>
                  <Text
                    size="xs"
                    className="py-1 px-2 bg-hg-orange/20 text-hg-orange rounded-md"
                  >
                    Upgrade
                  </Text>
                </Flex>

                <Flex
                  layout="col-left"
                  className="bg-hg-black50 p-3 gap-2 rounded-xl w-full"
                >
                  <Flex layout="row-left">
                    <SvgInjection
                      height={16}
                      width={16}
                      className="text-hg-secondary mr-2"
                    />
                    <Text className="font-semibold">{product.title}</Text>
                  </Flex>

                  <Select
                    options={selectOptions}
                    className="w-full mb-2"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        borderRadius: '12px',
                        background: state.hasValue
                          ? 'url("/images/forms/formCheck.svg") no-repeat center right 6px'
                          : 'url("/images/forms/formAngle.svg") no-repeat center right 6px',
                        borderColor: state.isFocused
                          ? `${HOLAGLOW_COLORS['secondary']}`
                          : `${HOLAGLOW_COLORS['black']}`,
                      }),
                      singleValue: (baseStyles, state) => ({
                        ...baseStyles,
                        color: state.hasValue
                          ? `${HOLAGLOW_COLORS['secondary']}`
                          : `${HOLAGLOW_COLORS['black300']}`,
                      }),
                      indicatorSeparator: () => ({ display: 'none' }),
                      indicatorsContainer: () => ({ display: 'none' }),
                    }}
                  />

                  <Flex layout="row-left">
                    <SvgInjection
                      height={16}
                      width={16}
                      className="text-hg-secondary mr-2"
                    />
                    <Text className="font-semibold">{product.title}</Text>
                  </Flex>

                  <Select
                    options={selectOptions}
                    className="w-full mb-2"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        background: state.hasValue
                          ? 'url("/images/forms/formCheck.svg") no-repeat center right 6px'
                          : 'url("/images/forms/formAngle.svg") no-repeat center right 6px',
                        borderColor: state.isFocused
                          ? `${HOLAGLOW_COLORS['secondary']}`
                          : `${HOLAGLOW_COLORS['black']}`,
                      }),
                      indicatorSeparator: () => ({ display: 'none' }),
                      indicatorsContainer: () => ({ display: 'none' }),
                    }}
                  />
                  <Flex layout="row-left">
                    <SvgInjection
                      height={16}
                      width={16}
                      className="text-hg-secondary mr-2"
                    />
                    <Text className="font-semibold">{product.title}</Text>
                  </Flex>

                  <Select
                    options={selectOptions}
                    className="w-full mb-2"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        background: state.hasValue
                          ? 'url("/images/forms/formCheck.svg") no-repeat center right 6px'
                          : 'url("/images/forms/formAngle.svg") no-repeat center right 6px',
                        borderColor: state.isFocused
                          ? `${HOLAGLOW_COLORS['secondary']}`
                          : `${HOLAGLOW_COLORS['black']}`,
                      }),
                      indicatorSeparator: () => ({ display: 'none' }),
                      indicatorsContainer: () => ({ display: 'none' }),
                    }}
                  />
                </Flex>
              </Flex>
            </Flex>
          )} */}
        </Flex>

        <Flex className="bg-white/30 md:bg-transparent p-4 rounded-xl w-full md:w-auto gap-8 justify-center">
          <Text>Comparte</Text>
          <icon.SvgInstagram />
          <icon.SvgFacebook />
          <icon.SvgX />
          <icon.SvgShare />
        </Flex>
      </Container>
    </div>
  );
}
