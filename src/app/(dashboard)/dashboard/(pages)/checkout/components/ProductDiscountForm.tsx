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
  const { register, handleSubmit } = useForm();
  const { priceDiscount } = useCartStore(state => state);

  const applyItemDiscount = useCartStore(state => state.applyItemDiscount);
  const applyCartDiscount = useCartStore(state => state.applyCartDiscount);
  const cartItemDiscount = (data: any) => {
    applyItemDiscount(data.cartUniqueId, data.Value, data.DiscountType);
  };

  const cartDiscount = (data: any) => {
    if (priceDiscount > 0) return;
    if (showPercentage) {
      data.cartUniqueId = cartUniqueId;
      data.Value = 100;
      data.DiscountType = '%';
      cartItemDiscount(data);
    } else {
      data.Value = 50;
      data.DiscountType = 'total';
      applyCartDiscount(data.Value, data.DiscountType);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(cartDiscount)}
      className={twMerge(`text-left ${className}`)}
    >
      <Flex layout={isCheckout ? 'col-left' : 'row-left'}>
        {showPercentage ? (
          <Button size="sm" isSubmit type="tertiary" {...register('Value')}>
            <Flex className="gap-2 p-2 rounded-xl ">100%</Flex>
          </Button>
        ) : (
          <Button size="sm" isSubmit type="tertiary" {...register('Value')}>
            <Flex className="gap-2 p-2 rounded-xl ">MGM</Flex>
          </Button>
        )}
      </Flex>
    </form>
  );
}
