import { SvgCosmetic1, SvgCosmetic2, SvgEnvelopeOpen, SvgPhone } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';
import { Clinic, ClinicProfessional, Treatment } from '../types';

export default function Recomendations({
  appointment,
}: {
  appointment: {
    clinic: Clinic;
    clinicProfessional: ClinicProfessional;
    treatments: Array<Treatment>;
  };
}) {
  const { treatments, treatment }: any = appointment;

  return (
    <section>
      <div className='inline-flex justify-center items-center bg-hg-400 rounded-r-3xl text-white py-3 px-16'>
        <h3 className='text-2xl font-semibold text-white mr-8'>¿Tienes dudas?</h3>
        <div className='flex'>
          <div className='flex justify-center items-center border border-hg-200 rounded-full p4 h-[56px] w-[56px]'>
            <SvgPhone height={24} width={24} fill={HOLAGLOW_COLORS['hg-200']} />
          </div>
        </div>
        <p className='bg-hg-400 p-1 -ml-3 mr-8'>682 417 208</p>
        <div className='flex'>
          <div className='flex justify-center items-center border border-hg-200 rounded-full p4 h-[56px] w-[56px]'>
            <SvgEnvelopeOpen height={24} width={24} fill={HOLAGLOW_COLORS['hg-200']} />
          </div>
        </div>
        <p className='bg-hg-400 p-1 -ml-3'>my@holaglow.com</p>
      </div>
      {/* <div className='bg-[url("/images/passport/recomendationsBg.png")] bg-cover bg-left-bottom p-16 -mt-10 text-sm text-hg-400 pl-[40%] pr-[15%]'>
        <p>
        Tras la realización de un tratamiento es habitual la aparición de molestias en la zona durante unos días.
          Normalmente, esta molestia o incomodidad suele desaparecer por completo en unos días y su intensidad suele
          depender de la dificultad y la complejidad del procedimiento realizado.
        </p>
        <p>
          Para evitar complicaciones en el post tratamiento, es importante respetar las indicaciones del doctor así como
          la que vienen explicadas en este documento.
        </p>
      </div> */}

      <div className='bg-hg-100/50 p-16 pb-6 -mt-10'>
        <h3 className='text-2xl font-semibold mt-6 mb-10 text-center'>Consejos y recomendaciones post tratamiento</h3>
        <div className='flex'>
          <div className='w-1/2 flex flex-col items-center mr-2'>
            <SvgCosmetic1 className='mb-4' height={64} width={64} fill={HOLAGLOW_COLORS['hg-200']} />
            <h3 className='text-lg font-semibold mb-4'>Durante las primeras 24 horas</h3>
            <ul className='bg-white text-sm text-[#717D96] rounded-xl p-8 text-center shadow-[0px_8px_16px_0px_rgba(220,170,205,.5)]'>
              <li className='text-hg-500 mb-8'>Es recomendable seguir estos consejos</li>
              {appointment.treatments.map((item: Treatment) => {
                const { treatment } = item;
                return treatment.product.postTreatmentInfo.first24hTips
                  .sort((a: any, b: any) => a.priority - b.priority)
                  .map((info: any, index: number) => {
                    const totalTips = Object.keys(treatment.product.postTreatmentInfo.first24hTips).length;

                    return (
                      <>
                        <li>{info.details}</li>
                        {index + 1 < totalTips && <hr className='w-1/2 mx-auto h-[1px] bg-hg-200/30 m-3' />}
                      </>
                    );
                  });
              })}
            </ul>
          </div>
          <div className='w-1/2 flex flex-col items-center ml-2'>
            <SvgCosmetic2 className='mb-4' height={64} width={64} fill={HOLAGLOW_COLORS['hg-200']} />
            <h3 className='text-lg font-semibold mb-4'>Después de las primeras 24 horas</h3>
            <ul className='text-sm text-[#717D96] rounded-xl p-8 text-center'>
              <li className='text-hg-500 mb-8'>Es recomendable seguir estos consejos</li>
              {treatments.map((item: treatments) => {
                const { treatment } = item;
                return treatment.product.postTreatmentInfo.after24hTips
                  .sort((a: any, b: any) => a.priority - b.priority)
                  .map((info: any, index: number) => {
                    const totalTips = Object.keys(treatment.product.postTreatmentInfo.after24hTips).length;

                    return (
                      <>
                        <li>{info.details}</li>
                        {index + 1 < totalTips && <hr className='w-1/2 mx-auto h-[1px] bg-hg-200/30 m-3' />}
                      </>
                    );
                  });
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
