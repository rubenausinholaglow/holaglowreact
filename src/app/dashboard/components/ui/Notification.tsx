import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      setVisible(false);
    };
  }, [message]);

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } transition-opacity duration-300 bg-gray-800 text-white px-4 py-2 rounded-lg`}
      style={{ zIndex: 9999 }}
    >
      <p>{message}</p>
    </div>
  );
};

export default Notification;
