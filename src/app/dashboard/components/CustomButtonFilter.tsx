import React, { useEffect, useState } from 'react';
import { CustomButtonFilterProps } from '@utils/props';
import { Button } from 'components/Buttons/Buttons';

export const CustomButtonFilter: React.FC<CustomButtonFilterProps> = ({
  id,
  tag,
  onClick,
  value,
  selected,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (!isLoad) {
      setIsSelected(selected);
      setIsLoad(true);
    }
  });

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
