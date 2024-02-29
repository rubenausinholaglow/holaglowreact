import { Product } from '@interface/product';
import { fetchProduct, fetchProducts } from '@utils/fetch';
import Clinics from 'app/(ssr)/homeSSR/components/Clinics';
import MainLayoutSSR from 'app/(ssr)/homeSSR/components/MainLayout';
import Professionals from 'app/(ssr)/homeSSR/components/Professionals';
import dynamic from 'next/dynamic';

import ProductCrosselling from './components/ProductCrosselling';
import ProductExplanation from './components/ProductExplanation';
import ProductFreeAppointment from './components/ProductFreeAppointment';
import ProductHeaderSSR from './components/ProductHeaderSSR';
import ProductInfoSSR from './components/ProductInfoSSR';
import ProductPaymentOptions from './components/ProductPaymentOptions';
import ProductPricesSSR from './components/ProductPricesSSR';
import ProductResults from './components/ProductResults';
import ProductSuggestions from './components/ProductSuggestions';

const Testimonials = dynamic(
  () => import('app/(ssr)/homeSSR/components/Testimonials'),
  { ssr: false }
);

const FloatingBottomBar = dynamic(
  () => import('app/(web)/components/home/FloatingBottomBar'),
  {
    ssr: false,
  }
);

const ProductFaqs = dynamic(() => import('./components/ProductFaqs'), {
  ssr: false,
});

async function getProducts() {
  const products = await fetchProducts({ isDerma: false });

  return products;
}

async function getProduct(
  productID: string,
  isDashboard: boolean,
  isDerma: boolean
) {
  const product = await fetchProduct(productID, isDashboard, isDerma);

  return product;
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

  const product = await getProduct(productId, false, false);

  return (
    <MainLayoutSSR>
      <div className="bg-hg-cream500 rounded-t-3xl pt-8 pb-12">
        <ProductHeaderSSR product={product} />
        <ProductInfoSSR product={product} />
      </div>
      <ProductResults product={product} />
      <ProductPricesSSR product={product} />
      <ProductPaymentOptions totalPrice={product.price} />
      <ProductExplanation product={product} />
      <ProductFreeAppointment />
      <div className="bg-hg-black50">
        <Testimonials />
      </div>
      <ProductSuggestions product={product} />
      <ProductFaqs product={product} />

      {product.relatedProducts?.length > 0 && (
        <div className="bg-hg-cream500 pt-12 pb-24 md:py-16 md:pb-24">
          <ProductCrosselling product={product} />
        </div>
      )}
      <Clinics />
      <div className="bg-hg-turquoise/5 pt-12 pb-24 md:py-16">
        <Professionals />
      </div>
      <FloatingBottomBar />
    </MainLayoutSSR>
  );
}
