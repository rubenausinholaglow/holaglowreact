'use client';

import ROUTES from '@utils/routes';
import { useSessionStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';

export default function AppointmentButton() {
  const { setSelectedTreatments } = useSessionStore(state => state);

  return (
    <Button
      id={'tmevent_footer'}
      type="white"
      href={ROUTES.checkout.clinics}
      onClick={() => {
        setSelectedTreatments([]);
      }}
    >
      Reservar Cita
    </Button>
  );
}
