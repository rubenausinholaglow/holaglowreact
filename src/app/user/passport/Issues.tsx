import { SvgPlusSmall } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

export default function Issues({ appointment }: { appointment: Object }) {
  const { treatments } = appointment;

  const normalIssues = treatments.map((treatment: Object) =>
    treatment.postTreatmentInfo.possibleComplications.filter(complication => complication.risk === 0),
  )[0];

  const unalarmingIssues = treatments.map((treatment: Object) =>
    treatment.postTreatmentInfo.possibleComplications.filter(complication => complication.risk === 1),
  )[0];

  const issuesTitle =
    treatments.length > 1
      ? 'Posibles complicaciones de tus tratamientos'
      : `Posibles complicaciones tras un tratamiento de ${treatments[0].text}`;

  return (
    <section className='py-8 px-16 bg-hg-100 text-sm text-[#717D96]'>
      <h3 className='text-2xl text-hg-500 font-semibold text-center mb-8'>{issuesTitle}</h3>
      <div className='flex gap-16'>
        <div>
          <p className='text-hg-500 mb-4'>Es normal si...</p>
          <p className='mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
          <ul className='mb-8'>
            {normalIssues.map((issue: Object) => {
              return (
                <li className='flex gap-2 mb-4'>
                  <div>
                    <SvgPlusSmall height={16} width={16} fill={HOLAGLOW_COLORS['hg-500']} />
                  </div>
                  <p>{issue.details}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p className='text-hg-500 mb-4'>No te alarmes si...</p>
          <ul className='mb-8'>
            {unalarmingIssues.map((issue: Object) => {
              return (
                <li className='flex gap-2 mb-4'>
                  <div>
                    <SvgPlusSmall height={16} width={16} fill={HOLAGLOW_COLORS['hg-500']} />
                  </div>
                  <p>{issue.details}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
