import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgPhone, SvgWhatsapp } from 'icons/IconsDs';

export default function LookingFor() {
  return (
    <div className="bg-[url('/images/products/lookingForBg.png')] md:bg-[url('/images/products/lookingForBg-desktop.png')] bg-[#e3e2f9] bg-no-repeat bg-[75%_100%] md:bg-bottom bg-contain pt-12 pb-[600px] md:py-36">
      <Container>
        <Flex layout="col-center" className="md:items-start md:w-2/5">
          <Title
            size="2xl"
            className="font-bold text-hg-secondary text-center mb-12 md:text-left"
          >
            ¿No has{' '}
            <Underlined color={HOLAGLOW_COLORS['primary']}>
              encontrado
            </Underlined>{' '}
            lo que querías?
          </Title>

          <Button type="secondary" size="xl" className="mb-8">
            <SvgPhone className="mr-4" />
            Llámanos ahora
          </Button>

          <Button type="tertiary" bgColor="bg-hg-primary" size="xl">
            <SvgWhatsapp className="mr-4" />
            Contacta con nosotros
          </Button>
        </Flex>
      </Container>
    </div>
  );
}
