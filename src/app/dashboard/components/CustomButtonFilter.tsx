import React, { useState } from 'react';
import { CustomButtonFilterProps } from '@utils/props';
import { Button } from 'designSystem/Buttons/Buttons';

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

  const buttonProps = { id: id };

  return (
    <Button
      onClick={handleClick}
      data-tag={tag}
      type="tertiary"
      size="sm"
      customStyles={isSelected ? 'bg-hg-malva' : ''}
      {...buttonProps}
    >
      {value}
    </Button>
  );
};
