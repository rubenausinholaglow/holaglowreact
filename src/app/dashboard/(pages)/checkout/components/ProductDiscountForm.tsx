'use client';

import { useForm } from 'react-hook-form';
import { Button } from 'components/Buttons/Buttons';
import { Flex } from 'components/Layouts/Layouts';
import { SvgAngleDown } from 'icons/Icons';

import { useCartStore } from '../../budgets/stores/userCartStore';

/* const handleFinalize = async => {
  const budget: Budget = {
    userId: GuidUser,
    discountCode: '',
    priceDiscount: '0',
    percentageDiscount: '0',
    totalPrice: total,
    clinicInfoId: GuidClinic,
    referenceId: '',
    statusBudget: 0,
    professionalId: GuidProfessional,
    products: cart.map(CartItem => ({
      productId: CartItem.id,
      price: CartItem.price,
      quantity: CartItem.quantity ?? 0,
      percentageDiscount: CartItem.percentageDiscount,
      priceDiscount: CartItem.priceDiscount,
    })),
  };
  try {
    await budgetService.createBudget(budget);
    useCartStore.setState(INITIAL_STATE);
    router.push('/dashboard/checkout');
  } catch (error) {
    console.error(ERROR_POST, error);
  }
}; */

export default function ProductDiscountForm({
  cartUniqueId,
}: {
  cartUniqueId?: string;
}) {
  const { register, handleSubmit } = useForm();

  const applyItemDiscount = useCartStore(state => state.applyItemDiscount);

  const onSubmit = data => {
    console.log(data);
    applyItemDiscount(data.cartUniqueId, data.Value, data.DiscountType);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-left">
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

        <Button type="submit">Aplicar</Button>
      </Flex>
    </form>
  );
}
