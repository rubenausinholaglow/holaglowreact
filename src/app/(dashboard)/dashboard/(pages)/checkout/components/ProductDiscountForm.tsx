import { useEffect, useState } from 'react';
import { CartItem } from '@interface/product';
import { ValidatePromoCodeRequest } from '@interface/wallet';
import Notification from 'app/(dashboard)/dashboard/components/ui/Notification';
import { usePromoUserHook } from 'app/(dashboard)/dashboard/hooks/usePromoUserHook';
import { SvgSpinner } from 'app/icons/Icons';
import {
  useGlobalPersistedStore,
  useGlobalStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';

import { useCartStore } from '../../budgets/stores/userCartStore';

export default function ProductDiscountForm({
  cartUniqueId,
  isCheckout,
  showPercentage = false,
  enableMGM = false,
}: {
  cartUniqueId?: string;
  isCheckout: boolean;
  showPercentage?: boolean;
  enableMGM?: boolean;
}) {
  const [isMGM, setIsMGM] = useState<boolean>(false);
  const [codeDiscount, setCodeDiscount] = useState('');
  const [isValidPromoCode, setIsValidPromoCode] = useState<boolean | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  const { priceDiscount } = useCartStore(state => state);
  const { user, advancedPaymentProduct } = useGlobalPersistedStore(
    state => state
  );

  const { setPromoCode, promoCode } = useSessionStore(state => state);

  const addItemToCart = useCartStore(state => state.addItemToCart);
  const cart = useCartStore(state => state.cart);

  const { validatePromoCode } = usePromoUserHook();
  const [messageNotification, setMessageNotification] = useState<string | null>(
    null
  );

  interface DiscountType {
    name: string;
    type: 'total' | '%';
    value: number;
    show: boolean;
  }
  const DiscountTypes: DiscountType[] = [
    {
      name: 'MGM',
      type: 'total',
      value: 0,
      show: !showPercentage && enableMGM,
    },
    {
      name: 'WEB',
      type: 'total',
      value: 49,
      show: !showPercentage && !enableMGM,
    },
    { name: '100%', type: '%', value: 100, show: showPercentage },
  ];

  async function handleAddDiscount(data: DiscountType) {
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
      code: codeDiscount,
      userId: user?.id || '',
    };

    await validatePromoCode(promoRequest).then(response => {
      if (response.code != undefined) {
        setPromoCode(response);
        setIsValidPromoCode(true);
      } else {
        setIsValidPromoCode(false);
        setMessageNotification(response.errorMessage!);
      }
      setIsLoading(false);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidPromoCode) return;
    setCodeDiscount(e.target.value);
  };

  const handleInvalidateCode = () => {
    setIsValidPromoCode(null);
    setCodeDiscount('');
    setPromoCode(undefined);
  };

  useEffect(() => {
    if (promoCode != undefined && promoCode.code.length > 0) {
      setIsMGM(true);
      setCodeDiscount(promoCode.code);
      setIsValidPromoCode(true);
    } else {
      setIsMGM(false);
      setCodeDiscount('');
      setIsValidPromoCode(null);
    }
  }, [promoCode]);

  return (
    <Flex layout={isCheckout ? 'col-left' : 'row-left'}>
      <div className="flex gap-2">
        {!enableMGM &&
          DiscountTypes.map((discount, index) => (
            <>
              {discount.show && (
                <Button
                  key={index}
                  size="sm"
                  isSubmit
                  type="tertiary"
                  onClick={() => handleAddDiscount(discount)}
                >
                  <Flex className="gap-2 p-2 rounded-xl">{discount.name}</Flex>
                </Button>
              )}
            </>
          ))}
        {enableMGM && (
          <>
            <input
              name="DiscountCode"
              type="text"
              placeholder="Código"
              className={` m-1 rounded-xl border-2 border-black w-[30%] text-center ${
                isValidPromoCode === null
                  ? ''
                  : isValidPromoCode
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'
              }`}
              value={codeDiscount}
              onChange={handleInputChange}
            />
            {isValidPromoCode === null || !isValidPromoCode ? (
              <Button onClick={handleValidate}>
                {isLoading ? <SvgSpinner /> : 'Validar Código'}
              </Button>
            ) : (
              <Button onClick={e => handleInvalidateCode()}>
                Desvalidar Código
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
