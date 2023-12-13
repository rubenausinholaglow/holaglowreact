import React, { useEffect, useState } from 'react';
import { CustomButtonFilterProps } from 'app/(dashboard)/dashboard/utils/props';
import { Button } from 'designSystem/Buttons/Buttons';

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
      type="tertiary"
      size="sm"
      customStyles={`transition-all py-3 px-2 h-[26px] ${
        isSelected
          ? 'bg-hg-primary border-hg-primary hover:bg-hg-primary hover:border-hg-primary'
          : 'opacity-75 hover:opacity-100'
      }`}
      {...buttonProps}
    >
      {value}
    </Button>
  );
};
