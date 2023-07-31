'use client';

import { useState } from 'react';
import { CustomButtonFilter } from '@components/CustomButtonFilter';
import Timercomponent from '@components/ui/Timer';
import { filterItems } from '@utils/filterItems';
import { FilterPageProps } from '@utils/props';
import { Flex } from 'components/Layouts/Layouts';
import { SvgDoubleAngleLeft } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

export const Filters: React.FC<FilterPageProps> = ({ onClickFilter }) => {
  const [inputValue, setInputValue] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  const handleButtonClick = (id: string, tag: string) => {
    onClickFilter(id, inputValue, tag);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onClickFilter('input', inputValue, 'input');
  };

  return (
    <Flex
      layout="col-left"
      className={`sticky shrink-0 top-[10px] transition-all pr-8 mr-8 border-r border-hg-lightMalva`}
    >
      <SvgDoubleAngleLeft
        height={40}
        width={40}
        className={`absolute top-0 -right-[19px] bg-hg-lime text-hg-darkMalva rounded-full p-2 cursor-pointer transition-all ${
          showFilters ? 'rotate-0' : 'rotate-180'
        }`}
        onClick={() => setShowFilters(!showFilters)}
        fill={HOLAGLOW_COLORS['darkMalva']}
      />

      <div
        className={`transition-all overflow-hidden ${
          showFilters ? 'w-[260px]' : 'w-0'
        }`}
      >
        <input
          type="text"
          placeholder="Filtrar por título o descripción"
          className="border border-hg-darkMalva rounded px-2 py-1 mt-2 text-black w-full mb-6"
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
