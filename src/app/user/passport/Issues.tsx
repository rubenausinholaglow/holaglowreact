import { SvgPlusSmall } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

import { Appointment } from '../types';

export default function Issues({ appointment }: { appointment: Appointment }) {
  const { treatments } = appointment;

  const flattenedIssues = treatments
    .map(item => item.treatment.product.postTreatmentInfo.possibleComplications)
    .flat();
  const normalIssues = flattenedIssues.filter(
    complication => complication.risk === 0
  );
  const unalarmingIssues = flattenedIssues.filter(
    complication => complication.risk === 1
  );

  const filterKey = 'details';
  const filteredNormalIssues = [
    ...new Map(normalIssues.map(item => [item[filterKey], item])).values(),
  ];
  const filteredUnalarmingIssues = [
    ...new Map(unalarmingIssues.map(item => [item[filterKey], item])).values(),
  ];

  const issuesTitle =
    treatments.length > 1
      ? 'Posibles complicaciones de tus tratamientos'
      : `Posibles complicaciones tras un tratamiento de ${treatments[0].treatment.product.title}`;

  if (normalIssues.length === 0 && unalarmingIssues.length === 0) {
    return <></>;
  }

  return (
    <section className="py-8 px-16 bg-hg-lime/10 text-sm text-hg-black">
      <h3 className="text-2xl text-hg-darkMalva font-semibold text-center mb-8">
        {issuesTitle}
      </h3>
      <div className="flex gap-16">
        {filteredNormalIssues.length > 0 && (
          <div className="w-1/2">
            <p className="text-hg-darkMalva mb-4">Es normal si...</p>
            <ul className="mb-8">
              {filteredNormalIssues.map((issue, index) => {
                return (
                  <li key={index} className="flex gap-2 mb-4">
                    <div>
                      <SvgPlusSmall
                        height={16}
                        width={16}
                        fill={HOLAGLOW_COLORS['darkMalva']}
                      />
                    </div>
                    <p>{issue.details}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {filteredUnalarmingIssues.length > 0 && (
          <div className="w-1/2">
            <p className="text-hg-darkMalva mb-4">No te alarmes si...</p>
            <ul className="mb-8">
              {filteredUnalarmingIssues.map((issue, index) => {
                return (
                  <li key={index} className="flex gap-2 mb-4">
                    <div>
                      <SvgPlusSmall
                        height={16}
                        width={16}
                        fill={HOLAGLOW_COLORS['darkMalva']}
                      />
                    </div>
                    <p>{issue.details}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
