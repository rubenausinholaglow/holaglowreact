import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import DynamicIcon from 'app/components/common/DynamicIcon';
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
import { SvgAdd, SvgArrow, SvgInjection, SvgMinus } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const UPGRADE_TYPES: Record<
  string,
  {
    title: string;
    icon: string;
    family: string;
    options: { label: string; value: string }[];
  }
> = {
  '0': {
    title: '1 vial de ácido hialurónico',
    icon: 'SvgInjection',
    family: 'default',
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
        label: 'Relleno lineas marioneta',
        value: 'Relleno lineas marioneta',
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
        label: 'Volumen y perfilado de cejas',
        value: 'Volumen y perfilado de cejas',
      },
    ],
  },
  '1': {
    title: '0,5 viales de inyectable antiarrugas',
    icon: 'SvgInjection',
    family: 'default',
    options: [
      {
        label: 'Prevención arrugas - Baby botox',
        value: 'Prevención arrugas - Baby botox',
      },
      {
        label: 'Arrugas entrecejo y patas de gallo',
        value: 'Arrugas entrecejo y patas de gallo',
      },
    ],
  },
  '2': {
    title: '1 vial de inyectable antiarrugas',
    icon: 'SvgInjection',
    family: 'default',
    options: [
      {
        label: 'Arrugas expresión: Frente, entrecejo y patas de gallo',
        value: 'Arrugas expresión: Frente, entrecejo y patas de gallo',
      },
    ],
  },
  '3': {
    title: 'Piel',
    icon: 'SvgInjection',
    family: 'default',
    options: [
      {
        label: 'Hydrafacial express (1 sesión)',
        value: 'Hydrafacial',
      },
      {
        label: 'Mesoterapia (1 sesión)',
        value: 'Revitalización facial: Mesoterapia',
      },
    ],
  },
  '4': {
    title: 'Piel Profunda',
    icon: 'SvgInjection',
    family: 'default',
    options: [
      {
        label: 'Hydrafacial deluxe (1 sesión)',
        value: 'Hydrafacial: Deluxe',
      },
      {
        label: 'Dermapen (1 sesión)',
        value: 'Microneedling',
      },
    ],
  },
};

export interface option {
  index: number;
  value: string;
}

