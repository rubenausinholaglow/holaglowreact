import { useEffect, useState } from 'react';
import { Product, UnityType } from '@interface/product';
import { Accordion } from '@radix-ui/react-accordion';
import useRoutes from '@utils/useRoutes';
import { getUniqueIds, getUniqueProducts } from '@utils/utils';
import { Quantifier } from 'app/(dashboard)/dashboard/(pages)/budgets/HightLightedProduct/Quantifier';
import {
  Operation,
  useCartStore,
} from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { SvgSpinner } from 'app/icons/Icons';
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
  isCheckin = false,
  packInProductCart = false,
}: {
  isDashboard?: boolean;
  isCheckin?: boolean;
  packInProductCart?: boolean;
}) {
  const router = useRouter();
  const ROUTES = useRoutes();

  const { stateProducts, dashboardProducts } = useGlobalPersistedStore(
    state => state
  );
  const { setSelectedTreatments, selectedTreatments, treatmentPacks } =
    useSessionStore(state => state);

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIndexsProducts, setSelectedIndexProducts] = useState<number[]>(
    []
  );
  const [isLoadingdashboard, setIsLoadingDashboard] = useState<boolean>(
    isDashboard ? true : false
  );

  const cart = useCartStore(state => state.cart);

  const [validTypesPacks, setValidTypes] = useState<UnityType[]>(
    treatmentPacks.flatMap(x => {
      return x.type;
    })
  );

  const productPacks = ['5465', '971'];
  const invalidProducts =
    cart.filter(x => productPacks.includes(x.flowwwId.toString())).length > 0
      ? []
      : ['855', '854'];

  function getProductsByCategory(
    category: string,
    findSelectedProducts = false
  ) {
    const filterCondition = (product: Product) => {
      return (
        product.category.some(categoryItem => categoryItem.name === category) &&
        !product.isPack
      );
    };

    if ((isDashboard && !packInProductCart) || findSelectedProducts) {
      const filteredProducts: Product[] =
        dashboardProducts.filter(filterCondition);
      if (filteredProducts.length === 0) {
        const productIds = getUniqueIds(selectedProducts);
        return getUniqueProducts(productIds, selectedProducts);
      }
      return filteredProducts.sort((a, b) => (a.title > b.title ? 1 : -1));
    }
    if (packInProductCart) {
      const uniqueProductTitles = new Set<string>();
      return dashboardProducts
        .filter(product => {
          if (
            validTypesPacks.includes(product.unityType) &&
            !product.isPack &&
            !uniqueProductTitles.has(product.title) &&
            !invalidProducts.includes(product.flowwwId.toString()) &&
            selectedProducts.every(x => x.title !== product.title)
          ) {
            uniqueProductTitles.add(product.title);
            return true;
          }
          return false;
        })
        .sort((a, b) => (a.title > b.title ? 1 : -1));
    }
    return stateProducts
      .filter(filterCondition)
      .sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  useEffect(() => {
    if (!isDashboard) {
      const allCategoryNames: string[] = stateProducts.reduce(
        (categoryNames: string[], product) => {
          const productCategories = product.category.map(
            category => category.name
          );
          return [...categoryNames, ...productCategories];
        },
        []
      );

      const uniqueCategoryNames: string[] = [...new Set(allCategoryNames)];

      setProductCategories(uniqueCategoryNames);
    }
  }, [stateProducts]);

  useEffect(() => {
    if (isDashboard && !isEmpty(dashboardProducts)) {
      const allCategoryNames: string[] = dashboardProducts.reduce(
        (categoryNames: string[], product) => {
          let productCategories: string[] = [];
          if (packInProductCart) {
            if (validTypesPacks.includes(product.unityType)) {
              productCategories = product.category.map(
                category => category.name
              );
            }
          } else {
            productCategories = product.category.map(category => category.name);
          }
          return [...categoryNames, ...productCategories];
        },
        []
      );
      const uniqueCategoryNames: string[] = [...new Set(allCategoryNames)];

      setProductCategories(uniqueCategoryNames);

      packInProductCart ? setSelectedTreatments([]) : null;
    }
  }, [dashboardProducts, treatmentPacks, validTypesPacks]);

  useEffect(() => {
    if (isEmpty(selectedProducts)) setSelectedProducts(selectedTreatments);
  }, [selectedTreatments]);

  useEffect(() => {
    if (!isEmpty(productCategories)) {
      setIsLoadingDashboard(false);
    }
  }, [productCategories]);

  useEffect(() => {
    if (!isEmpty(treatmentPacks))
      setValidTypes(
        treatmentPacks.flatMap(x => {
          return x.type;
        })
      );
  }, [treatmentPacks]);

  useEffect(() => {
    if (!isEmpty(selectedProducts)) {
      const selectedIndexs: number[] = [];
      selectedProducts.map((product, index) => {
        selectedIndexs.push(index);
      });
      setSelectedIndexProducts(selectedIndexs);
    }
  }, [selectedProducts]);

  function addTreatment(product: Product, index: number) {
    if (isDashboard) {
      cart.length > 0
        ? addTreatmentDashboard(product, index)
        : setSelectedTreatments([...selectedTreatments, product]);
    } else {
      setSelectedTreatments([product]);
    }
  }

  function addTreatmentDashboard(product: Product, index: number) {
    const productToAdd: Product[] = getProductToAdd(product);
    setSelectedTreatments([...selectedTreatments, ...productToAdd]);
    setSelectedIndexProducts([...selectedIndexsProducts, index]);
  }

  function getProductToAdd(product: Product): Product[] {
    if (
      product.unityType === UnityType.AcidoHialuronico &&
      !packInProductCart
    ) {
      return selectedProducts.filter(x => x.id === product.id) as Product[];
    } else {
      return [product];
    }
  }

  function removeTreatment(product: Product, index: number) {
    if (isDashboard) {
      const firstProductIndex = selectedTreatments.findIndex(
        item => item.id === product.id
      );
      if (firstProductIndex !== -1) {
        const updatedTreatments = [...selectedTreatments];
        updatedTreatments.splice(firstProductIndex, 1);
        setSelectedTreatments(updatedTreatments);
      }
    } else {
      setSelectedIndexProducts(x => x.filter(item => item !== index));
      const updatedSelection = getUpdatedSelection(product);
      setSelectedTreatments(updatedSelection);
    }
  }

  function getUpdatedSelection(product: Product): Product[] {
    if (product.unityType === UnityType.AcidoHialuronico) {
      return selectedTreatments.filter(
        selectedProduct => selectedProduct.id !== product.id
      );
    } else {
      const indexToRemove = selectedTreatments.findIndex(
        x => x.title === product.title
      );
      const updatedTreatments = [...selectedTreatments];
      updatedTreatments.splice(indexToRemove, 1);
      return updatedTreatments;
    }
  }

  function getQuantityOfProduct(product: Product): number {
    return selectedTreatments.filter(treatment => treatment.id === product.id)
      .length;
  }

  const renderAcordionContent = (
    category: string,
    findSelectedProducts = false
  ) => {
    return (
      <AccordionContent>
        <div className="border-t border-hg-secondary300">
          <ul className="flex flex-col w-full">
            {getProductsByCategory(category, findSelectedProducts).map(
              (product, index) => (
                <li
                  className="transition-all flex items-center bg-hg-secondary100 hover:bg-hg-secondary300 p-4 cursor-pointer"
                  key={product.title}
                  onClick={() => {
                    if (isDashboard) return;
                    const isSelected =
                      isDashboard && cart.length > 0
                        ? selectedIndexsProducts.includes(index)
                        : selectedTreatments.some(
                            selectedProduct => selectedProduct.id === product.id
                          );

                    if (isSelected) {
                      removeTreatment(product, index);
                    } else {
                      addTreatment(product, index);
                    }

                    if (!isDashboard) {
                      router.push(ROUTES.checkout.clinics);
                    }
                  }}
                >
                  <div className="mr-4">
                    <Text className="font-semibold">{product.title}</Text>
                    <Text className="text-xs">{product.description}</Text>
                  </div>
                  {(packInProductCart && !findSelectedProducts) ||
                  (isDashboard && cart.length == 0)
                    ? renderSelectorQuantity(product, index) || null
                    : renderCheck(product, index) || null}
                </li>
              )
            )}
          </ul>
        </div>
      </AccordionContent>
    );
  };

  const renderSelectorQuantity = (product: Product, index: number) => {
    const disable =
      cart.length > 0 &&
      selectedTreatments.length >=
        treatmentPacks.filter(x => x.isScheduled == false).length
        ? true
        : false;
    if (
      validTypesPacks.includes(product.unityType) ||
      (isDashboard && cart.length == 0)
    )
      return (
        <div className="ml-auto">
          <Quantifier
            handleUpdateQuantity={function handleUpdateQuantity(
              operation: Operation
            ): void {
              if (operation == 'increase') {
                addTreatment(product, index);
              } else {
                removeTreatment(product, index);
              }
            }}
            quantity={getQuantityOfProduct(product)}
            disableAdd={disable}
          />
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
          {selectedIndexsProducts.includes(index)
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
        {!findSelectedProducts && (
          <div className="mb-4">
            {treatmentPacks.filter(x => x.isScheduled == true).length}/
            {treatmentPacks.length} agendados
          </div>
        )}
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

  if (isDashboard && cart.length > 0) {
    const haveSelectedProducts = getProductsByCategory('', true);
    return (
      <>
        {haveSelectedProducts.length > 0
          ? renderAccordionDashboard(true)
          : null}
        {packInProductCart ? renderAccordionDashboard(false) : null}
      </>
    );
  }

  if (cart.length == 0 || !isDashboard)
    return (
      <Accordion type="single" collapsible className="w-full">
        {productCategories.map(category => {
          return (
            <AccordionItem
              value={category}
              key={category}
              className={`transition-all w-full rounded-lg overflow-hidden mb-4 ${
                selectedCategory === category
                  ? 'bg-hg-secondary100'
                  : 'bg-hg-black50'
              }
            ${isDashboard ? 'min-w-[80%]' : ''}`}
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
                    className={`transition-all text-hg-black500 ml-auto ${
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
