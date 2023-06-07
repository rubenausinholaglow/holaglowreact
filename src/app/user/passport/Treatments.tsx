import Image from 'next/image';
import { SvgMedicine, SvgReceipt, SvgCalendar, SvgMapMarker } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

export default function Treatments({
  appointment,
  previousAppointments,
}: {
  appointment: Object;
  previousAppointments: Object;
}) {
  const { treatments } = appointment;

  return (
    <section className='p-12'>
      <h3 className='bg-[#fdf6fc] rounded-t-[25px] py-6 text-2xl font-semibold text-center -mb-4'>
        Detalles de tu tratamiento
      </h3>

      {treatments.map((treatment: Object) => {
        return (
          <div className='bg-[#fdf6fc] rounded-[25px] p-8 mb-12'>
            <div className='flex'>
              <div className='flex flex-col mr-4 w-2/5'>
                <p className='text-hg-200 text-xs'>2023</p>
                <p className='mb-4'>01 May</p>
                <Image src='/images/passport/treatmentZones/1.svg' height='196' width='230' alt='Holaglow' />
              </div>
              <ul className='border-l border-hg-400/10 w-3/5 text-sm'>
                <li className='border-b border-hg-400/10 p-4'>
                  <p className='text-hg-200 text-xs mb-1'>Plan de tratamiento</p>
                  <p>{treatment.text}</p>
                </li>
                <li className='border-b border-hg-400/10 p-4'>
                  <p className='text-hg-200 text-xs mb-1'>Producto utilizado</p>
                  <p>{treatment.product}</p>
                </li>
                <li className='border-b border-hg-400/10 p-4'>
                  <ul className='flex gap-4'>
                    <li className='w-1/3'>
                      <SvgMedicine className='mb-2' height={18} width={22} fill={HOLAGLOW_COLORS['hg-200']} />
                      <p className='text-hg-200 text-xs mb-1'>Cantidad</p>
                      <p>{treatment.quantity} Vial</p>
                    </li>
                    {/* <li className='w-1/3'>
                    <SvgReceipt className='mb-2' height={18} width={22} fill={HOLAGLOW_COLORS['hg-200']} />
                    <p className='text-hg-200 text-xs mb-1'>Número de lote</p>
                    <p>00000RRR</p>
                  </li>
                  <li className='w-1/3'>
                    <SvgCalendar className='mb-2' height={18} width={22} fill={HOLAGLOW_COLORS['hg-200']} />
                    <p className='text-hg-200 text-xs mb-1'>Duración</p>
                    <p>De 6 a 12 meses</p>
                  </li> */}
                  </ul>
                </li>
                <li className='p-4'>
                  <ul className='flex flex-col gap-4'>
                    <li className='flex content-center'>
                      <SvgCalendar className='mr-2' height={18} width={22} fill='#717D96' />
                      <p className='text-[#717D96]'>{appointment.professional.name}</p>
                    </li>
                    <li className='flex content-center'>
                      <SvgMapMarker className='mr-2' height={18} width={22} fill='#717D96' />
                      <p className='text-[#717D96]'>{appointment.clinic.address}</p>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        );
      })}

      {treatments.map((treatment: Object) => {
        return (
          <div className='bg-hg-100/50 rounded-[25px] p-8 mb-12'>
            <div className='flex'>
              <div className='flex flex-col mr-4 w-2/5'>
                <p className='text-hg-200 text-xs'>2023</p>
                <p className='mb-4'>01 May</p>
                <Image src='/images/passport/treatmentZones/3.svg' height='196' width='230' alt='Holaglow' />
              </div>
              <ul className='border-l border-hg-400/10 w-3/5 text-sm'>
                <li className='border-b border-hg-400/10 p-4'>
                  <p className='text-hg-200 text-xs mb-1'>Plan de tratamiento</p>
                  <p>{treatment.text}</p>
                </li>
                <li className='border-b border-hg-400/10 p-4'>
                  <p className='text-hg-200 text-xs mb-1'>Producto utilizado</p>
                  <p>{treatment.product}</p>
                </li>
                <li className='border-b border-hg-400/10 p-4'>
                  <ul className='flex gap-4'>
                    <li className='w-1/3'>
                      <SvgMedicine className='mb-2' height={18} width={22} fill={HOLAGLOW_COLORS['hg-200']} />
                      <p className='text-hg-200 text-xs mb-1'>Cantidad</p>
                      <p>{treatment.quantity} Vial</p>
                    </li>
                    {/* <li className='w-1/3'>
                    <SvgReceipt className='mb-2' height={18} width={22} fill={HOLAGLOW_COLORS['hg-200']} />
                    <p className='text-hg-200 text-xs mb-1'>Número de lote</p>
                    <p>00000RRR</p>
                  </li>
                  <li className='w-1/3'>
                    <SvgCalendar className='mb-2' height={18} width={22} fill={HOLAGLOW_COLORS['hg-200']} />
                    <p className='text-hg-200 text-xs mb-1'>Duración</p>
                    <p>De 6 a 12 meses</p>
                  </li> */}
                  </ul>
                </li>
                <li className='p-4'>
                  <ul className='flex flex-col gap-4'>
                    <li className='flex content-center'>
                      <SvgCalendar className='mr-2' height={18} width={22} fill='#717D96' />
                      <p className='text-[#717D96]'>{appointment.professional.name}</p>
                    </li>
                    <li className='flex content-center'>
                      <SvgMapMarker className='mr-2' height={18} width={22} fill='#717D96' />
                      <p className='text-[#717D96]'>{appointment.clinic.address}</p>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        );
      })}

      <h3 className='mb-4 font-semibold'>Histórico de tratamientos</h3>

      <table className='text-[#717D96] text-[11px] mb-12 w-full'>
        <tr className='text-hg-500 mb-4'>
          <th className='py-3 pr-6 text-left font-normal'>Fecha / Sesión</th>
          <th className='py-3 pr-6 text-left font-normal'>Plan de tratamiento</th>
          <th className='py-3 pr-6 text-left font-normal'>Profesional sanitario</th>
          <th className='py-3 pr-6 text-left font-normal'>Clínica</th>
        </tr>
        {previousAppointments.map((oldAppointment: Object) => {
          const date = new Date(oldAppointment.date).getDate().toString().padStart(2, '0');
          const month = (new Date(oldAppointment.date).getMonth() + 1).toString().padStart(2, '0');
          const year = new Date(oldAppointment.date).getFullYear();
          const parsedDate = `${date}/${month}/${year}`;

          return (
            <tr className='mb-4 border-b border-hg-400/10'>
              <td className='py-3 pr-6'>{parsedDate}</td>
              <td className='py-3 pr-6'>{appointment.treatments[0].text}</td>
              <td className='py-3 pr-6'>{appointment.professional.name}</td>
              <td className='py-3 pr-6'>{appointment.clinic.address}</td>
            </tr>
          );
        })}
      </table>

      <h3 className='mb-4 font-semibold'>
        Notas para tus tratamientos en Holaglow
        <p className='text-sm font-normal'>Todo lo que necesitas saber en tu pasaporte de belleza</p>
      </h3>
      <p className='text-[#717D96] mb-2 text-[11px]'>
        Los productos de Holaglow Clinics tienen diferentes efectos y duraciones. En su pasaporte de belleza, puede
        realizar un seguimiento fácil de qué y cuándo, así como quién realizó el tratamiento.
      </p>
      <p className='text-[#717D96] text-[11px]'>
        En su pasaporte de belleza, también puede anotar otros tratamientos de belleza en la cara. Será de gran ayuda si
        cambia de médico o enfermera tratante, o pronto volverá a ser el momento, ya que aquí se recopilará toda la
        información.
      </p>
    </section>
  );
}
