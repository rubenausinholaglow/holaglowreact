import React, { useEffect, useState } from 'react';

interface TimerProps {
  initialColor: string;
}

export const TimerComponent: React.FC<TimerProps> = ({ initialColor }) => {
  const [color, setColor] = useState(initialColor);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const updateColorAndTime = () => {
      if (isRunning) {
        const currentTimeStamp = new Date().getTime();
        const totalTime = currentTimeStamp - startTime;

        setCurrentTime(totalTime);

        const fifteenMinutes = 15 * 60 * 1000;
        const twentyFiveMinutes = 25 * 60 * 1000;

        if (totalTime >= twentyFiveMinutes) {
          setColor('red');
        } else if (totalTime >= fifteenMinutes) {
          setColor('yellow');
        } else {
          setColor('green');
        }
      }
    };

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
      <div>{formatTime(currentTime)}</div>
      <button onClick={handleStartTimer} disabled={isRunning}>
        Start Timer
      </button>
      <button onClick={handleStopTimer} disabled={!isRunning}>
        Stop Timer
      </button>
    </>
  );
};

export default TimerComponent;
