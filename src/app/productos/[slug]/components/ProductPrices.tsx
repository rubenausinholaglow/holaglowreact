'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import Dropdown from 'app/components/forms/Dropdown';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { ROUTES } from 'app/utils/routes';
import { group } from 'console';
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

import ProductPriceCard from './ProductPriceCard';
import ProductSessionGroupedPriceCard from './ProductSessionGroupedPriceCard';
import ProductSessionPriceCard from './ProductSessionPriceCard';

/* function ProductPackItem({
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
} */

/* const isSessionProduct =
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
  }); */

export default function ProductPrices({ product }: { product: Product }) {
  const { deviceSize } = useGlobalPersistedStore(state => state);
  const [productItems, setProductITems] = useState<any>([]);
  const [isSessionProduct, setIsSessionProduct] = useState<any>(false);
  const [groupedSessionProducts, setGroupedSessionProducts] = useState<
    Product[][] | null
  >([]);

  useEffect(() => {
    console.log(product.upgrades);

    if (product.upgrades) {
      const AllProducts = product.upgrades.map(item => item.product);

      setProductITems(AllProducts);
    }
  }, [product]);

  useEffect(() => {
    console.log(productItems);

    if (!isEmpty(productItems)) {
      console.log(
        productItems.map((item: Product) => item.title),
        product.title
      );

      setIsSessionProduct(
        productItems
          .map((item: Product) => item.title)
          .every((item: string) => item.includes(product.title))
      );
    }
  }, [productItems]);

  useEffect(() => {
    function groupProductsByTitle(arr: Product[]) {
      const groupedSessionProducts: { [key: string]: Product[] } = {};

      for (const item of arr) {
        if (!groupedSessionProducts[item.title]) {
          groupedSessionProducts[item.title] = [];
        }

        groupedSessionProducts[item.title].push(item);
      }

      return Object.values(groupedSessionProducts);
    }

    const groupedArrays: Product[][] = groupProductsByTitle(productItems);

    if (groupedArrays.length !== productItems.length) {
      setGroupedSessionProducts(groupedArrays);
    }
  }, [isSessionProduct]);

  if (isEmpty(productItems)) {
    return <></>;
  }

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

        {!isSessionProduct && (
          <Flex layout="col-left" className="md:flex-row mb-8 gap-8">
            <Accordion
              value={deviceSize.isMobile ? 'accordion-0' : 'value'}
              className="flex flex-col gap-4 mb-8 md:flex-row md:gap-16 items-start"
            >
              {productItems.map((item: Product, index: number) => (
                <ProductPriceCard
                  key={item.title}
                  product={item}
                  index={index}
                />
              ))}
            </Accordion>
          </Flex>
        )}

        {isSessionProduct && isEmpty(groupedSessionProducts) && (
          <Flex layout="col-left" className="md:flex-row md:gap-8">
            <Flex
              layout="col-left"
              className="bg-white p-3 md:p-0 rounded-2xl w-full shadow-centered-secondary md:bg-transparent md:shadow-none"
            >
              <Text className="p-3 font-semibold md:hidden">
                {product.title}
              </Text>

              <Flex
                layout="col-left"
                className="gap-4 p-3 w-full md:flex-row md:gap-12"
              >
                {productItems.map((item: Product, index: number) => {
                  if (item.price > 0) {
                    return (
                      <ProductSessionPriceCard
                        key={item.title}
                        product={item}
                        index={index}
                      />
                    );
                  }
                })}
              </Flex>
            </Flex>
          </Flex>
        )}

        {isSessionProduct && !isEmpty(groupedSessionProducts) && (
          <Flex
            layout="col-left"
            className="w-full gap-4 md:gap-12 md:flex-row"
          >
            {groupedSessionProducts?.map((products, productIndex) => (
              <Flex
                layout="col-left"
                className="w-full md:flex-row md:gap-8"
                key={`productGroup-${productIndex}`}
              >
                <Flex
                  layout="col-left"
                  className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary "
                >
                  <Text className="p-3 font-semibold md:text-lg">
                    {products[0].title}
                  </Text>

                  <Flex layout="col-left" className="gap-4 w-full">
                    {products.map((item: Product, index: number) => {
                      if (item.price > 0) {
                        return (
                          <ProductSessionGroupedPriceCard
                            key={`product-card-${index}`}
                            product={item}
                            index={index}
                          />
                        );
                      }
                      return null;
                    })}
                  </Flex>
                </Flex>
              </Flex>
            ))}
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

                <Dropdown
                  options={[
                    { value: 'test', label: 'test' },
                    { value: 'test2', label: 'test2' },
                  ]}
                  className="w-full mb-2"
                />

                <Flex layout="row-left">
                  <SvgInjection
                    height={16}
                    width={16}
                    className="text-hg-secondary mr-2"
                  />
                  <Text className="font-semibold">{product.title}</Text>
                </Flex>

                <Dropdown
                  options={[
                    { value: 'test', label: 'test' },
                    { value: 'test2', label: 'test2' },
                  ]}
                  className="w-full mb-2"
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