function ProductPriceItemsCard({
  product,
  parentProduct,
  setAccordionOverflow,
  isOpen,
}: {
  product: Product;
  parentProduct: Product;
  setAccordionOverflow: (value: string) => void;
  isOpen?: boolean;
}) {
  const { setSelectedTreatments, setSelectedPackTreatments, stateProducts } =
    useGlobalPersistedStore(state => state);

  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(isOpen);
  const [selectedPackOptions, setSelectedPackOptions] = useState(
    [] as option[]
  );

  const isDisabled =
    product.isPack &&
    selectedPackOptions.filter(x => x.value != '').length !=
      product.packUnities.length;

  const updateSelectedPackOptions = (newValue: string, index: number) => {
    const newOptions = [...selectedPackOptions];
    const itemToUpdate = newOptions.find((item: any) => item.index === index);

    if (itemToUpdate) {
      itemToUpdate.value = newValue;
    } else {
      newOptions.push({
        index: index,
        value: newValue,
      });
    }
    setSelectedPackOptions(newOptions);
  };

  const setSelectedTreatment = (product: Product) => {
    let productToAdd = stateProducts.filter(x => product?.id === x.id)[0];
    if (!productToAdd) productToAdd = product;
    setSelectedTreatments([productToAdd]);
    const packTreatments: Product[] = [];
    if (selectedPackOptions.length > 0) {
      selectedPackOptions.forEach(x => {
        packTreatments.push(stateProducts.filter(y => y?.title === x.value)[0]);
      });
    }
    setSelectedPackTreatments(packTreatments);
    if (
      selectedPackOptions.filter(x => x.value != '').length ==
      product.packUnities.length
    ) {
      router.push(ROUTES.checkout.clinics);
    }
  };

  const defaultValues: { label: string; value: string }[] = [];

  product.packUnities.forEach((item: any, index: any) => {
    if (index == 0) {
      const el = UPGRADE_TYPES[item?.type.toString()]?.options.find(
        x => parentProduct.title == x.label
      );
      if (el) defaultValues.push(el);
    }
  });

  useEffect(() => {
    const initialSelectedPackOptions = defaultValues.map((item, index) => {
      return { index: index, value: item?.value || '' };
    });

    setSelectedPackOptions(initialSelectedPackOptions);
  }, []);

  useEffect(() => {
    if (showDropdown) {
      setAccordionOverflow('overflow-visible');
    }

    if (!showDropdown) {
      setAccordionOverflow('overflow-hidden');
    }
  }, [showDropdown]);

  return (
    <Flex layout="col-left" className="w-full">
      {!showDropdown &&
        (!isEmpty(product.appliedProducts) ? (
          product.appliedProducts.map(item => {
            const iconName = item.icon.split('/')[0] || 'SvgCross';
            const iconFamily:
              | 'default'
              | 'category'
              | 'suggestion'
              | 'service' = (item.icon.split('/')[1] as 'default') || 'default';

            return (
              <Flex key={item.titlte} className="items-start mb-2">
                <DynamicIcon
                  height={16}
                  width={16}
                  className="mr-2 mt-0.5 text-hg-secondary shrink-0"
                  name={iconName}
                  family={iconFamily}
                />

                <Text>{item.titlte}</Text>
              </Flex>
            );
          })
        ) : (
          <Flex className="items-start mb-2">
            <SvgInjection
              height={16}
              width={16}
              className="mr-2 mt-0.5 text-hg-secondary shrink-0"
            />
            <Text>{product.description}</Text>
          </Flex>
        ))}

      {showDropdown && (
        <form className="w-full">
          {product.packUnities.map((item: any, index: number) => {
            return (
              <div
                className="w-full"
                key={UPGRADE_TYPES[item.type.toString()].title}
              >
                <Flex layout="row-left" className="items-start">
                  <DynamicIcon
                    height={16}
                    width={16}
                    className="mr-2 mt-0.5 text-hg-secondary shrink-0"
                    name={UPGRADE_TYPES[item.type.toString()].icon}
                    family={
                      (UPGRADE_TYPES[item.type.toString()].family as
                        | 'default'
                        | 'suggestion'
                        | 'service'
                        | 'category'
                        | undefined) || 'default'
                    }
                  />
                  <Text className="text-sm md:text-md">
                    {UPGRADE_TYPES[item.type.toString()].title}
                  </Text>
                </Flex>
                <Dropdown
                  className="mt-2 w-full mb-4"
                  options={UPGRADE_TYPES[item.type.toString()].options}
                  defaultValue={defaultValues[index]}
                  onChange={(value: any) => {
                    updateSelectedPackOptions(value.value, index);
                  }}
                />
              </div>
            );
          })}
        </form>
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
      {product.isPack && !showDropdown && (
        <Button
          className="mt-8"
          type="tertiary"
          customStyles="hover:bg-hg-secondary100"
          onClick={() => setShowDropdown(true)}
        >
          Personalizar
        </Button>
      )}
      {(!product.isPack || showDropdown) && (
        <Button
          type="tertiary"
          disabled={isDisabled}
          onClick={() => {
            setSelectedTreatment(product);
          }}
          className="mt-8"
        >
          Reservar cita
          <SvgArrow height={16} width={16} className="ml-2" />
        </Button>
      )}
    </Flex>
  );
}

export default function ProductPriceCard({
  product,
  index,
  parentProduct,
  fullWidthPack = false,
  className,
}: {
  product: Product;
  index: number;
  parentProduct: Product;
  fullWidthPack?: boolean;
  className?: string;
}) {
  const { deviceSize } = useGlobalPersistedStore(state => state);
  const [accordionOverflow, setAccordionOverflow] = useState('overflow-hidden');

  return (
    <Flex
      className={`bg-white p-3 rounded-2xl w-full shadow-centered-secondary ${className}`}
    >
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
                {product.isPack && (
                  <Text
                    size="xs"
                    className="py-1 px-2 bg-hg-turquoise/20 text-hg-turquoise rounded-md"
                  >
                    Oferta especial
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
            {product.isPack && deviceSize.isMobile && (
              <Text className="font-semibold md:text-lg">
                ¡Tu eliges la zona!
              </Text>
            )}
          </Flex>
        </AccordionTrigger>

        <AccordionContent
          className={twMerge(
            `data-[state=closed]:overflow-hidden ${accordionOverflow}`
          )}
        >
          <Flex
            layout="col-left"
            className={`md:flex-row items-start mt-3 ${
              fullWidthPack && !deviceSize.isMobile ? 'md:p-4' : ''
            }`}
          >
            {fullWidthPack && !deviceSize.isMobile && (
              <div className="md:w-1/2 shrink-0">
                <Text className="font-semibold md:text-lg mb-2">
                  ¡Tu eliges la zona!
                </Text>
                {!isEmpty(product.appliedProducts) ? (
                  <>
                    {product.appliedProducts.map(item => (
                      <Text key={item.titlte}>{item.titlte}</Text>
                    ))}
                    {product?.packMoreInformation && (
                      <p>{product?.packMoreInformation}</p>
                    )}
                  </>
                ) : (
                  <Flex className="items-start mb-2">
                    <SvgInjection
                      height={16}
                      width={16}
                      className="mr-2 mt-0.5 text-hg-secondary shrink-0"
                    />
                    <Text>{product.description}</Text>
                  </Flex>
                )}
              </div>
            )}
            <div
              className={`bg-hg-black50 p-3 w-full rounded-xl ${
                fullWidthPack && !deviceSize.isMobile ? 'md:w-1/2' : ''
              }`}
            >
              <ProductPriceItemsCard
                product={product}
                parentProduct={parentProduct}
                setAccordionOverflow={setAccordionOverflow}
                isOpen={fullWidthPack && !deviceSize.isMobile}
              />
            </div>
          </Flex>
        </AccordionContent>
      </AccordionItem>
    </Flex>
  );
}
