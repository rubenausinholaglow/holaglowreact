'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SvgAngleDown } from 'app/icons/Icons';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { isEmpty, set } from 'lodash';
import { twMerge } from 'tailwind-merge';

import { useCartStore } from '../../budgets/stores/userCartStore';

export default function ProductDiscountForm({
  cartUniqueId,
  productPrice,
  isCheckout,
  className,
}: {
  cartUniqueId?: string;
  productPrice: number;
  isCheckout: boolean;
  className?: string;
}) {
  const { register, handleSubmit, watch } = useForm();
  const { cart, priceDiscount } = useCartStore(state => state);
  const discountValue = watch('Value');
  const discountType = watch('DiscountType');

  const [discountIcon, setDiscountIcon] = useState<'euro' | 'percentage'>(
    'percentage'
  );

  const applyItemDiscount = useCartStore(state => state.applyItemDiscount);
  const applyCartDiscount = useCartStore(state => state.applyCartDiscount);
  const [isEnabledDisount, setIsEnabledDiscount] = useState(true);
  /*const cartItemDiscount = (data: any) => {
    applyItemDiscount(data.cartUniqueId, data.Value, data.DiscountType);
  };*/

  const cartDiscount = (data: any) => {
    if (priceDiscount > 0) return;
    data.Value = 50;
    data.DiscountType = 'total';
    setDiscountIcon('euro');
    setIsEnabledDiscount(false);
    applyCartDiscount(data.Value, data.DiscountType);
  };

  useEffect(() => {
    setIsEnabledDiscount(priceDiscount == 0);
  }, [cart]);

  return (
    <form
      onSubmit={handleSubmit(cartDiscount)}
      className={twMerge(`text-left ${className}`)}
    >
      <Flex layout={isCheckout ? 'col-left' : 'row-left'}>
        <Button
          size="sm"
          isSubmit
          type="tertiary"
          enabled={isEnabledDisount}
          customStyles={`${isEnabledDisount ? 'bg-gray-500' : ''}}`}
          {...register('Value')}
        >
          <Flex className="gap-2 p-2 rounded-xl ">MGM</Flex>
        </Button>
      </Flex>
    </form>
  );
}
