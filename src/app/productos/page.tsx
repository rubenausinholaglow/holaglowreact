import CategorySelector from 'app/components/filters/CategorySelector';
import PackTypeFilter from 'app/components/filters/PackTypeFilter';
import MainLayout from 'app/components/layout/MainLayout';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title, Underlined } from 'designSystem/Texts/Texts';

import LookingFor from './components/LookingFor';
import ProductsListing from './components/ProductsListing';

export default function ProductsPage() {
  return (
    <MainLayout>
      <div className="bg-[#F3EDE9] rounded-t-3xl pt-8 pb-4 lg:bg-[url('/images/products/productsBg.png')] bg-right-top bg-no-repeat bg-contain">
        <Container>
          <Title size="3xl" className="font-bold mb-6 lg:mb-12 lg:w-2/5">
            Loren ipsum{' '}
            <Underlined color={HOLAGLOW_COLORS['secondary700']}>
              sita
            </Underlined>
          </Title>
        </Container>
        <Container className="px-0 md:px-4 lg:pb-4">
          <div className="lg:flex lg:flex-row lg:justify-between">
            <CategorySelector className="mb-4 lg:mb-0" />
            <PackTypeFilter className="ml-4 md:ml-0" />
          </div>
        </Container>
      </div>

      <ProductsListing />
      <LookingFor />
    </MainLayout>
  );
}
