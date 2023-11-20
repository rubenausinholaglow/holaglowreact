'use client';

import React, { useEffect, useState } from 'react';
import TextInputField from '@components/TextInputField';
import { Appointment } from '@interface/appointment';
import { messageService } from '@services/MessageService';
import Agenda from 'app/checkout/agenda/page';
import Confirmation from 'app/checkout/confirmation/components/Confirmation';
import ClinicsCheckout from 'app/checkout/treatments/page';
import RegistrationForm from 'app/components/common/RegistrationForm';
import MainLayout from 'app/components/layout/MainLayout';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgScanQR } from 'icons/Icons';
import { SvgArrow, SvgCheck, SvgSadIcon } from 'icons/IconsDs';
import App from 'next/app';
import CheckHydration from 'utils/CheckHydration';

import ReadQr from './ReadQr';
import useFormHook from './useFormHook';

const SCAN_QR = 'Escanear QR';
const CHECKIN_BUTTON_TEXT = 'Checkin';
const CHECKIN_LOADING_TEXT = 'Checking In...';

export default function Page() {
  const [isScanning, setIsScanning] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [hour, setHour] = useState<string | null>(null);
  const [professional, setProfessional] = useState<string | null>(null);
  const { setSelectedClinic } = useSessionStore(state => state);
  const { clinics } = useGlobalPersistedStore(state => state);

  const onScanSuccess = (props: any) => {
    if (props) {
      setName(props.name);
      setHour(props.hour);
      setProfessional(props.professional);
      messageService.patientArrived(props);
      reloadPageAfterDelay(7000);
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
    isChecked,
    showAgenda,
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

  useEffect(() => {
    setSelectedClinic(clinics[0]);
  }, [clinics]);

  return (
    <MainLayout
      isDashboard
      hideBackButton
      hideContactButtons
      hideProfessionalSelector
      hideBottomBar
    >
      <CheckHydration>
        <Flex layout="col-center" className="w-full">
          {isChecked ? (
            <>
              {name ? (
                <WelcomeSection
                  name={name}
                  hour={hour}
                  professional={professional}
                />
              ) : (
                <>{showAgenda ? <AgendaSection /> : <BadRequestSection />}</>
              )}
            </>
          ) : (
            <>
              <Flex layout="col-center" className="gap-4 mb-12">
                <Title className="font-bold text-5xl mb-8">
                  Te damos la <br />
                  <Underlined color={HOLAGLOW_COLORS['primary']}>
                    Bienvenid@
                  </Underlined>{' '}
                </Title>
                <Text className="mb-8 font-bold">
                  Escanea el QR que te hemos envíado para acceder a tu cita.
                </Text>
                {isScanning ? (
                  <ReadQr
                    onScanSuccess={onScanSuccess}
                    onErrorScan={reloadPageAfterDelay}
                  />
                ) : (
                  <div
                    onClick={startScan}
                    className="justify-center items-center"
                  >
                    <SvgScanQR height={192} width={192} fill="white" />
                    <Text className="mb-8 text-center">{SCAN_QR}</Text>
                  </div>
                )}
              </Flex>

              {!isScanning && (
                <FormSection
                  formData={formData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  isLoading={isLoading}
                  checkIn={checkIn}
                />
              )}
            </>
          )}
        </Flex>
      </CheckHydration>
    </MainLayout>
  );
}

function WelcomeSection({ name, hour, professional }: any) {
  return (
    <Flex className="flex-col">
      <SvgCheck
        width={96}
        height={96}
        className="text-hg-primary bg-hg-secondary rounded-full"
      />
      <Title className="align-center font-bold" size="xl">
        Hola {name}
      </Title>
      <Title className="align-center font-bold">Cita confirmada</Title>
      <Text size="lg" className="align-center mt-8">
        Tu cita para el Probador Virtual es a las {hour}.
      </Text>
      <Text size="lg" className="align-center justify-center">
        Por favor, toma asiento y en breves te atenderá {professional}.
      </Text>
    </Flex>
  );
}

function BadRequestSection() {
  return (
    <Flex className="flex-col items-center">
      <SvgSadIcon
        width={96}
        height={96}
        className="text-hg-primary bg-hg-secondary rounded-full"
      />
      <Title className="align-center font-bold mt-8" size="xl">
        ¡Ups!
      </Title>
      <Title className="align-center font-bold">No te hemos encontrado</Title>
      <Text size="lg" className="align-center mt-8 mb-8">
        Por favor, registrate y agenda una cita.
      </Text>
      <RegistrationForm />
      <Button
        type="tertiary"
        isSubmit
        className="align-center"
        customStyles="bg-hg-primary mt-8"
        onClick={() => {
          window.location.reload();
        }}
      >
        Volver
      </Button>
    </Flex>
  );
}

function AgendaSection() {
  const [displayAgenda, setDisplayAgenda] = useState(false);
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [appointment, setAppointment] = useState<Appointment | undefined>(
    undefined
  );

  const handleAgendaClick = () => {
    setDisplayAgenda(true);
  };

  const handleConfirmationClick = () => {
    setDisplayConfirmation(true);
  };

  const handleSetAppointmentClick = (selectedAppointment: Appointment) => {
    setAppointment(selectedAppointment);
  };

  return (
    <Flex className="flex-col items-center">
      {!displayAgenda && (
        <>
          <SvgSadIcon
            width={96}
            height={96}
            className="text-hg-primary bg-hg-secondary rounded-full"
          />
          <Title className="align-center font-bold mt-8" size="xl">
            ¡Ups!
          </Title>
          <Title className="align-center font-bold">
            No tienes ninguna cita prevista
          </Title>
        </>
      )}
      {!displayAgenda ? (
        <ClinicsCheckout
          isDashboard={true}
          setDisplayAgenda={handleAgendaClick}
        />
      ) : (
        <>
          {!displayConfirmation ? (
            <Agenda
              isDashboard={true}
              setConfirmationClick={handleConfirmationClick}
              setAppointmentClick={() => handleSetAppointmentClick}
            />
          ) : (
            <Confirmation appointment={appointment} isDashboard={true} />
          )}
        </>
      )}

      <Button
        type="tertiary"
        isSubmit
        className="align-center"
        customStyles="bg-hg-primary mt-8"
        onClick={() => {
          window.location.reload();
        }}
      >
        Volver
      </Button>
    </Flex>
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
      <form onSubmit={handleSubmit} className="relative">
        <Flex
          layout="col-left"
          className={`gap-4 px-12 py-8 bg-hg-secondary100 relative z-10 w-full ${
            checkIn ? 'rounded-t-xl' : 'rounded-xl'
          }`}
        >
          <Text size="lg" className="font-semibold mb-4">
            ...o identifícate con tu email y teléfono
          </Text>
          <div className="grid grid-cols-1 gap-4 w-full">
            <TextInputField
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
              hasNoValidation
            />
            {errors.email && (
              <span style={{ color: 'red' }}>{errors.email}</span>
            )}

            <TextInputField
              placeholder="Teléfono"
              value={formData.phone}
              onChange={e => handleInputChange('phone', e.target.value)}
              hasNoValidation
            />
            {errors.phone && (
              <span style={{ color: 'red' }}>{errors.phone}</span>
            )}
          </div>
          <Button
            type="tertiary"
            isSubmit
            disabled={isLoading}
            className="ml-auto"
            customStyles="bg-hg-primary"
          >
            <p className="mr-2">
              {isLoading ? CHECKIN_LOADING_TEXT : CHECKIN_BUTTON_TEXT}
            </p>
            <SvgArrow height={20} width={20} />
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
