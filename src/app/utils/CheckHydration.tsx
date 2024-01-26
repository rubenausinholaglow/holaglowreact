'use client';

import { ReactNode, useEffect, useState } from 'react';

const CheckHydration = ({ children }: { children: ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    console.log('is not hydrated!');

    return <></>;
  }

  console.log('is hydrated!');
  return children;
};

export default CheckHydration;
