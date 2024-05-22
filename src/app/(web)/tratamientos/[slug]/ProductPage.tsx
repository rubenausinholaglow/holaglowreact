import { Product } from '@interface/product';
import ClinicsSSR from 'app/(web)/components/common/ClinicsSSR';
import ProfessionalsSSR from 'app/(web)/components/common/ProfessionalsSSR';
import FloatingBottomBar from 'app/(web)/components/home/FloatingBottomBar';
import Testimonials from 'app/(web)/components/home/Testimonials';
import MainLayoutSSR from 'app/(web)/components/layout/MainLayoutSSR';

import ProductCrosselling from './components/ProductCrosselling';
import ProductExplanation from './components/ProductExplanation';
import ProductFaqs from './components/ProductFaqs';
import ProductFreeAppointment from './components/ProductFreeAppointment';
import ProductHeaderSSR from './components/ProductHeaderSSR';
import ProductPaymentOptions from './components/ProductPaymentOptions';
import ProductPricesSSR from './components/ProductPricesSSR';
import ProductSuggestions from './components/ProductSuggestions';
import ProductVideos from './components/ProductVideos';

export default function ProductPage({ product }: { product: Product }) {
  return (
    <MainLayoutSSR>
      <div className="bg-derma-secondary300 rounded-t-3xl pt-8 relative">
        <ProductHeaderSSR product={product} />
      </div>
      <ProductVideos product={product} />
      <ProductPricesSSR product={product} />
      <ProductPaymentOptions totalPrice={product.price} />
      <div className="bg-hg-secondary100 py-12">
        <ProfessionalsSSR />
      </div>
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
