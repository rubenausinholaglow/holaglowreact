'use client';

import { toggleFilter } from 'app/(web)/tratamientos/utils/filters';
import { useGlobalStore } from 'app/stores/globalStore';
import { twMerge } from 'tailwind-merge';

export default function FilterText({ className }: { className?: string }) {
  const { productFilters, setProductFilters } = useGlobalStore(state => state);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductFilters(
      toggleFilter({
        filter: 'text',
        value: e.target.value,
        filters: productFilters,
      })
    );
  };

  return (
    <>
      <input
        type="text"
        placeholder="Filtrar por título o descripción"
        className={twMerge(
          `border border-hg-tertiary rounded px-2 py-1 mt-2 text-black w-full mb-6 ${
            className ? className : ''
          }`
        )}
        onChange={handleInputChange}
      />
    </>
  );
}
