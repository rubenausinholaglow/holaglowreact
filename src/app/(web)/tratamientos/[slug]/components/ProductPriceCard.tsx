'use client';

import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { fetchProduct } from '@utils/fetch';
import ROUTES from '@utils/routes';
import { Quantifier } from 'app/(dashboard)/dashboard/(pages)/budgets/HightLightedProduct/Quantifier';
import {
  Operation,
  useCartStore,
} from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
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
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

function ProductPriceItemsCard({
  isDashboard = false,
  product,
}: {
  isDashboard: boolean;
  product: Product;
}) {
  const router = useRouter();

  const { stateProducts } = useGlobalPersistedStore(state => state);
  const { setSelectedTreatments, setSelectedPack } = useSessionStore(
    state => state
  );
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
    <>
      <Flex layout="col-left" className="w-full">
        {!isEmpty(product.appliedProducts) ? (
          product.appliedProducts.map(item => {
            const iconName = item.icon.split('/')[0] || 'SvgCross';
            const iconFamily:
              | 'default'
              | 'category'
              | 'suggestion'
              | 'service' = (item.icon.split('/')[1] as 'default') || 'default';

            return (
              <Flex key={item.titlte} className="items-start mb-2 text-sm">
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
                <p className="pt-3 pb-0 text-sm md:text-md">
                  {product?.packMoreInformation}
                </p>
              </AccordionContent>
              <AccordionTrigger>
                <span className="text-hg-secondary block text-left text-sm md:text-md font-semibold">
                  + info
                </span>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
        )}
      </Flex>

      <div className="mt-auto">
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
              if (product.isPack) setSelectedPack(product);
              else setSelectedPack(undefined);
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
      </div>
    </>
  );
}

export default function ProductPriceCard({
  product,
  parentProduct,
  isDashboard = false,
  className,
}: {
  product: Product;
  parentProduct: Product;
  isDashboard?: boolean;
  className?: string;
}) {
  const [discountedPrice, setDiscountedPrice] = useState<null | number>(null);

  useEffect(() => {
    if (product && !isEmpty(product.discounts)) {
      setDiscountedPrice(getDiscountedPrice(product));
    }
  }, [product]);

  return (
    <Flex
      className={`bg-white flex-col p-6 rounded-2xl shadow-centered-secondary w-full md:w-1/2 ${className}`}
    >
      <Flex layout="col-left" className="w-full">
        <Flex layout="row-between" className="w-full mb-2 items-start">
          <Flex className="text-hg-secondary">
            <span className="text-2xl font-semibold md:text-2xl mr-2">
              {discountedPrice ? discountedPrice : product.price} €
            </span>
            {discountedPrice && (
              <span className="text-l inline-block line-through font-normal text-hg-black500">
                {product.price} €
              </span>
            )}
          </Flex>
          <Flex layout="row-right">
            {!isEmpty(product.tags) && product.tags[0].tag && (
              <Flex
                layout="row-center"
                className="bg-hg-primary rounded-full p-1 px-2"
              >
                <SvgGlow
                  height={12}
                  width={12}
                  className="text-hg-black mr-1"
                />
                <Text className="text-hg-black" size="xs">
                  {product.tags[0].tag}
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Text className="font-semibold md:text-lg">{product.title}</Text>
        {product.isPack && isMobile && (
          <Text className="font-semibold md:text-lg">¡Tu eliges la zona!</Text>
        )}
      </Flex>
      <Flex layout="col-left" className="w-full items-start pt-2">
        <ProductPriceItemsCard isDashboard={isDashboard} product={product} />
      </Flex>
    </Flex>
  );
}
