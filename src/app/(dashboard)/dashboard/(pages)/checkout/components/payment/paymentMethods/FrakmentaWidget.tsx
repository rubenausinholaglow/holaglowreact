import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function FrakmentaWidget({
  totalPrice,
  className,
}: {
  totalPrice: number;
  className?: string;
}) {
  return (
    <div className={`w-full ${className ? className : ''}`}>
      <Flex layout="col-left" className="w-full gap-2 text-sm ">
        <div id="fk-widget-installments" data-product_price="6500"></div>
      </Flex>
      <Text size="xs" className="mt-2">
        * Cálculos aproximados
      </Text>
    </div>
  );
}
