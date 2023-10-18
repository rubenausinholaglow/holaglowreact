import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { ROUTES } from 'app/utils/routes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function HomeHero() {
  return (
    <Container className="relative border-b border-hg-black">
      <Flex layout="col-center" className="md:flex-row">
        <Image
          src="/images/home/Header.png"
          alt="Holaglow"
          width={1195}
          height={1500}
          className="h-auto w-full scale-[140%] mt-[18%] md:w-[55%] md:scale-100 md:mt-0 md:py-16"
        />
        <Flex
          layout="col-left"
          className="pb-10 z-10 w-full md:w-[45%] md:pl-8"
        >
          <Text size="xl" className="mb-2">
            Medicina estética
          </Text>
          <Title
            size="3xl"
            className="text-left font-bold leading-none mb-6 md:mb-12"
          >
            Tu <Underlined color={HOLAGLOW_COLORS['primary']}>glow</Underlined>,
            <br />
            tus normas
          </Title>
        <Flex>
          <Button
            type="primary"
            size="xl"
            href={ROUTES.treatments}
            className="mr-2"
          >
              Ver tratamientos
            </Button>
          <Button type="tertiary" size="xl" href={ROUTES.checkout.clinics}>
            Pedir cita
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
