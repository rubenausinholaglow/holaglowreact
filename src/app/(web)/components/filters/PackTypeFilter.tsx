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
  isDashboard = false,
  customStyles,
}: {
  isDashboard?: boolean;
  customStyles?: string;
}) {
  const { promo } = useGlobalPersistedStore(state => state);
  const { productFilters, setProductFilters } = useGlobalStore(state => state);

  return (
    <div
      id="tmevent_treatments_type_packs"
      onClick={() => setProductFilters(toggleIsPack(productFilters))}
      className={`shrink-0 transition-all cursor-pointer rounded-full p-1 pr-4 ${
        productFilters.isPack ? 'bg-hg-primary500' : 'bg-white'
      }`}
    >
      <div className="flex items-center pointer-events-none">
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
      </div>
    </div>
  );
}
