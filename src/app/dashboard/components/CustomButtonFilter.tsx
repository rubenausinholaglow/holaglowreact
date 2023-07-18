import React, { useState } from 'react';
import { CustomButtonFilterProps } from '@utils/props';
import { Button } from 'components/Buttons/Buttons';
import { twMerge } from 'tailwind-merge';

export const CustomButtonFilter: React.FC<CustomButtonFilterProps> = ({
  id,
  tag,
  onClick,
  value,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(prevState => !prevState);
    onClick(id, tag);
  };
  /* 
  const buttonClass = isSelected
    ? 'bg-blue-500 text-white rounded p-5 shadow-md border-5 border-blue-500'
    : 'border-hg-dar'; */

  return (
    <Button
      id={id}
      className={twMerge(`transition-all`)}
      onClick={handleClick}
      data-tag={tag}
      style={isSelected ? 'primary' : 'tertiary'}
      size="sm"
    >
      {value}
    </Button>
  );
};
