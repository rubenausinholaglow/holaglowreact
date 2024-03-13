import { useEffect, useState } from 'react';
import { fetchProduct } from '@utils/fetch';
import ROUTES from '@utils/routes';
import { Quantifier } from 'app/(dashboard)/dashboard/(pages)/budgets/HightLightedProduct/Quantifier';
import {
  Operation,
  useCartStore,
} from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { useDeviceSizeSSR } from 'app/(web)/components/layout/Breakpoint';
import { SvgArrow, SvgGlow, SvgInjection } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { CartItem, Product } from 'app/types/product';
import { getDiscountedPrice } from 'app/utils/common';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/navigation';

const UPGRADE_TYPES: Record<
  string,
  {
    title: string;
    icon: string;
    family: string;
    options: { label: string; value: string }[];
  }
> = {
  '1': {
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
  '2': {
    title: '0,5 viales de inyectable antiarrugas',
    icon: 'SvgInjection',
    family: 'default',
    options: [
      {
        label: 'Prevención arrugas',
        value: 'Prevención arrugas',
      },
      {
        label: 'Arrugas entrecejo y patas de gallo',
        value: 'Arrugas entrecejo y patas de gallo',
      },
    ],
  },
  '3': {
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
  '4': {
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
  '5': {
    title: 'Piel Profunda',
    icon: 'SvgInjection',
    family: 'default',
    options: [
      {
        label: 'Hydrafacial deluxe (1 sesión)',
        value: 'Hydrafacial',
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
  isDashboard = false,
  product,
}: {
  isDashboard: boolean;
  product: Product;
}) {
  const router = useRouter();

  const { stateProducts } = useGlobalPersistedStore(state => state);
  const { setSelectedTreatments } = useSessionStore(state => state);
  const {
    productHighlighted,
    addItemToCart,
    getQuantityOfProduct,
    removeSingleProduct,
  } = useCartStore(state => state);

  const [medicalVisitProduct, setMedicalVisitProduct] = useState<Product>();

  const setSelectedTreatment = (product: Product) => {
    let productToAdd = stateProducts.filter(x => product?.id === x.id)[0];
    if (!productToAdd) productToAdd = product;
    setSelectedTreatments([productToAdd]);

    router.push(ROUTES.checkout.type);
  };

  useEffect(() => {
    async function initMedicalVisitProduct() {
      const medicalVisitProduct = await fetchProduct(
        process.env.NEXT_PUBLIC_MEDICAL_VISIT || '',
        isDashboard,
        false
      );

      setMedicalVisitProduct(medicalVisitProduct);
    }

    initMedicalVisitProduct();
  }, []);

  return (
    <Flex layout="col-left" className="w-full">
      {!isEmpty(product.appliedProducts) ? (
        product.appliedProducts.map(item => {
          const iconName = item.icon.split('/')[0] || 'SvgCross';
          const iconFamily: 'default' | 'category' | 'suggestion' | 'service' =
            (item.icon.split('/')[1] as 'default') || 'default';

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
      {!isDashboard && (
        <Button
          type="primary"
          className="mt-4"
          onClick={() => {
            if (!isDashboard && !product.isPack) {
              setSelectedTreatment(product);
            }
            if (medicalVisitProduct && product.isPack) {
              setSelectedTreatment(medicalVisitProduct);
            }
          }}
          id="tmevent_click_book_button_prices"
        >
          Me interesa
          <SvgArrow
            height={16}
            width={16}
            className="ml-2 pointer-events-none"
          />
        </Button>
      )}

      {productHighlighted && (
        <div className="pt-1 mt-2">
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
        </div>
      )}
    </Flex>
  );
}

export default function ProductPriceCard({
  product,
  fullWidthPack = false,
  isDashboard = false,
  className,
}: {
  product: Product;
  fullWidthPack?: boolean;
  isDashboard?: boolean;
  className?: string;
}) {
  const deviceSize = useDeviceSizeSSR();
  const [discountedPrice, setDiscountedPrice] = useState<null | number>(null);

  useEffect(() => {
    if (product && !isEmpty(product.discounts)) {
      setDiscountedPrice(getDiscountedPrice(product));
    }
  }, [product]);

  return (
    <Flex
      className={`bg-white flex-col p-3 rounded-2xl shadow-centered-secondary w-full md:w-1/2 ${className}`}
    >
      <Flex layout="col-left" className="w-full p-3">
        <Flex layout="row-between" className="w-full mb-2">
          <Flex>
            <span className="text-xl text-hg-secondary font-semibold md:text-2xl mr-2">
              {discountedPrice ? discountedPrice : product.price} €
            </span>
            {discountedPrice && (
              <span className="inline-block line-through font-normal text-hg-black500">
                {product.price} €
              </span>
            )}
          </Flex>
          <Flex layout="row-right">
            {product.isPack &&
              (!isEmpty(product.tags) && product.tags[0].tag === 'B.Friday' ? (
                <Flex
                  layout="row-center"
                  className="bg-hg-black rounded-full p-1 px-2"
                >
                  <SvgGlow
                    height={12}
                    width={12}
                    className="text-hg-primary mr-1"
                  />
                  <Text className="text-hg-secondary" size="xs">
                    B.<span className="text-hg-primary">Friday</span>
                  </Text>
                </Flex>
              ) : (
                <Text
                  size="xs"
                  className="py-1 px-2 bg-hg-turquoise/20 text-hg-turquoise rounded-md"
                >
                  Oferta especial
                </Text>
              ))}
          </Flex>
        </Flex>
        <Text className="font-semibold md:text-lg">{product.title}</Text>
        {product.isPack && deviceSize.isMobile && (
          <Text className="font-semibold md:text-lg">¡Tu eliges la zona!</Text>
        )}
      </Flex>
      <Flex
        layout="col-left"
        className={`w-full md:flex-row items-start mt-3 ${
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
          <ProductPriceItemsCard isDashboard={isDashboard} product={product} />
        </div>
      </Flex>
    </Flex>
  );
}
