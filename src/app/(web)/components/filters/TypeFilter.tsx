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
      className={`grid grid-cols-3 gap-5 w-full ${className ? className : ''}`}
    >
      {PRODUCTTYPE.map(type => (
        <li
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
          {productFilters.type.includes(type.id) ? (
            <SvgCheckSquareActive className="ml-auto" />
          ) : (
            <SvgCheckSquare className="ml-auto" />
          )}

          {type.name}
        </li>
      ))}
    </ul>
  );
}
