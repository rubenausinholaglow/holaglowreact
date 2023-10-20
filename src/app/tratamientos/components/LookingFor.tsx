import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgPhone, SvgWhatsapp } from 'icons/IconsDs';

export default function LookingFor() {
  return (
    <div className="bg-[url('/images/products/lookingForBg.png')] md:bg-[url('/images/products/lookingForBg-desktop.png')] bg-bottom bg-cover pt-16 pb-[650px] md:py-32">
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

          <a href="tel:682417208">
            <Button type="secondary" size="xl" className="mb-8">
              <SvgPhone className="mr-4" />
              Llámanos ahora
            </Button>
          </a>

          <a href="https://wa.me/+34930346565?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20Holaglow%20y%20vuestros%20tratamientos">
            <Button
              type="tertiary"
              className="mt-auto"
              bgColor="bg-hg-primary"
              customStyles="hover:bg-hg-secondary100"
              size="xl"
            >
              <SvgWhatsapp className="mr-4" />
              Contacta con nosotros
            </Button>
          </a>
        </Flex>
      </Container>
    </div>
  );
}
