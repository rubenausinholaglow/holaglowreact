import { HOLAGLOW_COLORS } from 'app/utils/colors';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function HomeHeroDerma() {
  const ROUTES = useRoutes();

  return (
    <Container className="relative border-b border-hg-black overflow-hidden">
      <Flex layout="col-center" className="md:flex-row">
        <Image
          src="/images/home/Header.png"
          alt="Holaglow"
          width={1195}
          height={1500}
          className="h-auto w-full scale-[135%] mt-[18%] md:w-[55%] md:scale-100 md:mt-0 md:py-16 ml-[15%] md:ml-0"
        />
      </Flex>
    </Container>
  );
}
