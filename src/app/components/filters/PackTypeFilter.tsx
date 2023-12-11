'use client';

import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { toggleIsPack } from 'app/tratamientos/utils/filters';
import { Button } from 'designSystem/Buttons/Buttons';
import { SvgCheckSquare, SvgCheckSquareActive } from 'icons/IconsDs';
import { twMerge } from 'tailwind-merge';

export default function PackTypeFilter({
  className,
  customStyles,
}: {
  className?: string;
  customStyles?: string;
}) {
  const { promo } = useGlobalPersistedStore(state => state);
  const { productFilters, setProductFilters } = useGlobalStore(state => state);

  return (
    <Button
      id={'tmevent_filters'}
      isAnimated
      origin="right"
      className={className}
      type="tertiary"
      onClick={() => setProductFilters(toggleIsPack(productFilters))}
      customStyles={twMerge(`
        border-none group-hover:bg-hg-secondary100 ${
          customStyles ? customStyles : ''
        } 
        ${
          promo && promo?.title === 'Black Friday'
            ? `bg-hg-black group-hover:bg- hg-black`
            : ''
        }
        ${productFilters.isPack ? 'bg-hg-primary500' : ''}
      `)}
    >
      {productFilters.isPack ? (
        <SvgCheckSquareActive
          className={`mr-2 ${
            promo && promo?.title === 'Black Friday' ? 'text-hg-black' : ''
          }`}
        />
      ) : (
        <SvgCheckSquare
          className={`mr-2 ${
            promo && promo?.title === 'Black Friday' ? 'text-hg-primary' : ''
          }`}
        />
      )}

      {promo && promo?.title === 'Black Friday' ? (
        <span
          className={
            productFilters.isPack ? 'text-hg-black' : 'text-hg-primary'
          }
        >
          Sólo Packs <span className="text-hg-secondary">Black</span> Friday
        </span>
      ) : (
        'Sólo Packs Glow'
      )}
    </Button>
  );
}
