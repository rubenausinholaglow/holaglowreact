'use client';

import { useEffect } from 'react';
import {
  applyFilters,
  filterCount,
  toggleFilter,
} from 'app/products/utils/filters';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { SvgCheckSquare, SvgCheckSquareActive } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import { fetchClinics } from 'utils/fetch';

export default function ClinicFilter({ className }: { className?: string }) {
  const { clinics, setClinics } = useGlobalPersistedStore(state => state);

  const { stateProducts } = useGlobalPersistedStore(state => state);

  const {
    productFilters,
    setProductFilters,
    filteredProducts,
    setFilteredProducts,
  } = useGlobalStore(state => state);

  useEffect(() => {
    async function initClinics() {
      const clinics = await fetchClinics();

      setClinics(clinics);
    }

    if (isEmpty(clinics)) {
      initClinics();
    }
  }, [clinics]);

  useEffect(() => {
    setFilteredProducts(
      applyFilters({ products: filteredProducts, filters: productFilters })
    );

    if (filterCount(productFilters) === 0) {
      setFilteredProducts(stateProducts);
    }
  }, [productFilters]);

  return (
    <ul className={`flex flex-col w-full${className ? className : ''}`}>
      {clinics.map(clinic => (
        <li
          key={clinic.city}
          className={`transition-all flex p-2 mb-2 items-center rounded-xl cursor-pointer ${
            productFilters.clinic.includes(clinic.internalName)
              ? 'bg-hg-primary500'
              : ''
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
          {productFilters.clinic.includes(clinic.internalName) ? (
            <SvgCheckSquareActive className="mr-2" />
          ) : (
            <SvgCheckSquare className="mr-2" />
          )}
          {clinic.city}
        </li>
      ))}
    </ul>
  );
}
