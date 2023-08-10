import {
  SvgCalendar,
  SvgMapMarker,
  SvgMedicine,
  SvgReceipt,
  SvgStethoscope,
} from 'icons/Icons';
import Image from 'next/image';
import { HOLAGLOW_COLORS } from 'utils/colors';

import { Appointment } from '../types';

export default function Treatments({
  appointment,
  previousAppointments,
}: {
  appointment: Appointment;
  previousAppointments: Array<Appointment>;
}) {
  const date = new Date(appointment.date).getDate().toString().padStart(2, '0');
  const month = new Date(appointment.date).toLocaleDateString('es-ES', {
    month: 'long',
  });
  const year = new Date(appointment.date).getFullYear();

  return (
    <section className="p-12 text-hg-black">
      <h3 className="bg-[#F1F4FE] rounded-t-[25px] py-6 text-xl font-semibold text-center -mb-4">
        Detalles de tu tratamiento
      </h3>

      {appointment.treatments.map((item, index) => {
        const { treatment } = item;

        if (treatment.product.flowwwId === '0') {
          return <></>;
        }

        return (
          <div key={index} className="bg-[#F1F4FE] rounded-[25px] p-8 mb-12">
            <div className="flex">
              <div className="flex flex-col mr-4 w-2/5">
                <p className="text-hg-lightMalva text-xs">{year}</p>
                <p className="mb-4">
                  {date} {month.charAt(0).toUpperCase() + month.slice(1)}
                </p>
                <Image
                  src={`/images/passport/treatmentZones/${treatment.product.zone}.svg`}
                  height="196"
                  width="230"
                  alt="Holaglow"
                />
              </div>
              <ul className="border-l border-hg-400/10 w-3/5 text-sm">
                <li className="border-b border-hg-400/10 p-4">
                  <p className="text-hg-lightMalva text-xs mb-1">
                    Plan de tratamiento
                  </p>
                  <p>{treatment.product.title}</p>
                </li>
                <li className="border-b border-hg-400/10 p-4">
                  <p className="text-hg-lightMalva text-xs mb-1">
                    Producto utilizado
                  </p>
                  <p>{treatment.product.description}</p>
                </li>
                {treatment.quantity > 0 && (
                  <li className="border-b border-hg-400/10 p-4">
                    <ul className="flex gap-4">
                      <li className="w-1/3">
                        <SvgMedicine
                          className="mb-2"
                          height={18}
                          width={22}
                          fill={HOLAGLOW_COLORS['lightMalva']}
                        />
                        <p className="text-hg-lightMalva text-xs mb-1">
                          Cantidad
                        </p>
                        <p>{treatment.quantity} Vial</p>
                      </li>
                      {treatment.lotReference !== '' && (
                        <li className="w-1/3">
                          <SvgReceipt
                            className="mb-2"
                            height={18}
                            width={22}
                            fill={HOLAGLOW_COLORS['lightMalva']}
                          />
                          <p className="text-hg-lightMalva text-xs mb-1">
                            Número de lote
                          </p>
                          <p>{treatment.lotReference}</p>
                        </li>
                      )}
                      {treatment.product.durationMin > 0 && (
                        <li className="w-1/3">
                          <SvgCalendar
                            className="mb-2"
                            height={18}
                            width={22}
                            fill={HOLAGLOW_COLORS['lightMalva']}
                          />
                          <p className="text-hg-lightMalva text-xs mb-1">
                            Duración
                          </p>
                          <p>{`de ${treatment.product.durationMin / 30} a ${
                            treatment.product.durationMax / 30
                          } meses`}</p>
                        </li>
                      )}
                    </ul>
                  </li>
                )}
                <li className="p-4">
                  <ul className="flex flex-col gap-4">
                    <li className="flex content-center">
                      <SvgStethoscope
                        className="mr-2"
                        height={18}
                        width={18}
                        fill={HOLAGLOW_COLORS['black']}
                      />
                      <p className="text-hg-black">
                        {appointment.clinicProfessional.name}
                      </p>
                    </li>
                    <li className="flex content-center">
                      <SvgMapMarker
                        className="mr-2"
                        height={18}
                        width={22}
                        fill={HOLAGLOW_COLORS['black']}
                      />
                      <p className="text-hg-black">
                        {appointment.clinic.address}
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        );
      })}

      {previousAppointments.length > 0 && (
        <>
          <h3 className="mb-4 font-semibold">Histórico de tratamientos</h3>

          <table className="text-hg-black text-[11px] mb-12 w-full">
            <thead>
              <tr className="text-hg-lightMalva mb-4">
                <th className="py-3 pr-6 text-left font-normal">
                  Fecha / Sesión
                </th>
                <th className="py-3 pr-6 text-left font-normal">
                  Plan de tratamiento
                </th>
                <th className="py-3 pr-6 text-left font-normal">
                  Profesional sanitario
                </th>
                <th className="py-3 pr-6 text-left font-normal">Clínica</th>
              </tr>
            </thead>
            <tbody>
              {previousAppointments.map((prevAppointment, index) => {
                const date = new Date(prevAppointment.date)
                  .getDate()
                  .toString()
                  .padStart(2, '0');
                const month = (new Date(prevAppointment.date).getMonth() + 1)
                  .toString()
                  .padStart(2, '0');
                const year = new Date(prevAppointment.date).getFullYear();
                const parsedDate = `${date}/${month}/${year}`;

                const appointmentTitle =
                  prevAppointment.treatments.length > 0
                    ? prevAppointment.treatments[0].treatment.product.title
                    : prevAppointment.appointmentProducts[0].product.title;

                return (
                  <tr key={index} className="mb-4 border-b border-hg-400/10">
                    <td className="py-3 pr-6">{parsedDate}</td>
                    <td className="py-3 pr-6">{appointmentTitle}</td>
                    <td className="py-3 pr-6">
                      {appointment.clinicProfessional.name}
                    </td>
                    <td className="py-3 pr-6">{appointment.clinic.address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}
