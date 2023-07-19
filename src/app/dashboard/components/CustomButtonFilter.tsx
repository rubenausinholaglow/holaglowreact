import React, { useState } from 'react';
import { CustomButtonFilterProps } from '@utils/props';
import { Button } from 'components/Buttons/Buttons';

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
      style={isSelected ? 'primary' : 'tertiary'}
      size="sm"
      {...buttonProps}
    >
      {value}
    </Button>
  );
};
