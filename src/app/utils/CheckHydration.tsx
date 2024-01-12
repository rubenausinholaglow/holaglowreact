'use client';

import { ReactNode, useEffect, useState } from 'react';

const CheckHydration = ({ children }: { children: ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? children : null;
};

export default CheckHydration;
