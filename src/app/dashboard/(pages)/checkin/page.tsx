'use client';

import React, { useEffect, useState } from 'react';
import TextInputField from '@components/TextInputField';
import { UserCheckin } from '@interface/appointment';
import { messageService } from '@services/MessageService';
import MainLayout from 'app/components/layout/MainLayout';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgScanQR } from 'icons/Icons';
import { SvgArrow } from 'icons/IconsDs';
import { useRouter } from 'next/navigation';
import CheckHydration from 'utils/CheckHydration';

import ReadQr from './ReadQr';
import useFormHook from './useFormHook';

const SCAN_QR = 'Escanear QR';
const CHECKIN_BUTTON_TEXT = 'Checkin';
const CHECKIN_LOADING_TEXT = 'Checking In...';

export default function Page() {
  const [isScanning, setIsScanning] = useState(false);
  const { setSelectedClinic, setSelectedSlot, setSelectedTreatments } =
    useSessionStore(state => state);
  const { clinics, user, setUserCheckIn, setCurrentUser } =
    useGlobalPersistedStore(state => state);

  const router = useRouter();
  const ROUTES = useRoutes();

  const onScanSuccess = (props: any) => {
    if (props) {
      const user: UserCheckin = {
        name: props.name,
        hour: props.hour,
        professional: props.professional,
      };
      setUserCheckIn(user);
      messageService.patientArrived(props);
      router.push(ROUTES.dashboard.checkIn.thankYou);
    } else {
      router.push(ROUTES.dashboard.checkIn.treatments);
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
  } = useFormHook(onScanSuccess);

  const startScan = () => {
    setIsScanning(true);
  };

  const reloadPageAfterDelay = (delay: number) => {
    setTimeout(() => {
      window.location.reload();
    }, delay);
  };

  useEffect(() => {
    if (isChecked == undefined) return;
    if (!isChecked && user) {
      router.push(ROUTES.dashboard.checkIn.treatments);
    } else if (isChecked) {
      router.push(ROUTES.dashboard.checkIn.thankYou);
    } else {
      router.push(ROUTES.dashboard.checkIn.badRequest);
    }
  }, [isChecked]);

  useEffect(() => {
    setUserCheckIn(undefined);
    setCurrentUser(undefined);
    setSelectedSlot(undefined);
    setSelectedTreatments([]);
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const clinicId = params.get('clinicId') || '';

    const currentClinic = clinics.find(
      x => x.id.toUpperCase() === clinicId.toUpperCase()
    );
    if (currentClinic) {
      setSelectedClinic(currentClinic);
    }
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
              <div onClick={startScan} className="justify-center items-center">
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
        </Flex>
      </CheckHydration>
    </MainLayout>
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
