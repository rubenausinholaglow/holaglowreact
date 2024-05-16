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
    { name: 'MGM', type: 'total', price: 50 },
    { name: 'WEB', type: 'total', price: 49 },
  ];

  function handleAddDiscount(data: any) {
    if (priceDiscount > 0 && data.type === 'total') return;
    if (data.type === 'total') {
      applyCartDiscount(data.price, data.type);
    }
    if (data.type === '%') {
      const discount = {
        cartUniqueId: cartUniqueId,
        Value: data.price,
        DiscountType: '%',
      };
      cartItemDiscount(discount);
    }
  }

  return (
    <Flex layout={isCheckout ? 'col-left' : 'row-left'}>
      {showPercentage ? (
        <Button
          size="sm"
          isSubmit
          type="tertiary"
          onClick={() =>
            handleAddDiscount({ name: 'Product', type: '%', price: 100 })
          }
        >
          <Flex className="gap-2 p-2 rounded-xl">100%</Flex>
        </Button>
      ) : (
        <div className="flex gap-2">
          {DiscountTypes.map(({ name, type, price }, index) => (
            <Button
              key={index}
              size="sm"
              isSubmit
              type="tertiary"
              onClick={() => handleAddDiscount({ name, type, price })}
            >
              <Flex className="gap-2 p-2 rounded-xl">{name}</Flex>
            </Button>
          ))}
        </div>
      )}
    </Flex>
  );
}
