import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgHolaglowHand } from 'icons/Icons';
import { SvgArrow } from 'icons/IconsDs';
import Image from 'next/image';

export default function GoToTreatments() {
  return (
    <div className="bg-gradient-to-t from-hg-pink to-hg-purple500">
      <Container className="py-12">
        <Flex layout="col-left" className="gap-4 items-center md:flex-col">
          <Flex layout="col-left" className="md:w-1/2">
            <SvgHolaglowHand
              height={90}
              width={90}
              className="text-hg-purple mb-6"
            />
            <Title size="2xl" className="font-bold mb-20 text-white">
              La nueva cara de la medicina{' '}
              <Underlined color={HOLAGLOW_COLORS['darkMalva']}>
                estética
              </Underlined>
            </Title>
            <Button type="secondary" size="xl">
              Descubre tu tratamiento
              <SvgArrow className="ml-4" height={24} width={24} />
            </Button>
          </Flex>
          <div className="w-full md:w-1/2 relative aspect-square">
            <Image
              src="/images/home/treatments.png"
              alt="descubre los tratamientos"
              fill
              className="object-cover"
            />
          </div>
        </Flex>
      </Container>
    </div>
  );
}
