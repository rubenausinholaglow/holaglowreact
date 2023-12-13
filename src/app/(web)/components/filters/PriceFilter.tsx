'use client';

import { toggleFilter } from 'app/(web)/tratamientos/utils/filters';
import { useGlobalStore } from 'app/stores/globalStore';
import { Text } from 'designSystem/Texts/Texts';
import { SvgCheckSquare, SvgCheckSquareActive } from 'icons/IconsDs';

export default function PriceFilter({
  className,
  isDesktop,
}: {
  className?: string;
  isDesktop?: boolean;
}) {
  const { productFilters, setProductFilters } = useGlobalStore(state => state);

  const PRICES = [
    {
      name: '0 € - 249 €',
      id: 1,
    },
    {
      name: '250 € - 499 €',
      id: 2,
    },
    {
      name: 'Más de 500 €',
      id: 3,
    },
  ];

  return (
    <ul
      className={`flex gap-5 w-full flex-col bg-hg-black100 rounded-xl p-4 ${
        className ? className : ''
      }`}
    >
      {PRICES.map(price => (
        <li
          key={price.name}
          onClick={() => {
            setProductFilters(
              toggleFilter({
                filter: 'price',
                value: price.id,
                filters: productFilters,
              })
            );
          }}
          className="w-full flex justify-start gap-2"
        >
          {productFilters.price.includes(price.id) ? (
            <SvgCheckSquareActive />
          ) : (
            <SvgCheckSquare />
          )}
          <Text size="xs">{price.name}</Text>
        </li>
      ))}
    </ul>
  );
}
