import { Product } from '@interface/product';
import ClinicsSSR from 'app/(web)/components/common/ClinicsSSR';
import MainLayoutSSR from 'app/(web)/components/layout/MainLayoutSSR';
import dynamic from 'next/dynamic';

import ProductCrosselling from './components/ProductCrosselling';
import ProductExplanation from './components/ProductExplanation';
import ProductFreeAppointment from './components/ProductFreeAppointment';
import ProductHeaderSSR from './components/ProductHeaderSSR';
import ProductPaymentOptions from './components/ProductPaymentOptions';
import ProductPricesSSR from './components/ProductPricesSSR';
import ProductSuggestions from './components/ProductSuggestions';
import ProductVideos from './components/ProductVideos';

const ProfessionalsSSR = dynamic(
  () => import('app/(web)/components/common/ProfessionalsSSR'),
  { ssr: false }
);

const Testimonials = dynamic(
  () => import('app/(web)/components/home/Testimonials'),
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

export default function ProductPage({ product }: { product: Product }) {
  return (
    <MainLayoutSSR>
      <div className="bg-derma-secondary300 rounded-t-3xl pt-8 relative">
        <ProductHeaderSSR product={product} />
      </div>
      <ProductVideos product={product} />
      <div className="bg-hg-secondary100 py-12">
        <ProfessionalsSSR />
      </div>
      <ProductPricesSSR product={product} />
      <ProductPaymentOptions totalPrice={product.price} />
      <ProductFreeAppointment />
      <div className="bg-hg-black50">
        <Testimonials />
      </div>
      <ProductSuggestions product={product} />
      <ProductFaqs product={product} />
      <div className="bg-derma-secondary300 py-12">
        <ProductCrosselling product={product} />
      </div>
      <ProductExplanation product={product} />
      <ClinicsSSR />
      <FloatingBottomBar threshold={1200} product={product} />
    </MainLayoutSSR>
  );
}
