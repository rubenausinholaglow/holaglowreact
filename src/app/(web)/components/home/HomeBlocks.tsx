'use client';

import { useEffect, useRef, useState } from 'react';
import { atcb_action } from 'add-to-calendar-button';
import { SvgCalendar } from 'app/icons/Icons';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';

import { useSessionStore } from '../../../stores/globalStore';
import Clinics from '../common/Clinics';
import MainLayout from '../layout/MainLayout';
import FloatingBottomBar from './FloatingBottomBar';
import GoogleStars from './GoogleStars';
import GoToTreatments from './GoToTreatments';
import Hero from './Hero';
import Professionals from './HomeProfessionals';
import Products from './Products';
import HomePromo from './Promo';
import Testimonials from './Testimonials';
import ValuesCarousel from './ValuesCarousel';
import ValuesDescription from './ValuesDescription';

export default function HomeBlocks() {
  const { deviceSize } = useSessionStore(state => state);

  const addToCalendarRef = useRef(null);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <></>;
  }

  const FAKE_SLOTS = {
    startTime: '17:33',
    endTime: '18:07',
    box: '7',
    treatment: '674',
  };

  return (
    <MainLayout>
      <Hero />
      <GoogleStars />
      <ValuesCarousel />

      <div className="py-12 flex justify-center">
        <Button
          ref={addToCalendarRef}
          size="xl"
          type="tertiary"
          className="mx-auto"
          customStyles="border-none bg-derma-secondary100 text-derma-primary font-normal justify-start pl-2"
          onClick={() =>
            atcb_action(
              {
                name: 'Cita online - Derma by Holaglow',
                description: 'Consulta online con un dermatólogo estético',
                startDate: dayjs().format('YYYY-MM-DD'),
                startTime: FAKE_SLOTS.startTime,
                endTime: FAKE_SLOTS.endTime,
                options: ['Apple', 'Google', 'iCal', 'Outlook.com', 'Yahoo'],
                timeZone: 'Europe/Madrid',
              },
              addToCalendarRef.current ? addToCalendarRef.current : undefined
            )
          }
        >
          <SvgCalendar className="h-4 w-4 mr-2" />
          Añadir a mi calendario TEEEEEEEEEST
        </Button>
      </div>

      <HomePromo />
      <ValuesDescription />
      <Products />
      <div id="professionals">
        <Professionals />
      </div>
      <Testimonials />
      <Clinics />
      <GoToTreatments />
      {deviceSize.isMobile && <FloatingBottomBar threshold={1200} />}
    </MainLayout>
  );
}
