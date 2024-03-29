'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import { fetchProducts } from '@utils/fetch';
import ROUTES from '@utils/routes';
import {
  applyFilters,
  INITIAL_FILTERS,
} from 'app/(web)/tratamientos/utils/filters';
import { SvgArrow, SvgCross, SvgSearch } from 'app/icons/IconsDs';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

const NO_RESULTS_SLUGS = [
  'arrugas-expresion-frente-entrecejo-patas-gallo',
  'aumento-labios',
  'relleno-ojeras',
  'armonizacion-facial',
  'proyeccion-pomulos',
];

function ProductSearchItem(product: Product, index: number) {
  return (
    <li
      key={product.id}
      className={`py-2 ${index === 0 ? '' : 'border-t border-hg-black400'}`}
    >
      <a
        href={`${ROUTES.treatments}/${product.extraInformation.slug}`}
        className="flex w-full"
      >
        <div className="mr-auto pr-4">
          <Text className="text-sm font-semibold">{product.title}</Text>
          <Text className="text-hg-secondary">{product.price} €</Text>
        </div>
        <SvgArrow className="shrink-0 h-4 w-4" />
      </a>
    </li>
  );
}

export default function ProductSearchBar({
  className = '',
  isMobileNavigation = false,
  products,
  setIsSearchBarOpened,
}: {
  className?: string;
  isMobileNavigation?: boolean;
  products: Product[];
  setIsSearchBarOpened?: (value: boolean) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [initialProducts, setInitialProducts] = useState(products);
  const [searchBarProducts, setSearchBarProducts] = useState(products);
  const [noResultsProducts, setNoResultsProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function initProducts() {
      const products = await fetchProducts({ isDerma: false });

      setInitialProducts(products);
      setNoResultsProducts(
        products.filter((product: Product) =>
          NO_RESULTS_SLUGS.includes(product.extraInformation.slug)
        )
      );
    }

    if (initialProducts.length === 0) {
      initProducts();
    } else {
      setNoResultsProducts(
        products.filter(product =>
          NO_RESULTS_SLUGS.includes(product.extraInformation.slug)
        )
      );
    }
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      setSearchBarProducts(
        applyFilters({
          products: initialProducts,
          filters: { ...INITIAL_FILTERS, text: searchQuery },
        })
      );
    }

    if (searchQuery.length === 0) {
      setShowResults(false);

      setTimeout(() => {
        setSearchBarProducts(initialProducts);
      }, 200);
    }
  }, [searchQuery]);

  useEffect(() => {
    setShowResults(searchQuery.length > 2);

    if (setIsSearchBarOpened) {
      setIsSearchBarOpened(
        searchQuery.length > 2 &&
          searchBarProducts.filter(product => product.visibility).length > 0
      );
    }
  }, [searchBarProducts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const handleClearInputValue = () => {
    setSearchQuery('');
  };

  return (
    <div className={`relative w-full ${className}`}>
      <Flex
        layout="row-left"
        className={`transition-all py-3 px-4 bg-white z-20 relative border ${
          showResults ? 'bg-hg-black100 rounded-t-2xl' : 'rounded-2xl'
        } ${
          isMobileNavigation && !showResults
            ? 'border-hg-black300'
            : 'border-transparent'
        }`}
      >
        <SvgSearch className="text-hg-secondary mr-3 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          placeholder="Busca tu tratamiento..."
          className="placeholder-hg-black300 bg-transparent focus:outline-none w-full"
          onChange={handleInputChange}
        />

        <SvgCross
          className={`transition-all h-4 w-4 absolute top-4 right-4 cursor-pointer ${
            searchQuery.length > 2 ? 'opacity-1' : 'opacity-0'
          }`}
          onClick={handleClearInputValue}
        />
      </Flex>
      <Flex
        layout="col-left"
        className={`transition-all w-full absolute z-10 bg-white rounded-b-2xl max-h-[450px] translate-y-0 overflow-auto ${
          showResults ? 'shadow-centered-black' : 'max-h-0 -translate-y-[10px]'
        }`}
      >
        {searchBarProducts.filter(item => item.visibility).length > 0 ? (
          <>
            <Text className="text-hg-black500 text-xs mb-2 pt-3 px-4">
              Tratamientos
            </Text>
            <ul className="flex flex-col px-4 w-full">
              {searchBarProducts.map((product, index) => {
                if (product.visibility) {
                  return ProductSearchItem(product, index);
                }
              })}
            </ul>
          </>
        ) : (
          <>
            <Text className="text-hg-black500 mb-2 pt-3 px-4">
              Sin resultados. Te sugerimos...
            </Text>
            <ul className="flex flex-col px-4 w-full">
              {noResultsProducts.map((product, index) =>
                ProductSearchItem(product, index)
              )}
            </ul>
          </>
        )}
      </Flex>
    </div>
  );
}
