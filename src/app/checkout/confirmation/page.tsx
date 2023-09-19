'use client';

import { useGlobalPersistedStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

export default function ConfirmationCheckout() {
  const router = useRouter();
  const { selectedTreatments } = useGlobalPersistedStore(state => state);
  const { selectedSlot } = useGlobalPersistedStore(state => state);
  const { selectedDay } = useGlobalPersistedStore(state => state);
  const { selectedClinic } = useGlobalPersistedStore(state => state);

  const localSelectedDay = dayjs(selectedDay);
  var selectedTreatmentsNames = '';
  if (selectedTreatments) {
    selectedTreatmentsNames = selectedTreatments!.map(x => x.title).join(' + ');
  }
  return (
    <Flex layout="col-center">
      ¡Gracias! Tu cita ha sido realizada con éxito
      {localSelectedDay != undefined && (
        <Flex>
          <b>
            {localSelectedDay.format('dddd')}, {localSelectedDay.format('D')},{' '}
            {localSelectedDay.format('MMMM')}
          </b>
          {selectedSlot?.startTime}
        </Flex>
      )}
    </Flex>
  );
}
