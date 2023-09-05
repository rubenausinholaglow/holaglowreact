'use client';

import { useForm } from 'react-hook-form';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgAngleDown } from 'icons/Icons';
import { twMerge } from 'tailwind-merge';

import { useCartStore } from '../../budgets/stores/userCartStore';

export default function ProductDiscountForm({
  cartUniqueId,
  isCheckout,
  className,
}: {
  cartUniqueId?: string;
  isCheckout: boolean;
  className?: string;
}) {
  const { register, handleSubmit } = useForm();

  const applyItemDiscount = useCartStore(state => state.applyItemDiscount);
  const applyCartDiscount = useCartStore(state => state.applyCartDiscount);
  const cartItemDiscount = (data: any) => {
    applyItemDiscount(data.cartUniqueId, data.Value, data.DiscountType);
  };

  const cartDiscount = (data: any) => {
    applyCartDiscount(data.Value, data.DiscountType);
  };

  return (
    <form
      onSubmit={handleSubmit(cartUniqueId ? cartItemDiscount : cartDiscount)}
      className={twMerge(`text-left ${className}`)}
    >
      <Flex layout={isCheckout ? 'col-left' : 'row-left'}>
        <Flex layout="row-left">
          {cartUniqueId && (
            <input
              type="hidden"
              value={cartUniqueId}
              {...register('cartUniqueId')}
            />
          )}
          <input
            className="border rounded-lg px-4 py-2 mr-4 w-[100px] text-hg-black"
            type="decimal"
            placeholder="Valor"
            {...register('Value', { required: true, maxLength: 5 })}
          />
          <div className="relative mr-4">
            <select
              {...register('DiscountType', { required: true })}
              className="border appearance-none bg-white rounded-lg px-4 py-2 w-[100px] text-hg-black"
            >
              <option value="%">%</option>
              <option value="€">€</option>
              {!cartUniqueId && <option value="total">total</option>}
            </select>
            <SvgAngleDown
              height={20}
              width={20}
              className="absolute top-[9px] right-2 pointer-events-none"
            />
          </div>
        </Flex>
        <Button className={isCheckout ? 'mt-4' : ''} isSubmit type="secondary">
          Aplicar
        </Button>
      </Flex>
    </form>
  );
}
