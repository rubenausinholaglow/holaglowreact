import { useEffect } from 'react';
import { ClinicProfessional } from '@components/ClinicProfessional';
import ButtonMessage from '@components/ui/ButtonMessage';
import { useMessageSocket } from '@components/useMessageSocket';
import { MessageSocket, MessageType } from '@interface/messageSocket';
import SocketService from '@services/SocketService';
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

  useEffect(() => {
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

    SocketService.getInstance({
      urlConnection: process.env.NEXT_PUBLIC_CLINICS_API + 'Hub/PatientArrived',
      onReceiveMessage: message => {
        const finalMessage: MessageSocket = {
          messageType: MessageType.PatientArrived,
          message: message,
        };
        messageSocket.addMessageSocket(finalMessage);
      },
    });

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
