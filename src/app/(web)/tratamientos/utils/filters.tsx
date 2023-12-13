import { ProductClinics } from 'app/types/clinic';
import { ProductFilters } from 'app/types/filters';
import { Product } from 'app/types/product';

export const INITIAL_FILTERS = {
  isPack: false,
  category: [],
  zone: [],
  clinic: [],
  text: '',
  price: [],
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
    const isVisibleByCategory =
      filters.category.length == 0 ||
      product.category.some(category =>
        filters.category.includes(category.name)
      );
    const isVisibleByZone =
      filters.zone.length == 0 || filters.zone.includes(product.zone);

    const productClinics: Array<string> = product.clinicDetail.map(
      (item: ProductClinics) => item.clinic.internalName
    );
    const isVisibleByClinic =
      filters.clinic.length == 0 ||
      filters.clinic.some(clinic => productClinics.includes(clinic));

    const isVisibleByPack =
      (product.isPack && filters.isPack) || !filters.isPack;
    let isVisibleByPrice = filters.price.length == 0;
    filters.price.forEach(x => {
      switch (x) {
        case 1:
          isVisibleByPrice = isVisibleByPrice || product.price < 250;
          break;
        case 2:
          isVisibleByPrice =
            isVisibleByPrice || (product.price >= 250 && product.price < 500);
          break;
        case 3:
          isVisibleByPrice = isVisibleByPrice || product.price >= 500;
          break;
      }
    });
    const isVisibleByText =
      filters.text.length === 0 ||
      product.title.toLowerCase().includes(filters.text.toLowerCase());
    const productVisibility = [
      isVisibleByCategory,
      isVisibleByZone,
      isVisibleByClinic,
      isVisibleByPrice,
      isVisibleByText,
      isVisibleByPack,
    ].every(value => value === true);
    return { ...product, visibility: productVisibility };
  });
  return updatedProducts;
};

export const filterCount = (filters: ProductFilters) => {
  let filterCount = 0;

  if (filters.isPack) {
    filterCount = 1;
  }

  if (filters.text) {
    filterCount += 1;
  }
  filterCount = filterCount + filters.category.length;
  filterCount = filterCount + filters.zone.length;
  filterCount = filterCount + filters.clinic.length;
  filterCount = filterCount + filters.price.length;

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
  filter: 'category' | 'zone' | 'clinic' | 'text' | 'price';
  value: string | number;
  filters: ProductFilters;
}) => {
  const updatedFilters: ProductFilters = { ...filters } || {};
  if (filter == 'text') {
    updatedFilters.text = value.toString();
  } else {
    const valueIndex = (
      updatedFilters[filter] as Array<string | number>
    ).indexOf(value);

    if (valueIndex === -1) {
      (updatedFilters[filter] as Array<string | number>).push(value);
    } else {
      updatedFilters[filter].splice(valueIndex, 1);
    }
  }
  return updatedFilters;
};
