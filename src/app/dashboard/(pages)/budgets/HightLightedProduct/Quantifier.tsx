import { FunctionComponent, useEffect, useState } from 'react';

export type Operation = 'decrease' | 'increase';

interface Props {
  handleUpdateQuantity: (operation: Operation) => void;
  quantity: number;
}

export const Quantifier: FunctionComponent<Props> = ({
  handleUpdateQuantity,
  quantity,
}) => {
  const [value, setValue] = useState<number>(1);

  useEffect(() => {
    setValue(quantity);
  });

  const reduce = (): void => {
    handleUpdateQuantity('decrease');

    setValue(prevState => {
      const updatedValue = prevState - 1;
      return updatedValue;
    });
  };

  const increase = (): void => {
    handleUpdateQuantity('increase');
    setValue(prevState => prevState + 1);
  };
  return (
    <>
      <input type="button" value="-" onClick={reduce} />
      <input
        type="number"
        step="0"
        max=""
        value={value}
        onChange={e => setValue(parseInt(e.target.value))}
      />
      <input type="button" value="+" onClick={increase} />
    </>
  );
};
