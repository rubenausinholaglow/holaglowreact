import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { Product } from '@interface/product';
import { Accordion } from '@radix-ui/react-accordion';
import ProductService from '@services/ProductService';
import {
  getInvalidProducts,
  getValidTypes,
  getValidUnityTypes,
  isDisableAddQuantity,
} from '@utils/agendaUtils';
import { PacksConfigured } from '@utils/packUtils';
import useRoutes from '@utils/useRoutes';
import { Quantifier } from 'app/(dashboard)/dashboard/(pages)/budgets/HightLightedProduct/Quantifier';
import {
  Operation,
  useCartStore,
} from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { SvgAngle, SvgRadioChecked } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

import CategoryIcon from './CategoryIcon';

export default function TreatmentAccordionSelector({
  isDashboard = false,
  packInProductCart = false,
}: {
  isDashboard?: boolean;
  packInProductCart?: boolean;
}) {
  const { dashboardProducts } = useGlobalPersistedStore(state => state);
  const { selectedTreatments, setSelectedTreatments, treatmentPacks } =
    useSessionStore(state => state);
  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const cart = useCartStore(state => state.cart);
  const router = useRouter();
  const ROUTES = useRoutes();
  const [productsAgenda, setProductsAgenda] = useState<Product[]>([]);

  const notValidProducts = getInvalidProducts(cart);

  useEffect(() => {
    if (isDashboard && !isEmpty(dashboardProducts)) {
      const allCategoryNames: string[] = dashboardProducts.reduce(
        (categoryNames: string[], product) => {
          let productCategories: string[] = [];
          if (packInProductCart) {
            if (validUnityTypes.includes(product.unityType)) {
              productCategories = product.category.map(
                category => category.name
              );
            }
          } else if (!product.isPack) {
            productCategories = product.category.map(category => category.name);
          }
          return [...categoryNames, ...productCategories];
        },
        []
      );
      const uniqueCategoryNames: string[] = [...new Set(allCategoryNames)];

      setProductCategories(uniqueCategoryNames);
    }
  }, [dashboardProducts, treatmentPacks]);

  useEffect(() => {
    async function getAgendaProducts() {
      const params = {
        isDerma: false,
        getAgendaProducts: true,
      };

      await ProductService.getAllProducts(params)
        .then(products => {
          if (products.length > 0) {
            setProductsAgenda(products);
            const allCategoryNames: string[] = products.reduce(
              (categoryNames: string[], product) => {
                const productCategories = product.category.map(
                  category => category.name
                );
                return [...categoryNames, ...productCategories];
              },
              []
            );

            const uniqueCategoryNames: string[] = [
              ...new Set(allCategoryNames),
            ];
            const packsIndex = uniqueCategoryNames.indexOf('Packs');
            if (packsIndex !== -1) {
              uniqueCategoryNames.splice(packsIndex, 1);
              uniqueCategoryNames.unshift('Packs');
            }
            setProductCategories(uniqueCategoryNames);
          }
        })
        .catch((err: any) => {
          Bugsnag.notify(err);
        });
    }
    if (!isDashboard) {
      getAgendaProducts();
    }
  }, []);

  function getProductsByCategory(category: string): Product[] {
    const filterCondition = (product: Product) => {
      if (category.toLocaleUpperCase() == 'PACKS')
        return product.category.some(
          categoryItem => categoryItem.name === category && product.isPack
        );
      return product.category.some(
        categoryItem => categoryItem.name === category && !product.isPack
      );
    };

    if (isDashboard)
      return dashboardProducts
        .filter(x => {
          return (
            x.category.some(y => y.name === category) &&
            !x.isPack &&
            !notValidProducts.includes(x.flowwwId.toString())
          );
        })
        .sort((a, b) => (a.title > b.title ? 1 : -1));

    return productsAgenda
      .filter(filterCondition)
      .sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  const validUnityTypes = getValidUnityTypes(treatmentPacks);
  const validTypes = getValidTypes();

  function getProductsByTypePack(): Product[] {
    const packIds = cart.filter(x => x.isPack).map(x => x.flowwwId.toString());

    let filteredProducts: Product[] = [];

    packIds.forEach(packId => {
      const productPack = PacksConfigured.find(pack => pack.packId === packId);

      if (productPack) {
        const productIds = productPack.productId;

        const productsForPack = dashboardProducts.filter(product =>
          productIds.includes(product.flowwwId.toString())
        );

        filteredProducts = filteredProducts.concat(productsForPack);
      }
    });

    filteredProducts.sort((a, b) => {
      if (a.unityType < b.unityType) return 1;
      if (a.unityType > b.unityType) return -1;

      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;

      return 0;
    });
    return filteredProducts;
  }

  const renderAcordionContent = (
    category: string,
    findSelectedProducts = false
  ) => {
    const uniqueTitles = new Set<string>();
    return (
      <AccordionContent>
        <div className="border-t border-hg-secondary300">
          <ul className="flex flex-col w-full">
            {findSelectedProducts &&
              cart
                .filter(
                  item =>
                    !item.isPack &&
                    !item.isScheduled &&
                    validTypes.includes(item.type)
                )
                .map((product, index) => {
                  if (!uniqueTitles.has(product.title)) {
                    uniqueTitles.add(product.title);
                    return (
                      <li
                        className="transition-all flex items-center bg-hg-secondary100 hover:bg-hg-secondary300 p-4 cursor-pointer"
                        key={index}
                      >
                        {renderTextProduct(product)}
                        {renderSelectorQuantity(product, index)}
                      </li>
                    );
                  }
                })}
            {cart.length > 0 &&
              treatmentPacks.length > 0 &&
              !findSelectedProducts && (
                <>
                  {getProductsByTypePack().map((product, index) => (
                    <li
                      className="transition-all flex items-center bg-hg-secondary100 hover:bg-hg-secondary300 p-4 cursor-pointer"
                      key={index}
                    >
                      {renderTextProduct(product)}
                      {renderSelectorQuantity(product, index)}
                    </li>
                  ))}
                </>
              )}
            {getProductsByCategory(category).map((product, index) => (
              <li
                className="transition-all flex items-center bg-hg-secondary100 hover:bg-hg-secondary300 p-4 cursor-pointer"
                key={product.title}
                onClick={() => {
                  if (isDashboard) return;

                  setSelectedTreatments([product]);
                  router.push(ROUTES.checkout.clinics);
                }}
              >
                {renderTextProduct(product)}
                {isDashboard
                  ? renderSelectorQuantity(product, index) || null
                  : renderCheck(product, index) || null}
              </li>
            ))}
          </ul>
        </div>
      </AccordionContent>
    );
  };

  const renderTextProduct = (product: Product) => {
    return (
      <div className="mr-4">
        <Text className="font-semibold">{product.title}</Text>
        <Text className="text-xs">{product.description}</Text>
      </div>
    );
  };
  const renderCheck = (product: Product, index: number) => {
    const commonElement = (
      <div className="border border-hg-black h-[24px] w-[24px] rounded-full shrink-0 ml-auto"></div>
    );

    const checkedElement = (
      <SvgRadioChecked height={24} width={24} className="shrink-0 ml-auto" />
    );

    if (isDashboard && cart.length > 0) {
      return (
        <>
          {selectedTreatments.some(x => x.id === product.id)
            ? checkedElement
            : commonElement}
        </>
      );
    } else {
      return (
        <>
          {selectedTreatments.some(
            selectedProduct => selectedProduct.id === product.id
          )
            ? checkedElement
            : commonElement}
        </>
      );
    }
  };

  const renderAccordionDashboard = (findSelectedProducts: boolean) => {
    return (
      <Accordion type="single" collapsible className="w-full" defaultValue="1">
        {!findSelectedProducts && <div className="mb-4"></div>}
        <AccordionItem
          className={`transition-all w-full rounded-lg overflow-hidden mb-4 
                  bg-hg-secondary100
            ${isDashboard ? 'min-w-[80%]' : ''}`}
          value="1"
        >
          <AccordionTrigger>
            <Flex className="p-4">
              <Text className="font-semibold">
                {!findSelectedProducts
                  ? 'Seleccionar Tratamientos'
                  : 'Tratamientos Seleccionados'}
              </Text>
            </Flex>
          </AccordionTrigger>
          {renderAcordionContent('', findSelectedProducts)}
        </AccordionItem>
      </Accordion>
    );
  };

  const renderSelectorQuantity = (product: Product, index: number) => {
    const disable = isDisableAddQuantity(
      selectedTreatments,
      product,
      cart,
      treatmentPacks
    );

    return (
      <div className="ml-auto">
        <Quantifier
          handleUpdateQuantity={function handleUpdateQuantity(
            operation: Operation
          ): void {
            if (operation == 'increase') {
              setSelectedTreatments([...selectedTreatments, product]);
            } else {
              const isSelected = selectedTreatments.some(
                selectedProduct => selectedProduct.id === product.id
              );
              if (isSelected) {
                const firstProductIndex = selectedTreatments.findIndex(
                  item => item.id === product.id
                );
                const updatedTreatments = [...selectedTreatments];
                updatedTreatments.splice(firstProductIndex, 1);
                setSelectedTreatments(updatedTreatments);
              }
            }
          }}
          quantity={getQuantityOfProduct(product)}
          disableAddQuantity={disable}
        />
      </div>
    );
  };

  function getQuantityOfProduct(product: Product): number {
    return selectedTreatments.filter(treatment => treatment.id === product.id)
      .length;
  }

  if (isDashboard && cart.length > 0) {
    return (
      <div className="w-full">
        <div>
          {cart.length > 0 &&
            cart.some(x => !x.isPack) &&
            renderAccordionDashboard(true)}
        </div>
        <div className="mt-4">
          {(treatmentPacks.length > 0 && cart.some(x => x.isPack)) ||
          cart.some(x => !x.isPack && x.sessions < 1)
            ? renderAccordionDashboard(false)
            : null}
        </div>
      </div>
    );
  }

  if (
    cart.length == 0 ||
    (cart.length == 1 &&
      cart[0].flowwwId.toString() ==
        process.env.NEXT_PUBLIC_CITA_PREVIA_FLOWWWID)
  ) {
    return (
      <Accordion type="single" collapsible className="w-full">
        {productCategories
          .sort((a, b) => {
            if (a === 'Packs') return -1;
            if (b === 'Packs') return 1;
            return 0;
          })
          .map(category => {
            return (
              <AccordionItem
                value={category}
                key={category}
                className={`transition-all w-full rounded-lg overflow-hidden mb-4 ${
                  selectedCategory === category
                    ? 'bg-hg-secondary100'
                    : 'bg-derma-secondary300'
                }
                ${isDashboard ? 'min-w-[80%]' : ''}
              `}
              >
                <AccordionTrigger>
                  <Flex
                    className="p-4"
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory !== category ? category : null
                      )
                    }
                  >
                    <CategoryIcon category={category} className="mr-4" />
                    <Text className="font-semibold">{category}</Text>

                    <SvgAngle
                      className={`transition-all text-hg-secondary ml-auto ${
                        selectedCategory === category ? 'rotate-90' : ''
                      }`}
                    />
                  </Flex>
                </AccordionTrigger>
                {renderAcordionContent(category)}
              </AccordionItem>
            );
          })}
      </Accordion>
    );
  }
}
