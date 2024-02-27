import { Product } from '@interface/product';
import { fetchProduct, fetchProducts } from '@utils/fetch';
import MainLayoutSSR from 'app/(ssr)/homeSSR/components/MainLayout';

import ProductHeaderSSR from './components/ProductHeaderSSR';
import ProductInfoSSR from './components/ProductInfoSSR';
import ProductResults from './components/ProductResults';

async function getProducts() {
  const products = await fetchProducts({ isDerma: false });

  return products;
}

async function getProduct(productID: string) {
  const products = await fetchProduct(productID);

  return products;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string; isDashboard: boolean };
}) {
  const products = await getProducts();

  const productId = products.filter(
    (product: Product) => product?.extraInformation?.slug === params.slug
  )[0].id;

  const product = await getProduct(productId);

  return (
    <MainLayoutSSR>
      <div className="bg-hg-cream500 rounded-t-3xl pt-8 pb-12">
        <ProductHeaderSSR product={product} />
        <ProductInfoSSR product={product} />
      </div>
      {/* {product.beforeAndAfterImages?.length > 0 && (
        <ProductResults product={product} />
      )} */}
    </MainLayoutSSR>
  );
}
