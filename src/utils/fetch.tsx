import { Product } from '@interface/product';
import ProductService from '@services/ProductService';

export async function FetchProducts(
  setStateProducts: (products: Product[]) => void
) {
  try {
    const fetchedProducts = await ProductService.getAllProducts();

    const productsWithVisibility = fetchedProducts.map((product: Product) => ({
      ...product,
      visibility: true,
    }));

    setStateProducts(productsWithVisibility);
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return null;
}
