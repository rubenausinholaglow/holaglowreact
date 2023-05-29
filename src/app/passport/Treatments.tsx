import Image from 'next/image';

export default function Treatments() {
  return (
    <section className='p-12'>
      <div className='bg-hg-400/5 rounded-xl p-8'>
        <h3 className='text-2xl font-semibold text-center mb-16'>Su plan de tratamiento completo por sesión</h3>
        <div className='flex'>
          <div className='flex flex-col mr-4 w-1/3'>
            <p className='text-hg-200 text-xs'>2023</p>
            <p className=''>01 May</p>
            <Image src='/images/passport/face.svg' height='196' width='230' alt='Holaglow' />
          </div>
          <ul className='border-l border-hg-400/10 w-2/3'>
            <li className='border-b border-hg-400/10 p-4'>
              <p className='text-hg-200 text-xs'>Plan de tratamiento</p>
              <p>Proyección de pómulos + skin booster</p>
            </li>
            <li className='border-b border-hg-400/10 p-4'>
              <p className='text-hg-200 text-xs'>Producto utilizado</p>
              <p>Lip Supreme Balm, Martiderm</p>
            </li>
            <li className='border-b border-hg-400/10 p-4'>
              <ul className='flex gap-4'>
                <li className='w-1/3'></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
