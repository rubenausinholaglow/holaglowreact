import { SvgCar } from 'app/icons/IconsDs';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function FreeParking({
  className = '',
}: {
  className?: string;
}) {
  return (
    <Flex
      layout="row-left"
      className={`bg-derma-secondary300 p-6 gap-3 rounded-t-2xl md:rounded-2xl w-full items-start relative bottom-0 left-0 right-0 md:relative ${className}`}
    >
      <div className="bg-hg-secondary300 p-3 rounded-full">
        <SvgCar height={16} width={16} className="text-hg-secondary" />
      </div>
      <div>
        <Text size="sm" className="font-semibold mb-2">
          Parking Gratis
        </Text>
        <Text className="text-left" size="xs">
          Te pagamos el parking para que tú disfrutes al máximo de la
          experiencia
        </Text>
      </div>
    </Flex>
  );
}
