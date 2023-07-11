'use client'
import { useState, useEffect } from 'react';
import { CustomButtonFilter } from '@components/CustomButtonFilter';
import { FilterPageProps } from '@utils/props';
import { filterItems } from '@utils/filterItems';

export const Filters: React.FC<FilterPageProps> = ({ onClickFilter }) => {

    const [inputValue, setInputValue] = useState('');

    const handleButtonClick = (id:string, tag : string) => {
        
        onClickFilter(id,inputValue, tag);

    };

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        onClickFilter('input',inputValue,'input');
      };

    return (

        <div id="filters" className="bg-white w-1/4 rounded-lg p-5 m-1">
          <h1 className="text-black m-1 font-bold">Filtros</h1>
          <div id="input" className="mt-1">
            <input
              type="text"
              placeholder="Filtrar por título o descripción"
              className="border border-gray-400 rounded px-2 py-1 mt-2 text-black w-full"
              onChange={handleInputChange}

            />
          </div>
    
          {filterItems.map((item) => {
            const { typeFilter, textFilter , buttons } = item;
            return (
              <div className="mt-5" key={typeFilter}>
                <h1 className="text-black m-1">{textFilter}</h1>
                <div id={typeFilter} className="grid grid-cols-2 gap-3">
                  {buttons.map((btn) => (
                    <CustomButtonFilter
                      key={btn.id}
                      id={btn.id}
                      onClick={handleButtonClick}
                      value={btn.value}
                      tag={btn.tag}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    };