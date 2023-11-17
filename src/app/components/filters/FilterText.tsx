'use client';

import { useGlobalStore } from 'app/stores/globalStore';
import { toggleFilter } from 'app/tratamientos/utils/filters';

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
        className="border border-hg-tertiary rounded px-2 py-1 mt-2 text-black w-full mb-6"
        onChange={handleInputChange}
      />
    </>
  );
}
