import { useEffect, useState } from 'react';
import { Product, ProductType } from '@interface/product';
import { Accordion } from '@radix-ui/react-accordion';
import useRoutes from '@utils/useRoutes';
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
import { useRouter } from 'next/navigation';

import CategoryIcon from './CategoryIcon';

export default function TreatmentAccordionSelector({
  isDashboard = false,
  isCheckin = false,
}: {
  isDashboard?: boolean;
  isCheckin?: boolean;
}) {
  const router = useRouter();
  const ROUTES = useRoutes();

  const { stateProducts } = useGlobalPersistedStore(state => state);
  const { setSelectedTreatments, selectedTreatments } = useSessionStore(
    state => state
  );

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  function getProductsByCategory(category: string) {
    const filteredProducts = stateProducts.filter(
      product =>
        product.category.some(categoryItem => categoryItem.name === category) &&
        !product.isPack
    );

    return filteredProducts;
  }

  useEffect(() => {
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
    setSelectedProducts(selectedTreatments);
  }, [stateProducts]);

  if (isDashboard && selectedTreatments.length > 0)
    return (
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem
          className={`transition-all w-full rounded-lg overflow-hidden mb-4 
                  bg-hg-secondary100
            ${isDashboard ? 'min-w-[80%]' : ''}`}
          value="item-1"
        >
          <AccordionTrigger>
            <Flex className="p-4">
              <Text className="font-semibold">Tratamientos Seleccionados</Text>
            </Flex>
          </AccordionTrigger>
          <AccordionContent>
            <div className="border-t border-hg-secondary300">
              <ul className="flex flex-col w-full">
                {selectedProducts.map(product => (
                  <li
                    className="transition-all flex items-center bg-hg-secondary100 hover:bg-hg-secondary300 p-4 cursor-pointer"
                    key={product.title}
                    onClick={() => {
                      const isSelected = selectedTreatments.some(
                        selectedProduct =>
                          selectedProduct.title.includes(product.title)
                      );

                      if (isSelected) {
                        const updatedSelection = selectedTreatments.filter(
                          selectedProduct =>
                            !selectedProduct.title.includes(product.title)
                        );
                        setSelectedTreatments(updatedSelection);
                      } else {
                        if (isDashboard) {
                          setSelectedTreatments([
                            ...selectedTreatments,
                            product,
                          ]);
                        } else {
                          setSelectedTreatments([product]);
                        }
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

                    {selectedTreatments.some(
                      selectedProduct => selectedProduct.id === product.id
                    ) ||
                    selectedTreatments.some(selectedProduct =>
                      selectedProduct.title.includes(product.title)
                    ) ? (
                      <SvgRadioChecked
                        height={24}
                        width={24}
                        className="shrink-0 ml-auto"
                      />
                    ) : (
                      <div className="border border-hg-black h-[24px] w-[24px] rounded-full shrink-0 ml-auto"></div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
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
            <AccordionContent>
              <div className="border-t border-hg-secondary300">
                <ul className="flex flex-col w-full">
                  {getProductsByCategory(category).map(product => (
                    <li
                      className="transition-all flex items-center bg-hg-secondary100 hover:bg-hg-secondary300 p-4 cursor-pointer"
                      key={product.title}
                      onClick={() => {
                        const isSelected = selectedTreatments.some(
                          selectedProduct =>
                            selectedProduct.title === product.title
                        );

                        if (isSelected) {
                          const updatedSelection = selectedTreatments.filter(
                            selectedProduct => selectedProduct.id !== product.id
                          );
                          setSelectedTreatments(updatedSelection);
                        } else {
                          if (isDashboard) {
                            setSelectedTreatments([
                              ...selectedTreatments,
                              product,
                            ]);
                          } else {
                            setSelectedTreatments([product]);
                          }
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

                      {selectedTreatments.some(
                        selectedProduct => selectedProduct.id === product.id
                      ) ||
                      selectedTreatments.some(selectedProduct =>
                        selectedProduct.title.includes(product.title)
                      ) ? (
                        <SvgRadioChecked
                          height={24}
                          width={24}
                          className="shrink-0 ml-auto"
                        />
                      ) : (
                        <div className="border border-hg-black h-[24px] w-[24px] rounded-full shrink-0 ml-auto"></div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
