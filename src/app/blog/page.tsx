import MainLayout from 'app/components/layout/MainLayout';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function Blog() {
  return (
    <MainLayout>
      <Container>
        <Title className="font-gtUltraBold text-4xl text-hg-secondary mb-12">
          Tu <Underlined color={HOLAGLOW_COLORS['primary']}>glow</Underlined>,
          tus normas
        </Title>
        <Text className="font-semibold text-xl">Lo último..</Text>

        <Image
          src="/images/home/Header.png"
          alt="placeholder"
          height={400}
          width={600}
          className="w-full"
        />
      </Container>
    </MainLayout>
  );
}
