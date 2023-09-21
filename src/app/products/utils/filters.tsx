import { Clinic, ProductClinics } from '@interface/clinic';
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

  const hasArrayFilters =
    filters.category.length > 0 &&
    filters.zone.length > 0 &&
    filters.clinic.length > 0;

  updatedProducts = products.map(product => {
    const isVisibleByCategory = product.category.some(category =>
      filters.category.includes(category.name)
    );
    const isVisibleByZone = filters.zone.includes(product.zone);

    const productClinics: Array<string> = product.clinicDetail.map(
      (item: ProductClinics) => item.clinic.internalName
    );
    const isVisibleByClinic = filters.clinic.some(clinic =>
      productClinics.includes(clinic)
    );

    let productVisibility = [
      isVisibleByCategory,
      isVisibleByZone,
      isVisibleByClinic,
    ].some(value => value === true);

    const isVisibleByPack =
      (product.isPack && filters.isPack) || !filters.isPack;

    //console.log(isVisibleByPack, product.title);

    if (!hasArrayFilters) {
      productVisibility = true;
    }

    productVisibility = productVisibility && isVisibleByPack;

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
  filterCount = filterCount + filters.clinic.length;

  return filterCount;
};

export const toggleIsPack = (filters: ProductFilters) => {
  let updatedFilters = filters;
  updatedFilters = { ...updatedFilters, isPack: !updatedFilters.isPack };

  return updatedFilters;
};

export const toggleCategory = ({
  category,
  filters,
}: {
  category: string;
  filters: ProductFilters;
}) => {
  const updatedFilters: ProductFilters = { ...filters } || {};

  const categoryIndex = updatedFilters.category.indexOf(category);

  if (categoryIndex === -1) {
    updatedFilters.category.push(category);
  } else {
    updatedFilters.category.splice(categoryIndex, 1);
  }

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

  console.log(zone);

  const zoneIndex = updatedFilters.zone.indexOf(zone);

  if (zoneIndex === -1) {
    updatedFilters.zone.push(zone);
  } else {
    updatedFilters.zone.splice(zoneIndex, 1);
  }

  return updatedFilters;
};

export const toggleFilter = ({
  filter,
  value,
  filters,
}: {
  filter: 'category' | 'zone' | 'clinic';
  value: string | number;
  filters: ProductFilters;
}) => {
  const updatedFilters: ProductFilters = { ...filters } || {};

  const valueIndex = (updatedFilters[filter] as Array<string | number>).indexOf(
    value
  );

  if (valueIndex === -1) {
    (updatedFilters[filter] as Array<string | number>).push(value);
  } else {
    updatedFilters[filter].splice(valueIndex, 1);
  }

  return updatedFilters;
};
