import { useForm } from 'react-hook-form';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { twMerge } from 'tailwind-merge';

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
  const { priceDiscount } = useCartStore(state => state);

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
      </div>
    </Flex>
  );
}
