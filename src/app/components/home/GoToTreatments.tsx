import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgHolaglowHand } from 'icons/Icons';
import { SvgArrow } from 'icons/IconsDs';
import Image from 'next/image';

export default function GoToTreatments() {
  return (
    <div className="bg-hg-malva300 p-12">
      <Container>
        <Flex layout="row-center" className="gap-4 items-center">
          <Flex layout="col-left" className="w-1/2">
            <SvgHolaglowHand
              height={90}
              width={90}
              className="text-hg-malva mb-6"
            />
            <Title size="2xl" className="font-bold mb-20 text-hg-darkMalva">
              La nueva cara de la medicina{' '}
              <Underlined color={HOLAGLOW_COLORS['lime']}>estética</Underlined>
            </Title>
            <Button type="secondary" size="xl">
              Descubre tu tratamiento
              <SvgArrow className="ml-4" height={24} width={24} />
            </Button>
          </Flex>
          <div className="w-1/2 relative aspect-square">
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
