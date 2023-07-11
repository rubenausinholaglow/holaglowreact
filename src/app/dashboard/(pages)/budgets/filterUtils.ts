import { Product } from '@interface/product';

export const applyFilter = (filters: string[], inputText: string, products: Product[], tag : string, originfilteredProducts : Product[] ) : Product[] => {
  const currentProducts = [...products];
  let filteredProducts: Product[] = [];

  filters.forEach((filter) => {

    console.log('Filter ' + filter)

    switch (tag) {
      case "MoneyFilter": 
        if(filteredProducts.length > 0)
        {
          filteredProducts = filteredProducts.concat(applyPriceFilter(filter, filteredProducts));
        } else
        { filteredProducts = filteredProducts.concat(applyPriceFilter(filter, currentProducts)); }
        break;
      case "Packs": 
        if(filteredProducts.length > 0)
        {
          filteredProducts = applyPackFilter(filteredProducts);
        } else {
          filteredProducts = applyPackFilter(currentProducts);
        }
        break;
      default:
          break;
    }
  });

  if (inputText.length > 0) {
    const searchTerm = inputText.toLowerCase();
    if (filteredProducts.length === 0) {
      filteredProducts = applySearchFilter(searchTerm, currentProducts);
    } else {
      filteredProducts = applySearchFilter(searchTerm, filteredProducts);
    }
  }

  return filteredProducts;
};

const applyPackFilter = (products: Product[]): Product[] => {
    return products.filter((product) => product.isPack);
};


const applyPriceFilter = (filter: string, products: Product[]): Product[] => {
  const [minPrice, maxPrice] = getPriceRange(filter);
  return products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
};

const getPriceRange = (filter: string): [number, number] => {
  switch (filter) {
    case "0-250":
      return [0, 250];
    case "250-500":
      return [250, 500];
    case "500":
      return [500, Number.POSITIVE_INFINITY];
    default:
      return [0, Number.POSITIVE_INFINITY];
  }
};

const applySearchFilter = (searchTerm: string, products: Product[]): Product[] => {
  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
  );
};
