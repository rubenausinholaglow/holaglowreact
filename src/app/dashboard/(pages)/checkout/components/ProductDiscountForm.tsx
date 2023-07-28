'use client';

import { useForm } from 'react-hook-form';
import { Button } from 'components/Buttons/Buttons';
import { Flex } from 'components/Layouts/Layouts';
import { SvgAngleDown } from 'icons/Icons';

import { useCartStore } from '../../budgets/stores/userCartStore';

export default function ProductDiscountForm({
  cartUniqueId,
  isCheckout,
}: {
  cartUniqueId?: string;
  isCheckout?: boolean;
}) {
  const { register, handleSubmit } = useForm();

  const applyItemDiscount = useCartStore(state => state.applyItemDiscount);
  const applyCartDiscount = useCartStore(state => state.applyCartDiscount);

  const cartItemDiscount = data => {
    applyItemDiscount(data.cartUniqueId, data.Value, data.DiscountType);
  };

  const cartDiscount = data => {
    console.log(data.Value, data.DiscountType);
    applyCartDiscount(data.Value, data.DiscountType);
  };

  return (
    <form
      onSubmit={handleSubmit(cartUniqueId ? cartItemDiscount : cartDiscount)}
      className="text-left"
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
            className="border rounded-lg px-4 py-3 mr-4 w-[100px] text-hg-black"
            type="number"
            placeholder="Valor"
            {...register('Value', { required: true, maxLength: 5 })}
          />
          <div className="relative mr-4">
            <select
              {...register('DiscountType', { required: true })}
              className="border appearance-none bg-white rounded-lg px-4 py-3 w-[100px] text-hg-black"
            >
              <option value="%">%</option>
              <option value="€">€</option>
            </select>
            <SvgAngleDown
              height={20}
              width={20}
              className="absolute top-3 right-2 pointer-events-none"
            />
          </div>
        </Flex>
        <Button
          className={isCheckout ? 'mt-4' : ''}
          type="submit"
          style="tertiary"
        >
          Aplicar
        </Button>
      </Flex>
    </form>
  );
}
