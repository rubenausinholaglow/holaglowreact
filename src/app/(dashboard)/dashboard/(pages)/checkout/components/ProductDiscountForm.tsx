import { useEffect, useState } from 'react';
import { CartItem } from '@interface/product';
import { ValidatePromoCodeRequest } from '@interface/wallet';
import Notification from 'app/(dashboard)/dashboard/components/ui/Notification';
import { usePromoUserHook } from 'app/(dashboard)/dashboard/hooks/usePromoUserHook';
import { SvgSpinner } from 'app/icons/Icons';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';

import { useCartStore } from '../../budgets/stores/userCartStore';

export default function ProductDiscountForm({
  cartUniqueId,
  isCheckout,
  showPercentage = false,
  enableWEB = true,
}: {
  cartUniqueId?: string;
  isCheckout: boolean;
  showPercentage?: boolean;
  enableWEB?: boolean;
}) {
  const [isMGM, setIsMGM] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  const { priceDiscount } = useCartStore(state => state);
  const { setPromoCode, promoCode, user, advancedPaymentProduct } =
    useGlobalPersistedStore(state => state);

  const addItemToCart = useCartStore(state => state.addItemToCart);
  const cart = useCartStore(state => state.cart);

  const { validatePromoCode } = usePromoUserHook();
  const [messageNotification, setMessageNotification] = useState<string | null>(
    null
  );

  const DiscountTypes = [
    {
      name: 'MGM',
      type: 'total',
      value: 0,
      show: !showPercentage && !enableWEB,
    },
    {
      name: 'WEB',
      type: 'total',
      value: 49,
      show: !showPercentage && enableWEB,
    },
    { name: '100%', type: '%', value: 100, show: showPercentage },
  ];

  async function handleAddDiscount(data: any) {
    if (priceDiscount > 0 && data.type === 'total') return;
    if (data.name === 'MGM') {
      setIsMGM(!isMGM);
      return;
    }
    if (
      cart.filter(
        item =>
          item.id.toUpperCase() === advancedPaymentProduct!.id.toUpperCase()
      ).length > 0
    ) {
      return;
    }
    const product = advancedPaymentProduct!;
    addItemToCart(product as CartItem);
  }

  const handleValidate = async () => {
    setIsLoading(true);
    const promoRequest: ValidatePromoCodeRequest = {
      code: value,
      userId: user?.id || '',
    };

    await validatePromoCode(promoRequest).then(response => {
      if (response.code != undefined) {
        setPromoCode(response);
        setIsValid(true);
      } else {
        setIsValid(false);
        setMessageNotification(response.errorMessage!);
      }
    });

    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isValid) return;
    setValue(e.target.value);
  };

  const handleInvalidateCode = () => {
    setIsValid(null);
    setValue('');
    setPromoCode(undefined);
  };

  useEffect(() => {
    if (promoCode != undefined && promoCode.code.length > 0) {
      setIsMGM(true);
      setValue(promoCode.code);
      setIsValid(true);
    } else {
      setIsMGM(false);
      setValue('');
      setIsValid(null);
    }
  }, [promoCode]);

  return (
    <Flex layout={isCheckout ? 'col-left' : 'row-left'}>
      <div className="flex gap-2">
        {enableWEB &&
          DiscountTypes.map(({ name, type, value, show }, index) => (
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
        {!enableWEB && (
          <>
            <input
              name="DiscountCode"
              type="text"
              placeholder="Código"
              className={` m-1 rounded-xl border-2 border-black w-[30%] text-center ${
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
              <Button onClick={handleValidate}>
                {isLoading ? <SvgSpinner /> : 'Validar Código'}
              </Button>
            ) : (
              <Button onClick={e => handleInvalidateCode()}>
                Invalidar Código
              </Button>
            )}
          </>
        )}
      </div>
      {messageNotification ? (
        <Notification message={messageNotification} />
      ) : (
        <></>
      )}
    </Flex>
  );
}
