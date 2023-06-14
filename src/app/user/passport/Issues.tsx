import { SvgPlusSmall } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';
import { appointment, issue } from './types';

export default function Issues({ appointment }: { appointment: appointment }) {
  console.log(appointment);

  const { treatments } = appointment;

  const normalIssues = treatments
    .map((item: any) => item.treatment.product.postTreatmentInfo.possibleComplications)
    .flat()
    .filter((complication: any) => complication.risk === 0);

  const unalarmingIssues = treatments
    .map((item: any) => item.treatment.product.postTreatmentInfo.possibleComplications)
    .flat()
    .filter((complication: any) => complication.risk === 1);

  const issuesTitle =
    treatments.length > 1
      ? 'Posibles complicaciones de tus tratamientos'
      : `Posibles complicaciones tras un tratamiento de ${treatments[0].treatment.product.title}`;

  if (normalIssues.length === 0 && unalarmingIssues === 0) {
    return <></>;
  }

  return (
    <section className='py-8 px-16 bg-hg-100 text-sm text-[#717D96]'>
      <h3 className='text-2xl text-hg-500 font-semibold text-center mb-8'>{issuesTitle}</h3>
      <div className='flex gap-16'>
        {normalIssues.length > 0 && (
          <div>
            <p className='text-hg-500 mb-4'>Es normal si...</p>
            <ul className='mb-8'>
              {normalIssues.map((issue: issue) => {
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
        )}
        {unalarmingIssues.length > 0 && (
          <div>
            <p className='text-hg-500 mb-4'>Llámanos si...</p>
            <ul className='mb-8'>
              {unalarmingIssues.map((issues: any) => {
                return issues.map((issue: issue) => {
                  return (
                    <li className='flex gap-2 mb-4'>
                      <div>
                        <SvgPlusSmall height={16} width={16} fill={HOLAGLOW_COLORS['hg-500']} />
                      </div>
                      <p>{issue.details}</p>
                    </li>
                  );
                });
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
