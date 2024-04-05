import { SvgCross } from 'app/icons/IconsDs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function OptionsPrices() {
  return (
    <Container className="bg-derma-primary/20 py-4 rounded-2xl -mt-4">
      <ul className="flex flex-col md:flex-row gap-4 w-full">
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
  );
}
