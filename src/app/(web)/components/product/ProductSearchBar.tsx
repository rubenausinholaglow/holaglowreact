'use client';

import { useEffect, useState } from 'react';
import { ProductFilters } from '@interface/filters';
import { Product } from '@interface/product';
import ROUTES from '@utils/routes';
import {
  applyFilters,
  INITIAL_FILTERS,
} from 'app/(web)/tratamientos/utils/filters';
import { SvgArrow, SvgCross, SvgSearch } from 'app/icons/IconsDs';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function ProductSearchBar({
  className,
  products,
}: {
  className?: string;
  products: Product[];
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchBarProducts, setSearchBarProducts] = useState(products);

  useEffect(() => {
    setSearchBarProducts(products);
  }, [products]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      setSearchBarProducts(
        applyFilters({
          products: products,
          filters: { ...INITIAL_FILTERS, text: searchQuery },
        })
      );
    }

    setShowResults(searchQuery.length > 2 && searchBarProducts.length > 0);
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const handleClearInputValue = () => {
    setSearchQuery('');
  };

  return (
    <div className="mb-4 relative">
      <Flex
        layout="row-left"
        className={`transition-all py-3 px-4 bg-white z-20 relative ${
          showResults ? 'bg-hg-black100 rounded-t-2xl' : 'rounded-2xl'
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
          className="h-4 w-4 absolute top-4 right-4 cursor-pointer"
          onClick={handleClearInputValue}
        />
      </Flex>
      <Flex
        layout="col-left"
        className={`transition-all w-full absolute z-10 bg-white rounded-b-2xl max-h-[450px] translate-y-0 overflow-auto ${
          showResults ? 'shadow-centered-black' : 'max-h-0 -translate-y-[10px]'
        }`}
      >
        <Text className="text-hg-black500 text-xs mb-2 pt-3 px-4">
          Tratamientos
        </Text>
        <ul className="flex flex-col px-4 w-full">
          {searchBarProducts.map((product, index) => {
            if (product.visibility) {
              return (
                <li
                  key={product.id}
                  className={`py-2 ${
                    index === 0 ? '' : 'border-t border-hg-black400'
                  }`}
                >
                  <a
                    href={`${ROUTES.treatments}/${product.extraInformation.slug}`}
                    className="flex w-full"
                  >
                    <div className="mr-auto pr-4">
                      <Text className="text-sm font-semibold">
                        {product.title}
                      </Text>
                      <Text className="text-hg-secondary">
                        {product.price} €
                      </Text>
                    </div>
                    <SvgArrow className="shrink-0 h-4 w-4" />
                  </a>
                </li>
              );
            }
          })}
        </ul>
      </Flex>
    </div>
  );
}
