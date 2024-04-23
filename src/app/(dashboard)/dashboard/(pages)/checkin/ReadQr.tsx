import React, { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import ScheduleService from '@services/ScheduleService';
import UserService from '@services/UserService';
import { SvgSpinner } from 'app/icons/Icons';
import { Status } from 'app/types/appointment';
import { Button } from 'designSystem/Buttons/Buttons';
import { Text } from 'designSystem/Texts/Texts';
import { Html5Qrcode } from 'html5-qrcode';

interface props {
  name: string;
  hour: string;
  professional: string;
  professionalId: string;
  userId: string;
  boxId: string;
  clinicId: string;
}

interface QRScannerProps {
  onScanSuccess: (properties: props) => void;
  onErrorScan: (delay: number) => void;
}

function ReadQR({ onScanSuccess, onErrorScan }: QRScannerProps) {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode('qr-reader');

    const qrCodeSuccessCallback = async (UserId: any, decodedResult: any) => {
      try {
        html5QrCode.stop();
        setScanResult(decodedResult);
        setIsLoading(true);
        const user = await UserService.getUserById(UserId);
        if (user.firstName !== null) {
          const appointmentInfo =
            await ScheduleService.getClinicScheduleByToken(user.flowwwToken);
          if (appointmentInfo !== undefined) {
            await ScheduleService.updatePatientStatusAppointment(
              appointmentInfo.id,
              UserId,
              Status.CheckIn
            );

            const props = {
              name: user.firstName,
              hour: appointmentInfo.startTime,
              professional: appointmentInfo.clinicProfessionalName,
              professionalId: appointmentInfo.clinicProfessionalId,
              userId: user.id,
              boxId: appointmentInfo.boxId,
              clinicId: appointmentInfo.clinicId,
            };
            onScanSuccess(props);
          } else {
            setError('Cita no encontrada');
            onErrorScan(5000);
          }
        } else {
          setError('Usuario no encontrado');
          onErrorScan(5000);
        }
      } catch (err: any) {
        setError('Usuario no encontrado ' + err);
        onErrorScan(5000);
        Bugsnag.notify(err);
      } finally {
        setIsLoading(false);
      }
    };

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    };

    html5QrCode.start(
      { facingMode: 'user' },
      config,
      qrCodeSuccessCallback,
      undefined
    );
  }, []);

  function stopScan() {
    onErrorScan(5);
  }

  return (
    <div>
      {scanResult ? (
        isLoading && <SvgSpinner height={24} width={24} />
      ) : (
        <div>
          <div id="qr-reader" style={{ width: '600px' }}></div>
          <Button
            type="tertiary"
            className="ml-auto mt-4"
            customStyles="bg-white"
            onClick={stopScan}
          >
            <p>Cancelar</p>
          </Button>
        </div>
      )}
    </div>
  );
}

export default ReadQR;
