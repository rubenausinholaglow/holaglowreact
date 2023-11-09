import React, { useEffect, useState } from 'react';
import { useMessageSocket } from '@components/useMessageSocket';
import { MessageType } from '@interface/messageSocket';

interface TimerProps {
  onColorChange: (color: string) => void;
}

export const TimerComponent: React.FC<TimerProps> = ({ onColorChange }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [patientArrived, setPatientArrived] = useState<boolean | null>(null);
  const messageSocket = useMessageSocket(state => state);

  useEffect(() => {
    const existMessagePatientArrived = messageSocket.messageSocket.filter(
      x => x.messageType == MessageType.PatientArrived
    );
    if (existMessagePatientArrived.length > 0) {
      const finalMessage = existMessagePatientArrived[0].message;
      const [, clinicId, boxId] = finalMessage.split('/');
      updateColor(clinicId, boxId);
      messageSocket.removeMessageSocket(existMessagePatientArrived[0]);
    }
  }, [messageSocket]);

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
            onColorChange('bg-red-500');
          } else if (totalTime >= fifteenMinutes) {
            onColorChange('bg-hg-primary');
          } else {
            onColorChange('bg-hg-tertiary');
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
      onColorChange('bg-red-500');
    }
  }

  const handleStopTimer = () => {
    setIsRunning(false);
  };

  return <></>;
};

export default TimerComponent;
