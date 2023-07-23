import {
  SvgCosmetic1,
  SvgCosmetic2,
  SvgEnvelopeOpen,
  SvgPhone,
} from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

import { Appointment } from '../types';

export default function Recomendations({
  appointment,
}: {
  appointment: Appointment;
}) {
  const filteredTreatments = appointment.treatments.filter(item => {
    const { treatment } = item;

    if (
      treatment.product &&
      treatment.product.postTreatmentInfo &&
      Array.isArray(treatment.product.postTreatmentInfo.first24hTips) &&
      treatment.product.postTreatmentInfo.first24hTips.length > 0 &&
      Array.isArray(treatment.product.postTreatmentInfo.after24hTips) &&
      treatment.product.postTreatmentInfo.after24hTips.length > 0
    ) {
      return true;
    }
    return false;
  });

  const first24Tips = filteredTreatments
    .map(item => {
      const { treatment } = item;
      return treatment.product.postTreatmentInfo.first24hTips.sort(
        (a, b) => a.priority - b.priority
      );
    })
    .flat();

  const after24hTips = filteredTreatments
    .map(item => {
      const { treatment } = item;
      return treatment.product.postTreatmentInfo.after24hTips.sort(
        (a, b) => a.priority - b.priority
      );
    })
    .flat();

  const filterKey = 'details';
  const filteredFirst24Tips = [
    ...new Map(first24Tips.map(item => [item[filterKey], item])).values(),
  ];
  const filteredAfter24Tips = [
    ...new Map(after24hTips.map(item => [item[filterKey], item])).values(),
  ];

  return (
    <section>
      <div className="inline-flex justify-center items-center bg-hg-darkMalva rounded-r-3xl text-white py-3 px-16">
        <h3 className="text-2xl font-semibold text-white mr-8">
          ¿Tienes dudas?
        </h3>
        <div className="flex">
          <div className="flex justify-center items-center border border-white rounded-full p4 h-[56px] w-[56px]">
            <SvgPhone height={24} width={24} fill="white" />
          </div>
        </div>
        <p className="bg-hg-darkMalva p-1 -ml-3 mr-8">682 417 208</p>
        <div className="flex">
          <div className="flex justify-center items-center border border-white rounded-full p4 h-[56px] w-[56px]">
            <SvgEnvelopeOpen height={24} width={24} fill="white" />
          </div>
        </div>
        <p className="bg-hg-darkMalva p-1 -ml-3">my@holaglow.com</p>
      </div>

      <div className="bg-hg-lightMalva/20 p-16 pb-6 -mt-10">
        <h3 className="text-2xl font-semibold mt-6 mb-10 text-center">
          Consejos y recomendaciones post tratamiento
        </h3>
        <div className="flex">
          <div className="w-1/2 flex flex-col items-center mr-2">
            <SvgCosmetic1
              className="mb-4"
              height={64}
              width={64}
              fill={HOLAGLOW_COLORS['darkMalva']}
            />
            <h3 className="text-lg font-semibold mb-4">
              Durante las primeras 24 horas
            </h3>
            <ul className="bg-white text-sm rounded-xl p-8 text-center shadow-[0px_8px_16px_0px_rgba(0,0,0,.1)]">
              <li className="text-hg-darkMalva mb-8">
                Es recomendable seguir estos consejos
              </li>
              {filteredFirst24Tips.map((tip, index) => {
                return (
                  <>
                    <li>{tip.details}</li>
                    {index + 1 < filteredFirst24Tips.length && (
                      <hr className="w-1/2 mx-auto h-[1px] bg-hg-200/30 m-3" />
                    )}
                  </>
                );
              })}
            </ul>
          </div>
          <div className="w-1/2 flex flex-col items-center ml-2">
            <SvgCosmetic2
              className="mb-4"
              height={64}
              width={64}
              fill={HOLAGLOW_COLORS['darkMalva']}
            />
            <h3 className="text-lg font-semibold mb-4">
              Después de las primeras 24 horas
            </h3>
            <ul className="text-sm rounded-xl p-8 text-center">
              <li className="text-hg-darkMalva mb-8">
                Es recomendable seguir estos consejos
              </li>
              {filteredAfter24Tips.map((tip, index) => {
                return (
                  <>
                    <li>{tip.details}</li>
                    {index + 1 < filteredAfter24Tips.length && (
                      <hr className="w-1/2 mx-auto h-[1px] bg-hg-lightMalva m-3" />
                    )}
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
