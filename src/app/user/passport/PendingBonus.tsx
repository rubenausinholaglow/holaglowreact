import Image from 'next/image';

export default function Issues({ pendingVouchers }: any) {
  if (pendingVouchers.length === 0) {
    return <></>;
  }

  return (
    <section className='p-16 pt-8 bg-hg-100/50 text-hg-500 text-lg'>
      <h3 className='text-2xl text-hg-500 font-semibold text-center mb-8'>Bono de tratamientos pendientes</h3>
      <ul className='flex flex-col gap-3'>
        {pendingVouchers.map((voucher: any) => {
          return (
            <li className='bg-white p-4 flex justify-between rounded-lg'>
              <p>{voucher.name}</p>
              <span className='text-hg-200'>x{voucher.quantity}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
