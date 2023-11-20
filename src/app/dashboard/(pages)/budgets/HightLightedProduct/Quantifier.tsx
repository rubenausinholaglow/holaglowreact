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
    <Flex
      layout="row-left"
      className="bg-hg-secondary500 rounded-3xl gap-1 py-1 px-2"
    >
      <Button
        type="tertiary"
        onClick={reduce}
        className="p-0"
        customStyles={`p-0 ${
          value === 0 ? '' : 'bg-hg-secondary300'
        } p-0 h-8 w-8 border-none`}
      >
        <Text size="md">-</Text>
      </Button>
      <Text
        type="number"
        step="0"
        max=""
        value={value}
        onChange={(e: any) => setValue(parseInt(e.target.value))}
        className="mx-2 py-2 px-2 appearance-none "
        style={{ WebkitAppearance: 'none', margin: 0 }}
      >
        {value}
      </Text>
      <Button
        type="tertiary"
        onClick={increase}
        className="p-0"
        customStyles="p-0 h-8 w-8 border-none bg-hg-secondary300"
      >
        <Text size="md">+</Text>
      </Button>
    </Flex>
  );
};
