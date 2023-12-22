'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SvgAngleDown } from 'app/icons/Icons';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { isEmpty } from 'lodash';
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

  const discountValue = watch('Value');
  const discountType = watch('DiscountType');

  const [discountIcon, setDiscountIcon] = useState<'euro' | 'percentage'>(
    'percentage'
  );

  const applyItemDiscount = useCartStore(state => state.applyItemDiscount);
  const applyCartDiscount = useCartStore(state => state.applyCartDiscount);

  const cartItemDiscount = (data: any) => {
    applyItemDiscount(data.cartUniqueId, data.Value, data.DiscountType);
  };

  const cartDiscount = (data: any) => {
    applyCartDiscount(data.Value, data.DiscountType);
  };

  useEffect(() => {
    setDiscountIcon(discountType === '%' ? 'percentage' : 'euro');
  }, [discountType]);

  return (
    <form
      onSubmit={handleSubmit(cartUniqueId ? cartItemDiscount : cartDiscount)}
      className={twMerge(`text-left ${className}`)}
    >
      <Flex layout={isCheckout ? 'col-left' : 'row-left'}>
        <Flex layout="row-left" className="gap-2">
          {cartUniqueId && (
            <input
              type="hidden"
              value={cartUniqueId}
              {...register('cartUniqueId')}
            />
          )}
          <input
            className="border rounded-lg px-4 py-2  w-1/3 text-hg-black"
            type="decimal"
            placeholder="Valor"
            style={{
              background: `url('/images/forms/${discountIcon}.svg') #ffffff no-repeat center right 12px`,
            }}
            {...register('Value', { required: true, maxLength: 5 })}
          />{' '}
          <div className="relative w-1/3">
            <select
              {...register('DiscountType', { required: true })}
              className="border appearance-none bg-white rounded-lg px-4 py-2 text-hg-black w-full"
            >
              <option value="%">%</option>
              {!cartUniqueId && <option value="total">€</option>}
              <option value="€">total €</option>
            </select>
            <SvgAngleDown
              height={20}
              width={20}
              className="absolute top-[9px] right-2 pointer-events-none"
            />
          </div>
          <Button
            size="sm"
            isSubmit
            type="tertiary"
            className={`w-1/3 ${
              isEmpty(discountValue) || discountValue === '0'
                ? 'cursor-auto pointer-events-none'
                : ''
            }`}
            customStyles={`bg-hg-primary ${
              isEmpty(discountValue) || discountValue === '0'
                ? 'bg-hg-black50 border-none cursor-auto pointer-events-none'
                : ''
            }`}
          >
            <Flex className="gap-2">Aplicar</Flex>
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
