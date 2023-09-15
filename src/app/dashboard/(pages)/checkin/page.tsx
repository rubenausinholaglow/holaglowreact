'use client';

import React, { useEffect, useState } from 'react';
import clinicService from '@services/ClinicService';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import CheckHydration from 'utils/CheckHydration';

import ReadQr from './ReadQr';
import useFormHook from './useFormHook';

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
      clinicService.PatientArrived(props);
      reloadPageAfterDelay(30000);
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
      reloadPageAfterDelay(30000);
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
            <Flex layout="col-center" className="gap-4 mb-12">
              <Title size="xl" className="text-left">
                {WELCOME_MESSAGE}
              </Title>
              <Text className="mb-8">{SCAN_QR_MESSAGE}</Text>
              {isScanning ? (
                <ReadQr
                  onScanSuccess={onScanSuccess}
                  onErrorScan={reloadPageAfterDelay}
                />
              ) : (
                <Button size="lg" style="primary" onClick={startScan}>
                  {SCAN_QR}
                </Button>
              )}
            </Flex>
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
    <>
      <Text size="lg" className="font-semibold mb-4">
        ...o identifícate con tu email y teléfono
      </Text>
      <form onSubmit={handleSubmit} className="relative">
        <Flex
          layout="col-left"
          className={`gap-4 px-12 py-8 bg-hg-tertiary300 relative z-10 ${
            checkIn ? 'rounded-t-xl' : 'rounded-xl'
          }`}
        >
          <Flex layout="col-left">
            <label className="mb-2">Correo Electrónico:</label>
            <input
              className="py-3 px-2 rounded-md"
              type="email"
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
            />
            {errors.email && (
              <span style={{ color: 'red' }}>{errors.email}</span>
            )}
          </Flex>
          <Flex layout="col-left">
            <label className="mb-2">Teléfono:</label>
            <input
              className="py-3 px-2 rounded-md"
              type="tel"
              value={formData.phone}
              onChange={e => handleInputChange('phone', e.target.value)}
            />
            {errors.phone && (
              <span style={{ color: 'red' }}>{errors.phone}</span>
            )}
          </Flex>
          <Button
            type="secondary"
            isSubmit
            disabled={isLoading}
            className="ml-auto"
          >
            {isLoading ? CHECKIN_LOADING_TEXT : CHECKIN_BUTTON_TEXT}
          </Button>
        </Flex>
        <Text
          className={`transition-all text-center bg-hg-tertiary text-white font-semibold w-full p-2 rounded-b-xl ${
            checkIn
              ? 'translate-y-0 opacity-100'
              : '-translate-y-full opacity-0'
          }`}
        >
          {checkIn && checkIn}
        </Text>
      </form>
    </>
  );
}
