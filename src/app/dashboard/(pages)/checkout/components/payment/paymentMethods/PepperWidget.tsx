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

export default function PepperWidget({ totalPrice }: { totalPrice: number }) {
  return (
    <div className="w-full">
      <Flex layout="col-left" className="w-full gap-2">
        <Flex className="w-full">
          <p className="bg-hg-secondary100 rounded-lg py-1.5 px-3  w-2/5 border border-hg-secondary100 text-left">
            Pago financiado
          </p>
          <p className="-ml-2 rounded-lg bg-white p-1.5 w-1/2 max-w-[200px] border border-hg-black">
            Importe mensual
          </p>
        </Flex>
        {PEPPER_TABLE_CONFIG.periods.map((period, index) => (
          <Flex className="w-full" key={index}>
            <p className="bg-hg-secondary100 rounded-lg py-1.5 px-3  w-1/2 border border-hg-secondary100 text-left">
              {period}
            </p>
            <p className="-ml-2 rounded-lg bg-white p-1.5 w-1/2 max-w-[100px] border border-hg-black">
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
