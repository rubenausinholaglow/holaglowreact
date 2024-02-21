import AppWrapper from 'app/(web)/components/layout/AppWrapper';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';

export default function BlackFridayAdvice() {
  return (
    <AppWrapper>
      <MainLayout>
        <meta name="robots" content="noindex,follow" />
        <Container className="py-8 md:py-12">
          <Title className="mb-4">
            Bases de la promoción de Black Friday 2023
          </Title>
          <Flex layout="col-left" className="gap-4">
            <ul className="pt-8 mt-6 border-t border-hg-black300 w-full list-disc pl-6 flex flex-col gap-4 mb-20">
              <li>
                La promoción será válida para todos los tratamientos abonados
                íntegramente entre el 13/11/2023 y el 27/11/2023, ambos
                incluidos.
              </li>
              <li>
                La promoción solo aplica a los tratamientos indicados en la
                página web (Packs Black Friday).
              </li>

              <li>
                La promoción no es acumulable a otras promociones activas.
              </li>
            </ul>
          </Flex>
        </Container>
      </MainLayout>
    </AppWrapper>
  );
}
