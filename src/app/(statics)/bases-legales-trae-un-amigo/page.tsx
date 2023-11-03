import MainLayout from 'app/components/layout/MainLayout';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';

export default function LegalAdvice() {
  return (
    <MainLayout>
      <meta name="robots" content="noindex,follow" />
      <Container className="py-8 md:py-12">
        <Title className="mb-8">Bases de la promoción “Trae a un amigo”</Title>
        <Flex layout="col-left" className="gap-4">
          <p>
            La promoción será válida hasta el 31/12/2023. Holaglow se reserva el
            derecho de finalizar la promoción anticipadamente.
          </p>

          <ul className="pt-8 mt-6 border-t border-hg-black300 w-full list-disc pl-6 flex flex-col gap-4 mb-20">
            <li>
              Para poder beneficiarse de la promoción el referidor tiene que
              constar como cliente de Holaglow (tiene que haberse realizado al
              menos un tratamiento).
            </li>
            <li>
              Para que la persona que recibe la invitación de un amigo pueda
              beneficiarse de los 50€ de la promoción, no debe constar como
              cliente de Holaglow.
            </li>

            <li>
              El bono de 50€ solo es válido para tratamientos con importe
              superior a 200€.
            </li>

            <li>
              Puedes acumular tantos bonos de la promoción &quot;Trae a un
              amigo&quot; como quieras y canjearlos por separado o conjuntamente
              en tratamientos para ti. La promoción no es acumulable a otras
              ofertas y promociones.
            </li>

            <li>
              Los bonos conseguidos como referidor o a través de una invitación
              no son transferibles.
            </li>
          </ul>
        </Flex>
      </Container>
    </MainLayout>
  );
}
