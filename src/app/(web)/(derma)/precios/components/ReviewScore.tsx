import { SvgHolaglowHand } from 'app/icons/Icons';
import { SvgByGoogle, SvgStar } from 'app/icons/IconsDs';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function ReviewScore({
  className = '',
}: {
  className?: string;
}) {
  return (
    <Flex layout="row-left" className={`gap-4 py-4 ${className}`}>
      <Flex layout="col-center" className="gap-1">
        <SvgHolaglowHand className="h-10 w-10 p-1.5 bg-derma-tertiary text-derma-primary rounded-full" />
        <Text className="font-semibold text-lg">4.8</Text>
      </Flex>
      <Flex layout="col-left" className="gap-1 mr-auto">
        <Text className="font-semibold">Holaglow clinics</Text>
        <Text className="text-hg-black500 text-xs mb-1">
          + de 1.000 pecientes atendidos
        </Text>
        <ul className="flex gap-2">
          <li>
            <SvgStar className="text-derma-primary h-4 w-4" />
          </li>
          <li>
            <SvgStar className="text-derma-primary h-4 w-4" />
          </li>
          <li>
            <SvgStar className="text-derma-primary h-4 w-4" />
          </li>
          <li>
            <SvgStar className="text-derma-primary h-4 w-4" />
          </li>
          <li>
            <SvgStar className="text-derma-primary h-4 w-4" />
          </li>
        </ul>
      </Flex>
      <SvgByGoogle className="self-end" />
    </Flex>
  );
}
