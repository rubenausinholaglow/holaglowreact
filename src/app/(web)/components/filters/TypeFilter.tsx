'use client';

import { toggleFilter } from 'app/(web)/tratamientos/utils/filters';
import { SvgCheckSquare, SvgCheckSquareActive } from 'app/icons/IconsDs';
import { useGlobalStore } from 'app/stores/globalStore';

export default function TypeFilter({
  className,
}: {
  className?: string;
  customStyles?: string;
}) {
  const { productFilters, setProductFilters } = useGlobalStore(state => state);

  const PRODUCTTYPE = [
    {
      name: 'Tratamientos',
      id: 2,
      icon: '/images/filters/tercioInferior.svg',
    },
    {
      name: 'Productos',
      id: 3,
      icon: '/images/filters/tercioInferior.svg',
    },
  ];

  return (
    <ul
      className={`flex gap-2 items-center w-full ${className ? className : ''}`}
    >
      {PRODUCTTYPE.map(type => (
        <li
          className={`flex items-center gap-2 py-2 px-4 rounded-full text-xs font-medium cursor-pointer ${
            productFilters.type.includes(type.id)
              ? 'bg-hg-primary500'
              : 'bg-hg-black100'
          }`}
          id={'tmevent_filters'}
          key={type.name}
          onClick={() =>
            setProductFilters(
              toggleFilter({
                filter: 'type',
                value: type.id,
                filters: productFilters,
              })
            )
          }
        >
          {type.name}
        </li>
      ))}
    </ul>
  );
}
