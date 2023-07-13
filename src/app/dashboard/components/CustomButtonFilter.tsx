import React, { useState } from 'react';
import { CustomButtonFilterProps } from '@utils/props';

export const CustomButtonFilter: React.FC<CustomButtonFilterProps> = ({ id, tag, onClick, value }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
      setIsSelected(prevState => !prevState);
      onClick(id,tag);
    };

    const buttonClass = isSelected
    ? 'bg-blue-500 text-white rounded p-5 shadow-md border-5 border-blue-500'
    : 'bg-gray-300 hover:bg-blue-500 hover:text-white rounded p-5';

  return (
    <button
      id={id}
      className={buttonClass}
      onClick={handleClick}
      data-tag={tag}
    >
      {value}
    </button>
  );
};