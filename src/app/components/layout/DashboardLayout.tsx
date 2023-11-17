import { useEffect, useState } from 'react';
import { ClinicProfessional } from '@components/ClinicProfessional';
import ButtonMessage from '@components/ui/ButtonMessage';
import { useMessageSocket } from '@components/useMessageSocket';
import { EventTypes } from '@interface/FrontEndMessages';
import { MessageSocket, MessageType } from '@interface/messageSocket';
import SocketService from '@services/SocketService';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgArrowSmallLeft } from 'icons/Icons';
import { SvgHolaglow } from 'icons/IconsDs';
import { useRouter } from 'next/navigation';
import { removeEmitHelper } from 'typescript';

import DashboardFooter from './DashboardFooter';

export default function DashboardLayout({
  hideBottomBar = false,
  isCheckout = false,
  hideBackButton = false,
  hideContactButtons = false,
  hideProfessionalSelector = false,
  children,
}: {
  hideBottomBar?: boolean;
  isCheckout?: boolean;
  hideBackButton?: boolean;
  hideContactButtons?: boolean;
  hideProfessionalSelector?: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const messageSocket = useMessageSocket(state => state);
  const { remoteControl, storedBoxId, storedClinicId } =
    useGlobalPersistedStore(state => state);
  const [flowwwToken, setFlowwwToken] = useState('');

  const SOCKET_URL_COMMUNICATIONS =
    process.env.NEXT_PUBLIC_CLINICS_API + 'Hub/Communications';
  const SOCKET_URL_PROFESSIONAL_RESPONSE =
    process.env.NEXT_PUBLIC_CLINICS_API + 'Hub/ProfessionalResponse';
  const SOCKET_URL_PAYMENT_CONFIRMATION_RESPONSE =
    process.env.NEXT_PUBLIC_FINANCE_API + 'Hub/PaymentConfirmationResponse';

  const routePages: Record<string, string | ''> = {
    Crisalix: '/dashboard/crisalix',
    Agenda: `https://agenda.holaglow.com/schedule?mode=dashboard&token=flowwwToken${flowwwToken}`,
    Menu: '/dashboard/menu',
    Home: `/dashboard?clinicId=${storedClinicId}&boxId=${storedBoxId}&remoteControl=false`,
    CheckOut: '/dashboard/remoteControl/Payment',
  };

  useEffect(() => {
    if (!hideContactButtons) {
      SocketService.getInstance({
        urlConnection: SOCKET_URL_PROFESSIONAL_RESPONSE,
        onReceiveMessage: message => {
          const finalMessage: MessageSocket = {
            messageType: MessageType.ChatResponse,
            message: message,
          };
          messageSocket.addMessageSocket(finalMessage);
        },
      });
    }
    SocketService.getInstance({
      urlConnection: SOCKET_URL_COMMUNICATIONS,
      onReceiveMessage: message => {
        const isBoxIdInStoredBoxIds = isBoxIdInStoredBoxId(
          message.data.boxId,
          storedBoxId
        );
        if (message.data.clinicId != storedClinicId && !isBoxIdInStoredBoxIds) {
          return true;
        }
        let messageData: any;
        switch (message.event) {
          case EventTypes.PatientArrived:
            messageData = handlePatientArrived(message);
            break;
          case EventTypes.StartAppointment:
            messageData = handleStartAppointment(message);
            break;
          case EventTypes.CrisalixUser:
            messageData = handleCrisalixUser(message);
            break;
          case EventTypes.PaymentCreate:
            messageData = handlePaymentCreate(message);
            break;
          case EventTypes.GoToPage:
            messageData = handleGoToPage(message);
            break;
          default:
            throw new Error(`Unsupported event: ${message.Event}`);
        }
        if (messageData) messageSocket.addMessageSocket(messageData);
      },
    });
    SocketService.getInstance({
      urlConnection: SOCKET_URL_PAYMENT_CONFIRMATION_RESPONSE,
      onReceiveMessage: message => {
        const finalMessage: MessageSocket = {
          messageType: MessageType.PaymentResponse,
          message: message,
        };
        messageSocket.addMessageSocket(finalMessage);
      },
    });
  }, []);

  function handlePatientArrived(message: any) {
    if (!remoteControl) return true;

    const messageData = {
      messageType: MessageType.PatientArrived,
      ClinicId: message.data.clinicId,
      BoxId: message.data.boxId,
    };

    return messageData;
  }

  function handleStartAppointment(message: any) {
    if (remoteControl) return true;

    const messageData = {
      messageType: MessageType.StartAppointment,
      ClinicId: message.data.clinicId,
      BoxId: message.data.boxId,
      AppointmentId: message.data.appointmentId,
    };

    return messageData;
  }

  function handleCrisalixUser(message: any) {
    if (remoteControl) return true;

    const messageData = {
      messageType: MessageType.CrisalixUser,
      ClinicId: message.data.clinicId,
      BoxId: message.data.boxId,
      id: message.data.id,
      playerToken: message.data.playerToken,
      playerId: message.data.playerId,
    };

    return messageData;
  }

  function handlePaymentCreate(message: any) {
    if (remoteControl !== message.data.remoteControl) {
      const messageData = {
        messageType: MessageType.PaymentCreate,
        ClinicId: message.data.clinicId,
        BoxId: message.data.boxId,
        id: message.data.id,
        referenceId: message.data.referenceId,
        paymentBank: message.data.paymentBank,
        paymentMethod: message.data.paymentMethod,
        amount: message.data.amount,
        remoteControl: message.data.remoteControl,
        budgetId: message.data.budgetId,
      };

      return messageData;
    }

    return true;
  }

  function handleGoToPage(message: any) {
    if (remoteControl && message.data.page === 'CheckOut') {
      setFlowwwToken(localStorage.getItem('flowwwToken') || '');
      router.push(routePages[message.data.page]);
    } else if (remoteControl) {
      return true;
    } else if (message.data.page !== 'CheckOut') {
      setFlowwwToken(localStorage.getItem('flowwwToken') || '');
      router.push(routePages[message.data.page]);
    }

    return true;
  }

  function isBoxIdInStoredBoxId(
    messageBoxId: string,
    storedBoxId: string
  ): boolean {
    const messageBoxIdArray: number[] = messageBoxId.split(',').map(Number);
    const storedBoxIdArray: number[] = storedBoxId.split(',').map(Number);

    const storedBoxIdSet = new Set(storedBoxIdArray);

    for (const boxId of messageBoxIdArray) {
      if (!storedBoxIdSet.has(boxId)) {
        return false;
      }
    }

    return true;
  }

  return (
    <main
      className={`min-h-screen flex flex-col w-full pb-16 ${
        isCheckout
          ? 'bg-hg-black50'
          : 'bg-gradient-15deg from-hg-primary300 to-hg-secondary500'
      }`}
    >
      <Flex className="p-4 justify-center relative">
        <SvgHolaglow height={25} width={100} className="text-hg-secondary" />

        {!hideProfessionalSelector && (
          <div className="absolute right-0 top-0">
            {!hideProfessionalSelector && <ClinicProfessional />}
          </div>
        )}
      </Flex>

      <Flex layout="col-center">{children}</Flex>

      {!hideBottomBar && (
        <DashboardFooter
          hideBackButton={hideBackButton}
          hideContactButtons={hideContactButtons}
        />
      )}
    </main>
  );
}
