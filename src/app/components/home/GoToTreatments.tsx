import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgHolaglowHand } from 'icons/Icons';
import { SvgArrow } from 'icons/IconsDs';
import Image from 'next/image';

export default function GoToTreatments() {
  return (
    <div className="bg-gradient-15deg from-hg-pink to-hg-secondary700">
      <Container className="py-12">
        <Flex layout="col-left" className="gap-4 items-center md:flex-row">
          <Flex layout="col-left" className="md:w-1/2">
            <SvgHolaglowHand
              height={90}
              width={90}
              className="text-hg-secondary mb-6"
            />
            <Title size="2xl" className="font-bold mb-12 md:mb-6 text-white">
              ¿Te ayudamos a encontrar tu{' '}
              <Underlined color={HOLAGLOW_COLORS['tertiary']}>
                tratamiento
              </Underlined>{' '}
              ideal?
            </Title>
            <Text size="lg" className="text-white mb-12">
              Nosotros preguntamos y tú respondes. Fácil y rápido. Este es el
              primer paso para descubrir juntos cuál es el tratamiento que mejor
              se adapta a ti, a tus necesidades y a tus deseos.
            </Text>
            <Button
              type="secondary"
              size="xl"
              className="mx-auto md:mx-0 mb-10"
              href="https://holaglow.com/multistep/"
            >
              Hacer test
              <SvgArrow className="ml-4" height={24} width={24} />
            </Button>
          </Flex>
          <div className="w-full md:w-1/2 relative aspect-square">
            <Image
              src="/images/home/treatments.png"
              alt="descubre los tratamientos"
              fill
              className="object-fit"
            />
          </div>
        </Flex>
      </Container>
    </div>
  );
}
