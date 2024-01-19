'use client';

import { useEffect } from 'react';
import SocketService from '@services/SocketService';
import useRoutes from '@utils/useRoutes';
import { ClinicProfessional } from 'app/(dashboard)/dashboard/components/ClinicProfessional';
import { useMessageSocket } from 'app/(dashboard)/dashboard/components/useMessageSocket';
import { SvgHolaglow } from 'app/icons/IconsDs';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { EventTypes } from 'app/types/FrontEndMessages';
import { MessageSocket, MessageType } from 'app/types/messageSocket';
import { Flex } from 'designSystem/Layouts/Layouts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import DashboardFooter from './DashboardFooter';

export default function DashboardLayout({
  hideBottomBar = false,
  isCheckout = false,
  hideContactButtons = false,
  hideProfessionalSelector = false,
  hasAnimatedBackground = false,
  showCart = false,
  children,
}: {
  hideBottomBar?: boolean;
  isCheckout?: boolean;
  hideBackButton?: boolean;
  hideContactButtons?: boolean;
  hideProfessionalSelector?: boolean;
  hasAnimatedBackground?: boolean;
  showCart?: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const ROUTES = useRoutes();

  const messageSocket = useMessageSocket(state => state);
  const { remoteControl, storedBoxId, storedClinicId, user } =
    useGlobalPersistedStore(state => state);
  const SOCKET_URL_COMMUNICATIONS =
    process.env.NEXT_PUBLIC_CLINICS_API + 'Hub/Communications';
  const SOCKET_URL_PROFESSIONAL_RESPONSE =
    process.env.NEXT_PUBLIC_CLINICS_API + 'Hub/ProfessionalResponse';
  const SOCKET_URL_PAYMENT_CONFIRMATION_RESPONSE =
    process.env.NEXT_PUBLIC_FINANCE_API + 'Hub/PaymentConfirmationResponse';
  const SOCKET_URL_START_APPOINTMENT =
    process.env.NEXT_PUBLIC_CLINICS_API + 'Hub/StartAppointment';

  const routePages: Record<string, string | ''> = {
    Crisalix: ROUTES.dashboard.crisalix,
    Agenda: `${ROUTES.dashboard.schedule}?token=${user?.flowwwToken}`,
    Menu: ROUTES.dashboard.menu,
    Home: ROUTES.dashboard.home,
    CheckOut: '/dashboard/remoteControl/Payment',
  };

  useEffect(() => {
    if (user) {
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
          if (
            message.event === EventTypes.PatientArrived ||
            (message.event === EventTypes.StartAppointment &&
              (message.data.clinicId.toUpperCase() !==
                storedClinicId.toUpperCase() ||
                !isBoxIdInStoredBoxId(message.data.boxId, storedBoxId)))
          ) {
            return true;
          }

          if (
            message.data.userId.toUpperCase() != user?.id?.toUpperCase() &&
            message.event !== EventTypes.PatientArrived
          ) {
            return true;
          }

          let messageData: any;
          switch (message.event) {
            case EventTypes.PatientArrived:
              messageData = handlePatientArrived(message);
              break;
            case EventTypes.CrisalixUser:
              messageData = handleCrisalixUser(message);
              break;
            case EventTypes.PaymentCreate:
              messageData = handlePaymentCreate(message);
              break;
            case EventTypes.GoToPage:
              handleGoToPage(message);
              break;
            case EventTypes.StartAppointment:
              messageData = handleStartAppointment(message);
              break;
            default:
              throw new Error(`Unsupported event: ${message.Event}`);
          }
          if (messageData && message.event != EventTypes.GoToPage)
            messageSocket.addMessageSocket(messageData);
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
    }
  }, [user]);

  useEffect(() => {
    SocketService.getInstance({
      urlConnection: SOCKET_URL_START_APPOINTMENT,
      onReceiveMessage: message => {
        if (
          message.event != EventTypes.StartAppointment ||
          (message.event == EventTypes.StartAppointment &&
            (message.data.clinicId.toUpperCase() !==
              storedClinicId.toUpperCase() ||
              !isBoxIdInStoredBoxId(message.data.boxId, storedBoxId)))
        ) {
          return true;
        }
        let messageData: any;
        switch (message.event) {
          case EventTypes.StartAppointment:
            messageData = handleStartAppointment(message);
            break;
          default:
            throw new Error(`Unsupported event: ${message.Event}`);
        }
        if (messageData && message.event != EventTypes.GoToPage)
          messageSocket.addMessageSocket(messageData);
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
      BoxId: storedBoxId,
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
      router.push(routePages[message.data.page]);
    } else if (remoteControl) {
      return true;
    } else if (message.data.page !== 'CheckOut') {
      router.push(routePages[message.data.page]);
    }
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
      className={`transition-all h-screen overflow-hidden flex flex-col w-full ${
        isCheckout
          ? 'bg-hg-black50'
          : hasAnimatedBackground
          ? 'bg-gradient-animated animate-animateBG bg-[length:1200%_1200%]'
          : 'bg-gradient-15deg from-hg-primary300 to-hg-secondary500'
      }`}
    >
      <Flex layout="col-center" className="grow overflow-y-auto relative">
        {hasAnimatedBackground && (
          <Flex className="absolute inset-0 justify-center items-center pointer-events-none">
            <Image
              src="/images/dashboard/background/bg.png"
              alt="holaglow"
              height={708}
              width={808}
              className="w-3/4"
            />
          </Flex>
        )}

        <Flex className="p-4 justify-center">
          <SvgHolaglow
            height={37.5}
            width={150}
            className="text-hg-secondary"
          />

          {!hideProfessionalSelector && (
            <div className="absolute right-0 top-0">
              <ClinicProfessional />
            </div>
          )}
        </Flex>

        {children}
      </Flex>

      {!hideBottomBar && (
        <footer className="z-50 bg-hg-secondary300">
          <DashboardFooter showCart={showCart} />
        </footer>
      )}
    </main>
  );
}
