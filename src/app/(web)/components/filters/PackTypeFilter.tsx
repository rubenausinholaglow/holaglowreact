'use client';

import { toggleIsPack } from 'app/(web)/tratamientos/utils/filters';
import { SvgCheckSquare, SvgCheckSquareActive } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
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
      isAnimated
      origin="right"
      className={className}
      type="white"
      onClick={() => setProductFilters(toggleIsPack(productFilters))}
      customStyles={twMerge(`
        border-none pointer-events-none ${customStyles ? customStyles : ''} 
        ${
          promo && promo?.title === 'Black Friday'
            ? `bg-hg-black group-hover:bg- hg-black`
            : ''
        }
        ${productFilters.isPack ? 'bg-hg-primary500' : ''}
      `)}
      id="tmevent_treatments_type"
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
