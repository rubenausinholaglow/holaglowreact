import { SvgCross } from 'app/icons/IconsDs';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function TreatmentsPrices() {
  return (
    <div className="bg-derma-secondary300 py-4 pb-16">
      <Container>
        <ul className="grid grid-cols-2 grid-rows-2 gap-4 text-derma-tertiaryDark">
          <li className="p-4 rounded-2xl bg-derma-secondary500">
            <SvgCross className="mx-auto mb-4" />
            <Text className="text-center">Tratamiento personalizado</Text>
          </li>
          <li className="p-4 rounded-2xl bg-derma-secondary500">
            <SvgCross className="mx-auto mb-4" />
            <Text className="text-center">Tratamiento personalizado</Text>
          </li>
          <li className="p-4 rounded-2xl bg-derma-secondary500">
            <SvgCross className="mx-auto mb-4" />
            <Text className="text-center">Tratamiento personalizado</Text>
          </li>
          <li className="p-4 rounded-2xl bg-derma-secondary500">
            <SvgCross className="mx-auto mb-4" />
            <Text className="text-center">Tratamiento personalizado</Text>
          </li>
        </ul>
      </Container>
    </div>
  );
}
