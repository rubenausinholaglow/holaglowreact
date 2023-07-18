'use client';
import { useState } from 'react';
import { CustomButtonFilter } from '@components/CustomButtonFilter';
import { filterItems } from '@utils/filterItems';
import { FilterPageProps } from '@utils/props';
import { Flex } from 'components/Layouts/Layouts';

export const Filters: React.FC<FilterPageProps> = ({ onClickFilter }) => {
  const [inputValue, setInputValue] = useState('');

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
      className="sticky w-[260px] shrink-0 top-[10px] overflow-hidden mr-8"
    >
      <input
        type="text"
        placeholder="Filtrar por título o descripción"
        className="border border-gray-400 rounded px-2 py-1 mt-2 text-black w-full mb-6"
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
    </Flex>
  );
};
