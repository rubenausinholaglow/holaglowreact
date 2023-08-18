import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function HomeHero() {
  return (
    <div className="bg-hg-skyblue/20 overflow-hidden">
      <Container className="py-12">
        <Flex layout="row-center" className="gap-12 w-full items-stretch">
          <div className="relative overflow-hidden w-1/2">
            <Image
              src="/images/home/profesionales.png"
              alt="profesionales"
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <Flex layout="col-left" className="w-1/2">
            <Title size="2xl" className="font-bold mb-6">
              Equipo médico con los mejores{' '}
              <Underlined color={HOLAGLOW_COLORS['malva']}>
                profesionales
              </Underlined>
            </Title>
            <Text size="lg" className="text-hg-gray-200 mb-8">
              Sed necessitatibus saepe qui tenetur delectus 33 officiis
              inventore et rerum unde cum officiis repellendus
            </Text>
            <Button type="secondary" size="xl">
              Conoce al equipo médico
            </Button>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
}
