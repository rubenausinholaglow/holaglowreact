'use client';

import Agenda from 'app/(web)/checkout/agenda/Agenda';
import { SvgStethoscope } from 'app/icons/Icons';
import { SvgVideo } from 'app/icons/IconsDs';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function ThirdStep({
  activeSlideIndex,
}: {
  activeSlideIndex: number;
}) {
  return (
    <div>
      {activeSlideIndex === 4 && (
        <>
          <Container>
            <Text className="text-sm text-derma-primary500 mb-2">
              Paso {activeSlideIndex + 1}, Agenda madre {activeSlideIndex}
            </Text>
            <Text className="font-gtUltraThin mb-2 font-bold text-xl text-derma-primary">
              Selecciona tu horario preferida
            </Text>
            <Text className="text-hg-black500 text-sm mb-4">
              Después de tu consulta, tu médico te recomendará una rutina
              personalizada de cuidado de la piel adaptada a tus metas, que
              podrás recibir en tu puerta según tu preferencia. Los detalles de
              tu cita online con el médico se proporcionarán por correo
              electrónico al pagar.
            </Text>
            <ul className="flex flex-col gap-4 mb-8 text-xs text-hg-black500">
              <li className="flex gap-2">
                <SvgVideo />
                Los detalles del vídeo se proporcionarán por correo electrónico
                tras la confirmación
              </li>
              <li className="flex gap-2">
                <SvgStethoscope />
                Consulta online con dermatólogo especializado
              </li>
            </ul>
          </Container>
          <Agenda isDashboard={true} isDerma={true}></Agenda>
        </>
      )}
    </div>
  );
}
