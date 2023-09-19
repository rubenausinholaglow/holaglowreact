import { Product } from '@interface/product';
import { ProductFilters } from 'types/filters';

export const INITIAL_FILTERS = {
  isPack: false,
  category: [],
  zone: [],
  clinic: [],
};

export const applyFilters = ({
  products,
  filters,
}: {
  products: Product[];
  filters: ProductFilters;
}) => {
  let updatedProducts = products;

  updatedProducts = products.map(product => {
    const isVisibleByCategory = product.category.some(category =>
      filters.category.includes(category.name)
    );

    const isVisibleByPack = product.isPack && filters.isPack;

    const isVisibleByZone = filters.zone.includes(product.zone);

    const productVisibility = [
      isVisibleByCategory,
      isVisibleByPack,
      isVisibleByZone,
    ].some(value => value === true);

    return { ...product, visibility: productVisibility };
  });

  return updatedProducts;
};

export const filterCount = (filters: ProductFilters) => {
  let filterCount = 0;

  if (filters.isPack) {
    filterCount = 1;
  }

  filterCount = filterCount + filters.category.length;
  filterCount = filterCount + filters.zone.length;

  return filterCount;
};

export const toggleCategory = ({
  category,
  filters,
}: {
  category: string;
  filters: ProductFilters;
}) => {
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

  return updatedFilters;
};

export const toggleIsPack = (filters: ProductFilters) => {
  let updatedFilters = filters;
  updatedFilters = { ...updatedFilters, isPack: !updatedFilters.isPack };

  return updatedFilters;
};

export const toggleZone = ({
  zone,
  filters,
}: {
  zone: number;
  filters: ProductFilters;
}) => {
  const updatedFilters: ProductFilters = { ...filters } || {};

  if (!updatedFilters.zone) {
    updatedFilters.zone = [];
  }

  console.log(zone);

  const zoneIndex = updatedFilters.zone.indexOf(zone);

  if (zoneIndex === -1) {
    updatedFilters.zone.push(zone);
  } else {
    updatedFilters.zone.splice(zoneIndex, 1);
  }

  return updatedFilters;
};
