import Image from 'next/image';
import { SvgMedicine, SvgReceipt, SvgCalendar, SvgMapMarker } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

export default function Treatments() {
  return (
    <section className='p-12'>
      <div className='bg-hg-100/50 rounded-[25px] p-8 mb-12'>
        <h3 className='text-2xl font-semibold text-center mb-16'>Su plan de tratamiento completo por sesión</h3>
        <div className='flex'>
          <div className='flex flex-col mr-4 w-1/3'>
            <p className='text-hg-200 text-xs'>2023</p>
            <p className=''>01 May</p>
            <Image src='/images/passport/face.svg' height='196' width='230' alt='Holaglow' />
          </div>
          <ul className='border-l border-hg-400/10 w-2/3 text-sm'>
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
                <li className='w-1/3'>
                  <SvgMedicine className='mb-2' height={18} width={22} fill={HOLAGLOW_COLORS['hg-200']} />
                  <p className='text-hg-200'>Cantidad</p>
                  <p>1 Vial</p>
                </li>
                <li className='w-1/3'>
                  <SvgReceipt className='mb-2' height={18} width={22} fill={HOLAGLOW_COLORS['hg-200']} />
                  <p className='text-hg-200'>Número de lote</p>
                  <p>00000RRR</p>
                </li>
                <li className='w-1/3'>
                  <SvgCalendar className='mb-2' height={18} width={22} fill={HOLAGLOW_COLORS['hg-200']} />
                  <p className='text-hg-200'>Duración</p>
                  <p>De 6 a 12 meses</p>
                </li>
              </ul>
            </li>
            <li className='p-4'>
              <ul class='flex flex-col gap-4'>
                <li className='flex content-center'>
                  <SvgCalendar className='mr-2' height={18} width={22} fill='#717D96' />
                  <p className='text-[#717D96]'>Josep Basart</p>
                </li>
                <li className='flex content-center'>
                  <SvgMapMarker className='mr-2' height={18} width={22} fill='#717D96' />
                  <p className='text-[#717D96]'>Holaglow André Mellado (Madrid)</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <h3 className='mb-4 font-semibold'>Histórico de tratamientos</h3>

      <table className='text-[#717D96] text-xs mb-12'>
        <tr className='text-hg-500 mb-4'>
          <th className='py-3 pr-6 text-left'>Fecha / Sesión</th>
          <th className='py-3 pr-6 text-left'>Plan de tratamiento</th>
          <th className='py-3 pr-6 text-left'>Profesional sanitario</th>
          <th className='py-3 pr-6 text-left'>Clínica</th>
        </tr>
        <tr className='mb-4 border-b border-hg-400/10'>
          <td className='py-3 pr-6'>01/01/2023</td>
          <td className='py-3 pr-6'>Proyección de pómulos + skin booster</td>
          <td className='py-3 pr-6'>Josep Basart Basart</td>
          <td className='py-3 pr-6'>Holaglow Andrés Mellado - Madrid</td>
        </tr>
        <tr className='mb-4 border-b border-hg-400/10'>
          <td className='py-3 pr-6'>01/01/2023</td>
          <td className='py-3 pr-6'>Proyección de pómulos + skin booster</td>
          <td className='py-3 pr-6'>Josep Basart Basart</td>
          <td className='py-3 pr-6'>Holaglow Andrés Mellado - Madrid</td>
        </tr>
        <tr className='mb-4 border-b border-hg-400/10'>
          <td className='py-3 pr-6'>01/01/2023</td>
          <td className='py-3 pr-6'>Proyección de pómulos + skin booster</td>
          <td className='py-3 pr-6'>Josep Basart Basart</td>
          <td className='py-3 pr-6'>Holaglow Andrés Mellado - Madrid</td>
        </tr>
        <tr className='mb-4'>
          <td className='py-3 pr-6'>01/01/2023</td>
          <td className='py-3 pr-6'>Proyección de pómulos + skin booster</td>
          <td className='py-3 pr-6'>Josep Basart Basart</td>
          <td className='py-3 pr-6'>Holaglow Andrés Mellado - Madrid</td>
        </tr>
      </table>

      <h3 className='mb-4 font-semibold'>
        Notas para tus tratamientos en Holaglow
        <p className='text-sm font-normal'>Todo lo que necesitas saber en tu pasaporte de belleza</p>
      </h3>
      <p className='text-[#717D96] mb-2 text-xs'>
        Los productos de Holaglow Clinics tienen diferentes efectos y duraciones. En su pasaporte de belleza, puede
        realizar un seguimiento fácil de qué y cuándo, así como quién realizó el tratamiento.
      </p>
      <p className='text-[#717D96] text-xs'>
        En su pasaporte de belleza, también puede anotar otros tratamientos de belleza en la cara. Será de gran ayuda si
        cambia de médico o enfermera tratante, o pronto volverá a ser el momento, ya que aquí se recopilará toda la
        información.
      </p>
    </section>
  );
}
