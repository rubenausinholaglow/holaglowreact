import { type Product as ProductType } from '@interface/product';

export function productsWithPriceDiscount(products: Array<ProductType>) {
  return products.map(product => {
    let priceWithDiscount = product.price;

    if (product.priceDiscount > 0) {
      priceWithDiscount = product.priceDiscount;
    }

    if (product.percentageDiscount > 0) {
      priceWithDiscount =
        priceWithDiscount - priceWithDiscount * product.percentageDiscount;
    }

    return {
      ...product,
      priceWithDiscount: priceWithDiscount,
    };
  });
}

export function getFinalPriceWithDiscount(products: Array<ProductType>) {
  return products;
}
