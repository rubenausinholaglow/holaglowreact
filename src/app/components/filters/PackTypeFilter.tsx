'use client';

import { useGlobalStore } from 'app/stores/globalStore';
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
  const { productFilters, setProductFilters } = useGlobalStore(state => state);

  return (
    <Button
      className={className}
      type="tertiary"
      onClick={() => setProductFilters(toggleIsPack(productFilters))}
      customStyles={twMerge(
        `border-none group-hover:bg-hg-secondary100 ${
          customStyles ? customStyles : ''
        } ${productFilters.isPack ? 'bg-hg-primary500' : ''}`
      )}
    >
      {productFilters.isPack ? (
        <SvgCheckSquareActive className="mr-2" />
      ) : (
        <SvgCheckSquare className="mr-2" />
      )}
      Sólo Packs Glow
    </Button>
  );
}
