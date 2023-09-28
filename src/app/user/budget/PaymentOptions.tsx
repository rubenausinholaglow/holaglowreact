import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Text, Underlined } from 'designSystem/Texts/Texts';
import { priceFormat } from 'utils/priceFormat';

export function PaymentTable({
  totalPrice,
  tableStyles,
}: {
  totalPrice: number;
  tableStyles?: string;
}) {
  return (
    <>
      <h3 className="text-lg font-semibold md:text-2xl">
        Tu tratamiento
        <br />
        desde{' '}
        <Underlined color={HOLAGLOW_COLORS['primary']} className="font-bold">
          {`${priceFormat((totalPrice * 1.117) / 18)}`}€
        </Underlined>{' '}
        al mes*
      </h3>
      <p className="text-sm md:pr-8 mb-4 mt-2 md:text-md">
        Te ofrecemos una experiencia de compra más flexible con financiación
        hasta en 18 meses
      </p>
      <div
        className={`flex gap-2 text-xs text-center ${
          tableStyles ? tableStyles : ''
        }`}
      >
        <div className="flex flex-col gap-1 w-1/2">
          <p className="rounded-md bg-hg-primary/30 py-1 px-2 opacity-50">
            Pago financiado
          </p>
          <p className="rounded-md bg-hg-primary/30 py-1 px-2">En 3 meses</p>
          <p className="rounded-md bg-hg-primary/30 py-1 px-2">En 4 meses</p>
          <p className="rounded-md bg-hg-primary/30 py-1 px-2">En 6 meses</p>
          <p className="rounded-md bg-hg-primary/30 py-1 px-2">En 9 meses</p>
          <p className="rounded-md bg-hg-primary/30 py-1 px-2">En 12 meses</p>
          <p className="rounded-md bg-hg-primary/30 py-1 px-2">En 18 meses</p>
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <p className="rounded-md bg-white/50 py-1 px-2 text-[#717D96]">
            Importe mensual
          </p>
          <p className="rounded-md bg-white py-1 px-2 font-semibold">
            {`${priceFormat(totalPrice / 3)}`} €
          </p>
          <p className="rounded-md bg-white py-1 px-2 font-semibold">
            {`${priceFormat(totalPrice / 4)}`} €
          </p>
          <p className="rounded-md bg-white py-1 px-2 font-semibold">
            {`${priceFormat(totalPrice / 6)}`} €
          </p>
          <p className="rounded-md bg-white py-1 px-2 font-semibold">
            {`${priceFormat((totalPrice * 1.055) / 9)}`} €
          </p>
          <p className="rounded-md bg-white py-1 px-2 font-semibold">
            {`${priceFormat((totalPrice * 1.075) / 12)}`} €
          </p>
          <p className="rounded-md bg-white py-1 px-2 font-semibold border border-hg-black500">
            {`${priceFormat((totalPrice * 1.117) / 18)}`} €
          </p>
        </div>
      </div>
      <Text size="xs" className="mt-2 italic">
        * Cálculos aproximados
      </Text>
    </>
  );
}

export default function PaymentOptions({ totalPrice }: { totalPrice: number }) {
  return (
    <section className="bg-white p-8 text-black">
      <div className='bg-[url("/images/budget/paymentOptions.png")] bg-cover pl-[55%] rounded-[35px] p-8'>
        <PaymentTable totalPrice={totalPrice} />
      </div>
    </section>
  );
}
