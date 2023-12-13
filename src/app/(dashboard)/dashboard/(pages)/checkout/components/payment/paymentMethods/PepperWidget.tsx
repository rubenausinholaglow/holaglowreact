import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { priceFormat } from 'utils/priceFormat';

const PEPPER_TABLE_CONFIG = {
  periods: [
    'En 3 meses',
    'En 4 meses',
    'En 6 meses',
    'En 9 meses',
    'En 12 meses',
    'En 18 meses',
  ],
  values: [1 / 3, 1 / 4, 1 / 6, 1.055 / 9, 1.075 / 12, 1.117 / 18],
};

export default function PepperWidget({
  totalPrice,
  className,
}: {
  totalPrice: number;
  className?: string;
}) {
  return (
    <div className={`w-full ${className ? className : ''}`}>
      <Flex layout="col-left" className="w-full gap-2 text-sm ">
        <Flex className="w-full bg-hg-secondary100 rounded-lg font-semibold">
          <p className=" py-1.5 px-3 w-1/2 text-left shrink-0">
            Pago financiado
          </p>
          <p className="rounded-lg bg-white p-1.5 w-1/2 border border-hg-black">
            {totalPrice} €
          </p>
        </Flex>
        {PEPPER_TABLE_CONFIG.periods.map((period, index) => (
          <Flex className="w-full bg-hg-secondary100 rounded-lg" key={index}>
            <p className="rounded-lg py-1.5 px-3 w-1/2 text-left">{period}</p>
            <p className="rounded-lg bg-white p-1.5 w-1/2 border border-hg-black">
              {`${priceFormat(totalPrice * PEPPER_TABLE_CONFIG.values[index])}`}{' '}
              €
            </p>
          </Flex>
        ))}
      </Flex>
      <Text size="xs" className="mt-2">
        * Cálculos aproximados
      </Text>
    </div>
  );
}
