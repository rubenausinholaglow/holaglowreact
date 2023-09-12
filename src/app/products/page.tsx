import MainLayout from 'app/components/layout/MainLayout';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title, Underlined } from 'designSystem/Texts/Texts';

export default function ProductsPage() {
  return (
    <MainLayout>
      <div className="bg-[#F3EDE9] rounded-t-3xl pt-8">
        <Container>
          <Title size="3xl" className="font-bold mb-12 ">
            Loren ipsum{' '}
            <Underlined color={HOLAGLOW_COLORS['purple700']}>sita</Underlined>
          </Title>
        </Container>
      </div>
    </MainLayout>
  );
}
