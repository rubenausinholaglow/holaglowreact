import {
  SvgBox,
  SvgCalendarSearch,
  SvgStethoscope,
  SvgUsers,
} from 'app/icons/IconsDs';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function TreatmentsPrices() {
  return (
    <div className="bg-derma-secondary300 py-4 pb-16 md:pt-12">
      <Container>
        <ul className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 gap-4 md:gap-6 text-derma-tertiaryDark">
          <li className="p-4 md:py-6 rounded-2xl bg-derma-secondary500">
            <SvgUsers className="h-12 w-12 text-derma-primary500 mx-auto mb-4" />
            <Text className="text-center md:text-lg">
              Tratamiento personalizado
            </Text>
          </li>
          <li className="p-4 md:py-6 rounded-2xl bg-derma-secondary500">
            <SvgStethoscope className="h-12 w-12 text-derma-primary500 mx-auto mb-4" />
            <Text className="text-center md:text-lg">
              Médicos especialistas
            </Text>
          </li>
          <li className="p-4 md:py-6 rounded-2xl bg-derma-secondary500">
            <SvgCalendarSearch className="h-12 w-12 text-derma-primary500 mx-auto mb-4" />
            <Text className="text-center md:text-lg">Seguimiento continuo</Text>
          </li>
          <li className="p-4 md:py-6 rounded-2xl bg-derma-secondary500">
            <SvgBox className="h-12 w-12 text-derma-primary500 mx-auto mb-4" />
            <Text className="text-center md:text-lg">Envío gratis</Text>
          </li>
        </ul>
      </Container>
    </div>
  );
}
