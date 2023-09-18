import { Product } from '@interface/product';
import { has, isEmpty } from 'lodash';
import { ProductFilters } from 'types/filters';

const filterByCategory = ({
  products,
  filters,
}: {
  products: Product[];
  filters: ProductFilters;
}) => {
  let updatedProducts = products;

  if (has(filters, 'category') && !isEmpty(filters.category)) {
    updatedProducts = products.map(product => {
      return {
        ...product,
        visibility: product.category.some(category =>
          filters.category.includes(category.name)
        ),
      };
    });
  }

  return updatedProducts;
};

export const applyFilters = ({
  products,
  filters,
}: {
  products: Product[];
  filters: ProductFilters;
}) => {
  let updatedProducts = products;

  updatedProducts = filterByCategory({ products, filters });

  return updatedProducts;
};

export const filterCount = (filters: ProductFilters) => {
  let filterCount = 0;

  for (const key in filters) {
    if (Array.isArray(filters[key])) {
      filterCount += filters[key].length;
    }
  }

  return filterCount;
};

export const toggleCategory = ({
  category,
  filters,
}: {
  category: string;
  filters: ProductFilters;
}) => {
  console.log(category);
  console.log(filters);

  const updatedFilters: ProductFilters = { ...filters } || {};

  if (!updatedFilters.category) {
    updatedFilters.category = [];
  }

  const categoryIndex = updatedFilters.category.indexOf(category);

  if (categoryIndex === -1) {
    updatedFilters.category.push(category);
  } else {
    updatedFilters.category.splice(categoryIndex, 1);
  }

  console.log(updatedFilters);

  return updatedFilters;
};
