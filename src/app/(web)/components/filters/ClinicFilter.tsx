'use client';

import { useEffect } from 'react';
import { toggleFilter } from 'app/(web)/tratamientos/utils/filters';
import { SvgCheckSquare, SvgCheckSquareActive } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { fetchClinics } from 'app/utils/fetch';
import { isEmpty } from 'lodash';

export default function ClinicFilter({ className }: { className?: string }) {
  const { clinics, setClinics } = useGlobalPersistedStore(state => state);

  const { productFilters, setProductFilters } = useGlobalStore(state => state);

  useEffect(() => {
    async function initClinics() {
      const clinics = await fetchClinics();

      setClinics(clinics);
    }

    if (isEmpty(clinics)) {
      initClinics();
    }
  }, [clinics]);

  return (
    <ul className={`flex flex-col ${className ? className : ''}`}>
      {clinics.map(clinic => (
        <li
          id={'tmevent_filters'}
          key={clinic.city}
          className={`transition-all flex p-2 mb-2 items-center rounded-xl cursor-pointer ${
            productFilters.clinic.includes(clinic.internalName) ? '' : ''
          }`}
          onClick={() =>
            setProductFilters(
              toggleFilter({
                filter: 'clinic',
                value: clinic.internalName,
                filters: productFilters,
              })
            )
          }
        >
          <div className="pointer-events-none">
            {productFilters.clinic.includes(clinic.internalName) ? (
              <SvgCheckSquareActive className="mr-2" />
            ) : (
              <SvgCheckSquare className="mr-2" />
            )}
          </div>
          {clinic.city}
        </li>
      ))}
    </ul>
  );
}
