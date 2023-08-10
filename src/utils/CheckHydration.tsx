import { ReactNode, useEffect, useState } from 'react';

const CheckHydration = ({ children }: { children: ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <>{children}</> : null}</>;
};

export default CheckHydration;
