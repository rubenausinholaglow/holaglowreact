'use client';

import { useGlobalStore } from 'app/stores/globalStore';
import { toggleFilter } from 'app/tratamientos/utils/filters';
import { Text } from 'designSystem/Texts/Texts';
import { SvgCheckSquare, SvgCheckSquareActive } from 'icons/IconsDs';
import Image from 'next/image';

export default function ZoneFilter({
  className,
  isDesktop,
  isDashboard = false,
}: {
  className?: string;
  isDesktop?: boolean;
  isDashboard?: boolean;
}) {
  const { productFilters, setProductFilters } = useGlobalStore(state => state);

  const ZONES = [
    {
      name: 'Tercio inferior',
      id: 4,
      icon: '/images/filters/tercioInferior.svg',
    },
    {
      name: 'Tercio medio',
      id: 3,
      icon: '/images/filters/tercioMedio.svg',
    },
    {
      name: 'Tercio superior',
      id: 2,
      icon: '/images/filters/tercioSuperior.svg',
    },
    {
      name: 'Cuerpo',
      id: 1,
      icon: '/images/filters/cuerpo.svg',
    },
    {
      name: 'Pelo',
      id: 6,
      icon: '/images/filters/pelo.svg',
    },
    {
      name: 'Piel',
      id: 5,
      icon: '/images/filters/piel.svg',
    },
  ];

  return (
    <ul
      className={`grid grid-cols-3 gap-5 w-full ${className ? className : ''}`}
    >
      {ZONES.map(zone => (
        <li
          id={'tmevent_filters'}
          key={zone.name}
          className={`transition-all p-2 aspect-square flex flex-col grow rounded-lg justify-between items-center cursor-pointer gap-2 ${
            isDesktop ? 'w-[120px]' : ''
          } ${
            productFilters.zone.includes(zone.id)
              ? 'bg-hg-primary500'
              : 'bg-hg-black100'
          }`}
          onClick={() =>
            setProductFilters(
              toggleFilter({
                filter: 'zone',
                value: zone.id,
                filters: productFilters,
              })
            )
          }
        >
          {productFilters.zone.includes(zone.id) ? (
            <SvgCheckSquareActive className="ml-auto" />
          ) : (
            <SvgCheckSquare className="ml-auto" />
          )}
          <Image height={40} width={40} src={zone.icon} alt={zone.name} />
          <Text size={isDashboard ? 'lg' : 'xs'} className="text-center">
            {zone.name}
          </Text>
        </li>
      ))}
    </ul>
  );
}
