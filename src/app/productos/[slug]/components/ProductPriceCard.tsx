import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import Dropdown from 'app/components/forms/Dropdown';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { ROUTES } from 'app/utils/routes';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import * as icon from 'icons/IconsDs';
import { SvgAdd, SvgArrow, SvgInjection, SvgMinus } from 'icons/IconsDs';
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
      { label: 'BabyBotox', value: 'BabyBotox' },
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
    title: 'Cóctel de vitaminas',
    icon: 'Medicine',
    options: [],
  },
};

export interface option {
  index: number;
  value: string;
}

function ProductPriceItemsCard({
  product,
  parentProduct,
}: {
  product: Product;
  parentProduct: Product;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPackOptions, setSelectedPackOptions] = useState(
    [] as option[]
  );

  const updateSelectedPackOptions = (newValue: string, index: number) => {
    const newOptions = [...selectedPackOptions];
    const itemToUpdate = newOptions.find((item: any) => item.index === index);

    if (itemToUpdate) {
      itemToUpdate.value = newValue;
    }

    setSelectedPackOptions(newOptions);
  };

  const itemsIconsByIndex = product.packUnities.map((item: any, index) => {
    const iconComponentName = `Svg${UPGRADE_TYPES[item.type.toString()].icon}`;
    const IconComponent = (icon as any)[iconComponentName] || null;

    return (
      <IconComponent
        key={index}
        height={16}
        width={16}
        className="text-hg-secondary mr-2"
      />
    );
  });

  const defaultValues = product.packUnities.map((item: any, index) => {
    const defaultValue =
      index === 0
        ? UPGRADE_TYPES[item?.type.toString()].options.find(
            x => parentProduct.title == x.label
          )
        : UPGRADE_TYPES[item?.type.toString()].options[0];
    return defaultValue;
  });

  useEffect(() => {
    const initialSelectedPackOptions = defaultValues.map((item, index) => {
      return { index: index, value: item?.value || '' };
    });

    setSelectedPackOptions(initialSelectedPackOptions);
  }, []);

  return (
    <Flex layout="col-left" className="w-full">
      {!product.isPack &&
        product.packUnities.map((item: any, index: number) => {
          return (
            <Flex
              key={UPGRADE_TYPES[item.type.toString()].title}
              layout="row-left"
            >
              {itemsIconsByIndex[index]}
              <Text className="text-sm md:text-md">
                {UPGRADE_TYPES[item.type.toString()].title}
              </Text>
            </Flex>
          );
        })}

      {product.isPack && (
        <>
          <form className="w-full" onSubmit={data => console.log(data)}>
            {product.packUnities.map((item: any, index: number) => {
              return (
                <div
                  className="w-full"
                  key={UPGRADE_TYPES[item.type.toString()].title}
                >
                  <Flex layout="row-left">
                    {itemsIconsByIndex[index]}
                    <Text className="text-sm md:text-md">
                      {UPGRADE_TYPES[item.type.toString()].title}
                    </Text>
                  </Flex>
                  {showDropdown && (
                    <Dropdown
                      className="mt-2 w-full mb-4"
                      options={UPGRADE_TYPES[item.type.toString()].options}
                      defaultValue={defaultValues[index]}
                      onChange={(value: any) => {
                        updateSelectedPackOptions(value.value, index);
                      }}
                    />
                  )}
                </div>
              );
            })}

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

            {showDropdown && (
              <Button
                type="tertiary"
                customStyles="bg-hg-primary"
                className="mt-4"
              >
                Reservar cita
                <SvgArrow height={16} width={16} className="ml-2" />
              </Button>
            )}
          </form>

          {!showDropdown && (
            <Button
              className="mt-4"
              type="tertiary"
              onClick={() => setShowDropdown(true)}
            >
              Seleccionar viales
            </Button>
          )}
        </>
      )}
    </Flex>
  );
}

export default function ProductPriceCard({
  product,
  index,
  parentProduct,
}: {
  product: Product;
  index: number;
  parentProduct: Product;
}) {
  const { deviceSize, setSelectedTreatments, stateProducts } =
    useGlobalPersistedStore(state => state);

  const setSelectedTreatment = (product: Product) => {
    const productToAdd = stateProducts.filter(x => product?.id === x.id)[0];
    setSelectedTreatments([productToAdd]);
  };

  return (
    <Flex className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary">
      <AccordionItem
        value={deviceSize.isMobile ? `accordion-${index}` : 'value'}
      >
        <AccordionTrigger
          className={`${!deviceSize.isMobile ? 'pointer-events-none' : ''}`}
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
                {index === 0 ? (
                  <Text
                    size="xs"
                    className="py-1 px-2 bg-hg-pink/20 text-hg-pink rounded-md"
                  >
                    Básico
                  </Text>
                ) : product.isPack ? (
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
                      className="ml-2 group-radix-state-open:hidden"
                    />
                    <SvgMinus
                      height={24}
                      width={24}
                      className="ml-2 hidden group-radix-state-open:block"
                    />
                  </>
                )}
              </Flex>
            </Flex>
            <Text className="font-semibold md:text-lg">{product.title}</Text>
          </Flex>
        </AccordionTrigger>

        <AccordionContent>
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
              <ProductPriceItemsCard
                product={product}
                parentProduct={parentProduct}
              />
            )}

            {product?.packMoreInformation && !product.isPack && (
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

            {!product.isPack && (
              <Button
                type="tertiary"
                customStyles="bg-hg-primary md:mt-4"
                onClick={() => {
                  setSelectedTreatment(product);
                }}
                href={ROUTES.checkout.clinics}
                className="mt-4"
              >
                Reservar cita
                <SvgArrow height={16} width={16} className="ml-2" />
              </Button>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Flex>
  );
}
