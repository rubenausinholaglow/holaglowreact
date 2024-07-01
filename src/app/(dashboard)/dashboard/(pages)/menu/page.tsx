'use client';

import React, { useEffect } from 'react';
import { INITIAL_STATE } from '@utils/constants';
import { useMessageSocket } from 'app/(dashboard)/dashboard/components/useMessageSocket';
import CheckoutClinicSelector from 'app/(web)/checkout/components/CheckoutClinicSelector';
import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { CrisalixUser } from 'app/types/crisalix';
import { MessageType } from 'app/types/messageSocket';
import { INITIAL_STATE_PAYMENT } from 'app/types/paymentList';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Title, Underlined } from 'designSystem/Texts/Texts';

import { useCartStore } from '../budgets/stores/userCartStore';
import { usePaymentList } from '../checkout/components/payment/payments/usePaymentList';
import { useCrisalix } from '../crisalix/useCrisalix';
import DashboardMenuItem from './DashboardMenuItem';
import { menuItems } from './MenuItems';

const Page = () => {
  const messageSocket = useMessageSocket(state => state);
  const userCrisalix = useCrisalix(state => state);
  const { remoteControl, setCheckSimulator, user, setBudgetId, isCallCenter } =
    useGlobalPersistedStore(state => state);

  const {
    setSelectedTreatments,
    selectedClinic,
    setTreatmentPacks,
    setSelectedPack,
    setPromoCode,
  } = useSessionStore(state => state);

  useEffect(() => {
    setBudgetId('');
    setSelectedTreatments([]);
    setSelectedPack(undefined);
    usePaymentList.setState(INITIAL_STATE_PAYMENT);
    useCartStore.setState(INITIAL_STATE);
    setCheckSimulator(false);
    setTreatmentPacks([]);
    setPromoCode(undefined);
  }, []);
  useEffect(() => {
    if (!remoteControl) {
      const existsMessageCrisalixUser: any = messageSocket.messageSocket.filter(
        x => x.messageType == MessageType.CrisalixUser
      );
      if (existsMessageCrisalixUser.length > 0) {
        const crisalixUser = existsMessageCrisalixUser[0];
        const data = {
          ClinicId: crisalixUser.ClinicId,
          BoxId: crisalixUser.BoxId,
          id: crisalixUser.id,
          playerId: crisalixUser.playerId,
          playerToken: crisalixUser.playerToken,
        };
        saveCrisalixUser(data);
        messageSocket.removeMessageSocket(existsMessageCrisalixUser[0]);
      }
    }
  }, [messageSocket]);

  async function saveCrisalixUser(props: any) {
    const crisalixUser: CrisalixUser = {
      id: props.id,
      playerId: props.playerId,
      playerToken: props.playerToken,
      name: props.name,
    };
    userCrisalix.addCrisalixUser(crisalixUser);
  }

  return (
    <MainLayout isDashboard hideContactButtons hideProfessionalSelector>
      <div>
        {!selectedClinic && isCallCenter && (
          <>
            <Title className="font-semibold mb-8">Selecciona clínica</Title>

            <CheckoutClinicSelector isDashboard className="mb-8" />
          </>
        )}
      </div>
      {((user?.firstName && !isCallCenter) ||
        (isCallCenter && selectedClinic)) && (
        <div className="mt-8">
          <Title className="text-xl mb-4">Tu glow, tus normas</Title>
          <Title className="font-bold text-5xl mb-8">
            ¡Hola{' '}
            <Underlined color={HOLAGLOW_COLORS['primary']}>
              {user?.firstName}
            </Underlined>
            !
          </Title>
          <div className="grid grid-cols-3 mb-12">
            {menuItems.map(item => (
              <>
                {(item.visible == true ||
                  (isCallCenter && item.visible == false)) && (
                  <>
                    <DashboardMenuItem
                      key={item.title}
                      iconSrc={item.iconSrc}
                      altText={item.altText}
                      title={item.title}
                      link={
                        item.link.includes('flowwwToken')
                          ? item.link.replace('flowwwToken', user!.flowwwToken)
                          : item.link
                      }
                      target={item.target}
                    />
                  </>
                )}
              </>
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
};
export default Page;
