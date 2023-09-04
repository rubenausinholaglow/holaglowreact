import { FunctionComponent, useEffect, useState } from 'react';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

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
    <Flex layout="row-left">
      <Button
        type="primary"
        onClick={reduce}
        className="p-0"
        customStyles="p-0 h-12 w-12"
      >
        <Text size="xl" className="font-bold">
          -
        </Text>
      </Button>
      <input
        type="number"
        step="0"
        max=""
        value={value}
        onChange={e => setValue(parseInt(e.target.value))}
        className="border border-hg-purple300 w-16 mx-2 rounded-lg py-4 px-2"
      />
      <Button
        type="primary"
        onClick={increase}
        className="p-0"
        customStyles="p-0 h-12 w-12"
      >
        <Text size="xl" className="font-bold">
          +
        </Text>
      </Button>
    </Flex>
  );
};
