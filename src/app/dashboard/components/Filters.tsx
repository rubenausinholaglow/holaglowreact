'use client';

import { useState } from 'react';
import { CustomButtonFilter } from '@components/CustomButtonFilter';
import { filterItems } from '@utils/filterItems';
import { FilterPageProps } from '@utils/props';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgDoubleAngleLeft } from 'icons/Icons';

export const Filters: React.FC<FilterPageProps> = ({
  onClickFilter,
  showFilters,
  setShowFilters,
  slug,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = (id: string, tag: string) => {
    onClickFilter(id, inputValue, tag);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onClickFilter('input', e.target.value, 'input');
  };

  return (
    <Flex
      layout="col-left"
      className={`sticky shrink-0 top-[10px] transition-all pr-8 mr-8 border-r border-white/50 ${
        showFilters ? 'ml-0' : '-ml-[16px]'
      }`}
    >
      <div
        className={`transition-all overflow-hidden ${
          showFilters ? 'w-[200px]' : 'w-0'
        }`}
      >
        <input
          type="text"
          placeholder="Filtrar por título o descripción"
          className="border border-hg-tertiary rounded px-2 py-1 mt-2 text-black w-full mb-6"
          onChange={handleInputChange}
        />

        {filterItems.map(item => {
          const { typeFilter, textFilter, buttons } = item;

          return (
            <Flex layout="col-left" key={typeFilter} className="mb-6">
              <p className="font-semibold mb-2">{textFilter}</p>
              <Flex layout="row-left" className="flex-wrap gap-2">
                {buttons.map(btn => (
                  <CustomButtonFilter
                    key={btn.id}
                    id={btn.id}
                    onClick={handleButtonClick}
                    value={btn.value}
                    tag={btn.tag}
                    selected={btn.selected}
                  />
                ))}
              </Flex>
            </Flex>
          );
        })}
      </div>
    </Flex>
  );
};
