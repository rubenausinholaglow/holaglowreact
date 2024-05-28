import { useState } from 'react';
import FinanceService from '@services/FinanceService';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';

import { useCartStore } from '../../budgets/stores/userCartStore';

export default function ProductDiscountForm({
  cartUniqueId,
  productPrice,
  isCheckout,
  className,
  showPercentage = false,
}: {
  cartUniqueId?: string;
  productPrice: number;
  isCheckout: boolean;
  className?: string;
  showPercentage?: boolean;
}) {
  const [isMGM, setIsMGM] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const { priceDiscount } = useCartStore(state => state);
  const { setPromoCode } = useGlobalPersistedStore(state => state);

  const applyItemDiscount = useCartStore(state => state.applyItemDiscount);
  const applyCartDiscount = useCartStore(state => state.applyCartDiscount);

  const cartItemDiscount = (data: any) => {
    applyItemDiscount(data.cartUniqueId, data.Value, data.DiscountType);
  };

  const DiscountTypes = [
    { name: 'MGM', type: 'total', value: 50, show: !showPercentage },
    { name: 'WEB', type: 'total', value: 49, show: !showPercentage },
    { name: '100%', type: '%', value: 100, show: showPercentage },
  ];

  function handleAddDiscount(data: any) {
    if (priceDiscount > 0 && data.type === 'total') return;

    if (data.name === 'MGM') {
      setIsMGM(!isMGM);
      return;
    }

    if (data.type === 'total') {
      applyCartDiscount(data.value, data.type);
    }
    if (data.type === '%') {
      const discount = {
        cartUniqueId: cartUniqueId,
        Value: data.value,
        DiscountType: '%',
      };
      cartItemDiscount(discount);
    }
  }

  const handleValidate = async () => {
    const result = await FinanceService.validatePromoCode(value);
    setIsValid(result);
    if (result) {
      applyCartDiscount(50, 'total');
      setPromoCode(value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isValid) return;
    setValue(e.target.value);
  };

  return (
    <Flex layout={isCheckout ? 'col-left' : 'row-left'}>
      <div className="flex gap-2">
        {DiscountTypes.map(({ name, type, value, show }, index) => (
          <>
            {show && (
              <Button
                key={index}
                size="sm"
                isSubmit
                type="tertiary"
                onClick={() => handleAddDiscount({ name, type, value })}
              >
                <Flex className="gap-2 p-2 rounded-xl">{name}</Flex>
              </Button>
            )}
          </>
        ))}
        {isMGM && (
          <>
            <input
              name="DiscountCode"
              type="text"
              placeholder="Código"
              className={`p-2 rounded-xl border-2 border-black ${
                isValid === null
                  ? ''
                  : isValid
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'
              }`}
              value={value}
              onChange={handleInputChange}
            />
            {isValid === null || !isValid ? (
              <Button onClick={handleValidate}>Validar Código</Button>
            ) : (
              <Button onClick={e => setIsValid(null)}>Invalidar Código</Button>
            )}
          </>
        )}
      </div>
    </Flex>
  );
}
