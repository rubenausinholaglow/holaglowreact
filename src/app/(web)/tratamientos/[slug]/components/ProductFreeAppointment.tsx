import isMobileSSR from '@utils/isMobileSSR';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

import GoToPVButton from './GoToPVButton';

export default function ProductPaymentOptions() {
  const imgUrl = isMobileSSR()
    ? '/images/product/probadorVirtual.png'
    : '/images/product/probadorVirtual-desk.png';

  return (
    <div className="bg-derma-secondary300 relative">
      <Container className="px-0 md:px-4">
        <Flex
          layout="col-center"
          className="px-4 py-8 md:px-0 md:w-1/2 md:ml-[50%] md:py-24 md:pl-16"
        >
          <Title
            size="2xl"
            className="text-hg-secondary mb-2 md:mb-6 text-center"
          >
            ¿No sabes qué tratamiento hacerte?
          </Title>
          <Text className="mb-8 md:mb-12 md:text-lg text-center text-hg-black500">
            Si sientes curiosidad por algún tratamiento de medicina estética,
            podrás descubrir cómo será el resultado sobre una simulación 3D de
            tu rostro.
          </Text>

          <GoToPVButton />
        </Flex>
        <div
          className="relative aspect-[3/2] md:aspect-auto md:absolute top-0 bottom-0 left-0 right-[50%]"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: isMobileSSR()
              ? 'bottom center'
              : 'right center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
      </Container>
    </div>
  );
}
