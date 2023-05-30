import Image from 'next/image';

export default function Issues() {
  return (
    <section className='p-16 bg-hg-100/50 text-hg-500 text-lg'>
      <h3 className='font-semibold mb-4'>Bono de tratamientos pendientes</h3>
      <ul className='flex flex-col gap-3 mb-8'>
        <li className='bg-white p-4 flex justify-between rounded-lg'>
          <p>Vial de ácido hialurónico</p>
          <span className='text-hg-200'>x2</span>
        </li>
        <li className='bg-white p-4 flex justify-between rounded-lg'>
          <p>Vial de tratamiento antiarrugas</p>
          <span className='text-hg-200'>x1</span>
        </li>
        <li className='bg-white p-4 flex justify-between rounded-lg'>
          <p>Vial de vitaminas</p>
          <span className='text-hg-200'>x1</span>
        </li>
      </ul>

      <div className='bg-[url("/images/passport/walletGlowBg.png")] bg-cover bg-no-repeat bg-left-bottom text-white h-[283px] w-full px-4'>
        <Image
          src='/images/passport/walletGlowProgram.png'
          width={200}
          height={64}
          alt='wallet glow program'
          className='mb-8 pt-14'
        />
        <div className='text-sm w-1/2'>
          <p className='mb-2'>
            Bienvenid@ a nuestro programa de fidelización. Actualmente tienes acumulado un saldo positivo para tu
            próximo tratamiento.
          </p>
          <p>¡Gracias por confiar en nosotros!</p>
        </div>
      </div>
    </section>
  );
}
