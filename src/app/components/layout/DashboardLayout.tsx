import { useEffect, useState } from 'react';
import { ClinicProfessional } from '@components/ClinicProfessional';
import ButtonMessage from '@components/ui/ButtonMessage';
import { useMessageSocket } from '@components/useMessageSocket';
import { MessageSocket, MessageType } from '@interface/messageSocket';
import SocketService from '@services/SocketService';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { SvgArrowSmallLeft } from 'icons/Icons';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  hideTopBar = false,
  hideBackButton = false,
  hideContactButtons = false,
  hideProfessionalSelector = false,
  children,
}: {
  hideTopBar?: boolean;
  hideBackButton?: boolean;
  hideContactButtons?: boolean;
  hideProfessionalSelector?: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const messageSocket = useMessageSocket(state => state);
  const { remoteControl } = useGlobalPersistedStore(state => state);
  const [flowwwToken, setFlowwwToken] = useState('');

  const routePages: any = {
    Crisalix: '/dashboard/crisalix',
    Agenda: `https://agenda.holaglow.com/schedule?mode=dashboard&token=flowwwToken${flowwwToken}`,
    Menu: '/dashboard/menu',
    Home: '/dashboard',
    CheckOut: '/dashboard/remoteControl/Payment',
  };

  useEffect(() => {
    if (!hideContactButtons) {
      SocketService.getInstance({
        urlConnection:
          process.env.NEXT_PUBLIC_CLINICS_API + 'Hub/ProfessionalResponse',
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
      urlConnection: process.env.NEXT_PUBLIC_CLINICS_API + 'Hub/Communications',
      onReceiveMessage: message => {
        const localClinicId = localStorage.getItem('ClinicId');
        const localBoxId = localStorage.getItem('BoxId');
        if (
          message.data.clinicId != localClinicId &&
          message.data.boxId != localBoxId
        ) {
          return true;
        }
        let messageData: any;
        switch (message.event) {
          case 'PatientArrived':
            if (!remoteControl) return true;
            messageData = {
              messageType: MessageType.PatientArrived,
              ClinicId: message.data.clinicId,
              BoxId: message.data.boxId,
            };
            break;
          case 'StartAppointment':
            if (remoteControl) {
              return true;
            }
            messageData = {
              messageType: MessageType.StartAppointment,
              ClinicId: message.data.clinicId,
              BoxId: message.data.boxId,
              FlowwwToken: message.data.token,
            };
            break;
          case 'CrisalixUser':
            if (remoteControl) {
              return true;
            }
            messageData = {
              messageType: MessageType.CrisalixUser,
              ClinicId: message.data.clinicId,
              BoxId: message.data.boxId,
              id: message.data.id,
              playerToken: message.data.playerToken,
              playerId: message.data.playerId,
            };
            break;
          case 'PaymentCreate':
            if (remoteControl != message.data.remoteControl) {
              messageData = {
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
            }
            break;
          case 'GoToPage':
            if (remoteControl && message.data.page === 'CheckOut') {
              setFlowwwToken(localStorage.getItem('flowwwToken') || '');
              router.push(routePages[message.data.page]);
            }
            if (remoteControl) return true;
            setFlowwwToken(localStorage.getItem('flowwwToken') || '');
            router.push(routePages[message.data.page]);
            break;
          default:
            throw new Error(`Unsupported event: ${message.Event}`);
        }
        if (messageData) messageSocket.addMessageSocket(messageData);
      },
    });
    SocketService.getInstance({
      urlConnection:
        process.env.NEXT_PUBLIC_FINANCE_API + 'Hub/PaymentConfirmationResponse',
      onReceiveMessage: message => {
        const finalMessage: MessageSocket = {
          messageType: MessageType.PaymentResponse,
          message: message,
        };
        messageSocket.addMessageSocket(finalMessage);
      },
    });
  }, []);

  return (
    <main className="min-h-screen h-100 pt-4 text-sm bg-[url('/images/dashboard/background/main_background.png')] bg-[#A96FE7] bg-bottom bg-contain bg-no-repeat">
      <Flex
        layout="col-center"
        className="min-h-screen h-100 text-hg-black text-sm overflow-hidden"
      >
        {!hideTopBar && (
          <Container>
            <Flex layout="row-left" className="w-full pb-8">
              {!hideBackButton && (
                <Button type="tertiary" onClick={() => router.back()}>
                  <Flex layout="row-left">
                    <SvgArrowSmallLeft
                      height={40}
                      width={40}
                      className="pr-2"
                    />
                    Volver
                  </Flex>
                </Button>
              )}

              {!hideContactButtons && <ButtonMessage />}

              {!hideProfessionalSelector && (
                <div className="ml-auto z-10">
                  <ClinicProfessional />
                </div>
              )}
            </Flex>
          </Container>
        )}
        {children}
      </Flex>
    </main>
  );
}
