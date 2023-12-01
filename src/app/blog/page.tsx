import MainLayout from 'app/components/layout/MainLayout';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import BlogCategorySelector from './components/BlogCategorySelector';
import BlogIntro from './components/BlogIntro';
import BlogItem from './components/BlogItem';

export default function Blog() {
  return (
    <MainLayout>
      <div className="rounded-t-3xl shadow-centered-black-lg ">
        <Container className="border-b border-hg-black mb-8 pt-8 md:pt-12 ">
          <Text className="font-gtUltraBold text-4xl text-hg-secondary mb-10 md:text-6xl tracking-tighter md:text-center">
            Tu <Underlined color={HOLAGLOW_COLORS['primary']}>glow</Underlined>,
            tus normas
          </Text>
          <Text className="font-semibold text-xl mb-8">Lo último..</Text>

          <BlogIntro showButton />
        </Container>

        <Container className="px-0">
          <BlogCategorySelector className="mb-8" />
        </Container>

        <Container>
          <Flex layout="col-left" className="gap-8 md:grid grid-cols-3">
            <BlogItem />
            <BlogItem />
            <BlogItem />
            <BlogItem />
          </Flex>
        </Container>
      </div>
    </MainLayout>
  );
}
