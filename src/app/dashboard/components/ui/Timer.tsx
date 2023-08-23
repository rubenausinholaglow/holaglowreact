import React, { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
} from '@microsoft/signalr';

interface TimerProps {
  initialColor: string;
}

export const TimerComponent: React.FC<TimerProps> = ({ initialColor }) => {
  const [color, setColor] = useState(initialColor);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [patientArrived, setPatientArrived] = useState<boolean | null>(null);

  useEffect(() => {
    const SOCKET_URL =
      process.env.NEXT_PUBLIC_CLINICS_API + 'Hub/PatienteArrieved';
    const newConnection = new HubConnectionBuilder()
      .withUrl(SOCKET_URL, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(result => {
          connection.on('ReceiveMessage', message => {
            const finalMessage = message.messageText;
            if (finalMessage.startsWith('[PatientArrived]')) {
              const [, clinicId, boxId] = finalMessage.split('/');
              updateColor(clinicId, boxId);
            }
          });
        })
        .catch(e => Bugsnag.notify('Connection failed: ', e));
    }
  }, [connection]);

  useEffect(() => {
    const updateColorAndTime = () => {
      if (isRunning) {
        const currentTimeStamp = new Date().getTime();
        const totalTime = currentTimeStamp - startTime;

        setCurrentTime(totalTime);

        const fifteenMinutes = 15 * 60 * 1000;
        const twentyFiveMinutes = 25 * 60 * 1000;

        if (!patientArrived) {
          if (totalTime >= twentyFiveMinutes) {
            setColor('red');
          } else if (totalTime >= fifteenMinutes) {
            setColor('yellow');
          } else {
            setColor('green');
          }
        }
      }
    };

    handleStartTimer();

    updateColorAndTime();

    const timer = setInterval(updateColorAndTime, 1000);

    return () => clearInterval(timer);
  }, [isRunning, startTime]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleStartTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setStartTime(new Date().getTime());
    }
  };

  function updateColor(clinicId: string, boxId: string) {
    const GuidClinic = localStorage.getItem('ClinicId') || '';
    const boxIdlocal = localStorage.getItem('boxId') || '';
    if (GuidClinic === clinicId && boxId == boxIdlocal) {
      handleStopTimer();
      setPatientArrived(true);
      setColor('red');
    }
  }

  const handleStopTimer = () => {
    setIsRunning(false);
  };

  return (
    <>
      <div
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: color,
          borderRadius: '50% 0 0 0',
        }}
      />
    </>
  );
};

export default TimerComponent;
