import { SvgStethoscope } from 'app/icons/Icons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function MedicAdvice() {
  return (
    <Flex className="bg-derma-secondary300 rounded-xl p-3 w-full gap-4 mb-12">
      <div className="bg-derma-primary500 rounded-full p-2">
        <SvgStethoscope className="text-white h-4 w-4" />
      </div>
      <Text className="text-xs md:text-sm text-hg-black500">
        Un médico valorará tu caso y ajustará tu crema personalizada
      </Text>
    </Flex>
  );
}
