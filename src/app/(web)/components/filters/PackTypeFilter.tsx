'use client';

import { toggleIsPack } from 'app/(web)/tratamientos/utils/filters';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export default function PackTypeFilter({
  className,
  isDashboard = false,
  customStyles,
}: {
  className?: string;
  isDashboard?: boolean;
  customStyles?: string;
}) {
  const { promo } = useGlobalPersistedStore(state => state);
  const { productFilters, setProductFilters } = useGlobalStore(state => state);

  return (
    <Button
      className={className}
      type="white"
      onClick={() => setProductFilters(toggleIsPack(productFilters))}
      customStyles={twMerge(`
        p-1 pr-4 border-none pointer-events-none ${
          customStyles ? customStyles : ''
        } 
        ${
          promo && promo?.title === 'Black Friday'
            ? `bg-hg-black group-hover:bg- hg-black`
            : ''
        }
        ${isDashboard ? 'pl-4 bg-hg-black100' : ''}
        ${productFilters.isPack ? 'bg-hg-primary500' : ''}
      `)}
      id="tmevent_treatments_type"
    >
      {!isDashboard && (
        <Image
          src="/images/filters/categories/pack.svg"
          width={33}
          height={33}
          alt="Packs Holaglow"
          className="shrink-0 mr-2"
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
        <Text className="text-xs whitespace-nowrap">Packs</Text>
      )}
    </Button>
  );
}
