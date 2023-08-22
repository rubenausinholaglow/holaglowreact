'use client';

import React, { useEffect, useState } from 'react';
import ScheduleService from '@services/ScheduleService';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import CheckHydration from 'utils/CheckHydration';

import ReadQr from './ReadQr';
import useFormHook from './useFormHook';

const SCAN_DELAY = 10000;
const WELCOME_MESSAGE = 'Bienvenid@ a Holaglow!';
const SCAN_QR_MESSAGE = '¡Escanea el QR que te hemos enviado!';
const SCAN_QR = 'Escanear QR';
const CHECKIN_BUTTON_TEXT = 'Checkin';
const CHECKIN_LOADING_TEXT = 'Checking In...';

export default function Page() {
  const [isScanning, setIsScanning] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [hour, setHour] = useState<string | null>(null);
  const [professional, setProfessional] = useState<string | null>(null);

  const onScanSuccess = (props: any) => {
    if (props) {
      setName(props.name);
      setHour(props.hour);
      setProfessional(props.professional);
      ScheduleService.notifyDashboardPatientArrived(props);
      reloadPageAfterDelay(100000);
    } else {
      reloadPageAfterDelay(5000);
    }
  };

  const {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
    isLoading,
    checkIn,
  } = useFormHook(onScanSuccess);

  const startScan = () => {
    setIsScanning(true);
  };

  useEffect(() => {
    if (name) {
      reloadPageAfterDelay(100000);
    }
  }, [name]);

  const reloadPageAfterDelay = (delay: number) => {
    setTimeout(() => {
      window.location.reload();
    }, delay);
  };

  return (
    <CheckHydration>
      <Flex layout="col-center" className="w-full">
        {name ? (
          <WelcomeSection name={name} hour={hour} professional={professional} />
        ) : (
          <>
            <Title size="2xl" className="text-left mb-4">
              {WELCOME_MESSAGE}
            </Title>
            <Text>{SCAN_QR_MESSAGE}</Text>
            {isScanning ? (
              <ReadQr
                onScanSuccess={onScanSuccess}
                onErrorScan={reloadPageAfterDelay}
              />
            ) : (
              <Button
                size="sm"
                style="primary"
                onClick={startScan}
                className="px-4 mt-auto"
              >
                {SCAN_QR}
              </Button>
            )}
            <FormSection
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              checkIn={checkIn}
            />
          </>
        )}
      </Flex>
    </CheckHydration>
  );
}

function WelcomeSection({ name, hour, professional }: any) {
  return (
    <div>
      <Title className="align-center">Bienvenid@ {name}</Title>
      <Text size="lg" className="align-center">
        Tu cita es a las {hour} para el Probador Virtual.
      </Text>
      <Text size="lg" className="align-center">
        Por favor, toma asiento y en breves serás atendid@ por {professional}.
      </Text>
    </div>
  );
}

function FormSection({
  formData,
  errors,
  handleInputChange,
  handleSubmit,
  isLoading,
  checkIn,
}: any) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Correo Electrónico:</label>
        <input
          type="email"
          value={formData.email}
          onChange={e => handleInputChange('email', e.target.value)}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>
      <div>
        <label>Teléfono:</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={e => handleInputChange('phone', e.target.value)}
        />
        {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? CHECKIN_LOADING_TEXT : CHECKIN_BUTTON_TEXT}
      </button>
      <Text className="text-center">{checkIn && checkIn}</Text>
    </form>
  );
}
