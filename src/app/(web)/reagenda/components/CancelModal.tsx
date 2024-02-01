import { Appointment } from '@interface/appointment';
import { SvgCalendar } from 'app/icons/Icons';
import { SvgCross, SvgWarning } from 'app/icons/IconsDs';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Text, Title } from 'designSystem/Texts/Texts';

export default function CancelModal({
  showCancelModal,
  appointmentToCancel,
  cancelAppointment,
  isDerma = false,
}: {
  showCancelModal: boolean;
  appointmentToCancel: Appointment | null;
  cancelAppointment: (appointment: Appointment) => void;
  isDerma?: boolean;
}) {
  return (
    <Modal
      type="center"
      height="h-auto"
      width="w-full"
      className="max-w-sm mx-auto"
      isVisible={showCancelModal}
    >
      <Flex layout="col-center" className="p-4">
        <SvgCross className="self-end mb-12" />
        <Title className="mb-6">
          ¿Estás segurx que quieres cancelar la cita?
        </Title>

        <Flex layout="col-left" className="gap-4 w-full mb-8">
          <Flex
            layout="col-center"
            className="bg-derma-secondary300 w-full rounded-xl p-4 gap-4"
          >
            <SvgCalendar
              height={32}
              width={32}
              className={isDerma ? 'text-derma-primary' : 'text-hg-secondary'}
            />
            <Text className="font-semibold">
              {appointmentToCancel?.treatmentText}
            </Text>
            <Text className="text-sm text-center">
              {dayjs(appointmentToCancel?.startTime).format('DD')} de{' '}
              {dayjs(appointmentToCancel?.startTime).format('MMMM')} a las {}
              {dayjs(appointmentToCancel?.startTime).format('HH:mm')}
            </Text>
          </Flex>
          {appointmentToCancel?.paid && (
            <Flex className="bg-hg-error100 text-hg-error text-xs gap-3 px-4 py-3 rounded-xl w-full mb-4">
              <SvgWarning width={22} height={22} className="shrink-0" />
              <div>
                <Text>
                  La cancelación de la cita conlleva la pérdida del anticipo.
                </Text>
              </div>
            </Flex>
          )}
        </Flex>
        <Flex layout="row-between" className="w-full">
          <Button
            className="cursor-pointer"
            type={isDerma ? 'derma' : 'tertiary'}
            customStyles={!isDerma ? 'bg-hg-primary' : ''}
            onClick={() => {
              if (appointmentToCancel) {
                cancelAppointment(appointmentToCancel);
              }
            }}
          >
            Si, cancelar cita
          </Button>
          <Button type="tertiary">Volver</Button>
        </Flex>
      </Flex>
    </Modal>
  );
}
