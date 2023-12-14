import { Voucher } from '../types';

export default function Issues({
  pendingVouchers,
}: {
  pendingVouchers: Array<Voucher>;
}) {
  if (pendingVouchers.length === 0) {
    return <></>;
  }

  return (
    <section className="p-16 pt-8 bg-hg-tertiary500/20 text-black text-lg">
      <h3 className="text-2xl text-hg-tertiary font-semibold text-center mb-8">
        Bono de tratamientos pendientes
      </h3>
      <ul className="flex flex-col gap-3">
        {pendingVouchers.map((voucher, index) => {
          return (
            <li
              key={index}
              className="bg-white p-4 flex justify-between rounded-lg"
            >
              <p>{voucher.name}</p>
              <span className="text-hg-tertiary500">x{voucher.quantity}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
