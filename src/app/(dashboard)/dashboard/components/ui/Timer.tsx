import React, { useEffect, useState } from 'react';
import { useMessageSocket } from 'app/(dashboard)/dashboard/components/useMessageSocket';
import { MessageType } from 'app/types/messageSocket';

interface TimerProps {
  onColorChange: (color: string) => void;
}

export const TimerComponent: React.FC<TimerProps> = ({ onColorChange }) => {
  const [startTime, setStartTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [patientArrived, setPatientArrived] = useState<boolean | null>(null);
  const messageSocket = useMessageSocket(state => state);
  useEffect(() => {
    const existMessagePatientArrived: any = messageSocket.messageSocket.filter(
      x => x.messageType == MessageType.PatientArrived
    );
    if (existMessagePatientArrived.length > 0) {
      const finaldata = {
        ClinicId: existMessagePatientArrived[0].ClinicId,
        BoxId: existMessagePatientArrived[0].BoxId,
      };

      updateColor(finaldata.ClinicId, finaldata.BoxId);
      messageSocket.removeMessageSocket(existMessagePatientArrived[0]);
    }
  }, [messageSocket]);

  useEffect(() => {
    const updateColorAndTime = () => {
      if (isRunning) {
        const currentTimeStamp = new Date().getTime();
        const totalTime = currentTimeStamp - startTime;

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

  const handleStartTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setStartTime(new Date().getTime());
    }
  };

  function updateColor(clinicId: string, boxId: string) {
    handleStopTimer();
    setPatientArrived(true);
    onColorChange('bg-red-500');
  }

  const handleStopTimer = () => {
    setIsRunning(false);
  };

  return <></>;
};

export default TimerComponent;
