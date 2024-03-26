import { SvgPhone, SvgWhatsapp } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

export default function LookingFor() {
  return (
    <div className="bg-hg-secondary py-12 md:py-24" id="lookingFor">
      <Container>
        <Flex layout="col-center">
          <Title
            isAnimated
            size="2xl"
            className="font-bold text-hg-primary text-center mb-12"
          >
            ¿No has encontrado lo que querías?
          </Title>

          <Flex
            layout="col-center"
            className="gap-8 md:gap-12 md:flex-row md:justify-center"
          >
            <Button
              isAnimated
              type="secondary"
              size="xl"
              href="tel:682417208"
              id={'tmevent_help_module_click'}
            >
              <SvgPhone className="mr-4" />
              <div>
                <Text className="text-md">Llámanos ahora</Text>
                <Text className="text-xs font-light hidden md:block">
                  (+34) 682 417 208
                </Text>
              </div>
            </Button>

            <Button
              id={'tmevent_help_module_click'}
              isAnimated
              type="secondary"
              size="xl"
              href="https://wa.me/+34930346565?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20Holaglow%20y%20vuestros%20tratamientos"
            >
              <SvgWhatsapp className="mr-4" />
              <Text className="text-md">Contacta con nosotros</Text>
            </Button>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
}
