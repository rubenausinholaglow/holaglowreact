'use client';
import { ReactNode, useEffect, useState } from 'react';
import useRoutes from '@utils/useRoutes';
import { useToken } from 'app/crm/utils/token';
import { SvgSpinner } from 'app/icons/Icons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

interface LoginCheckerProps {
  children: ReactNode;
}

const LoginChecker: React.FC<LoginCheckerProps> = ({ children }) => {
  const router = useRouter();
  const ROUTES = useRoutes();
  const [isLoaded, setIsLoaded] = useState(false);
  const { isValidToken, clearUserLoginResponse } = useToken();

  useEffect(() => {
    if (!isValidToken()) {
      clearUserLoginResponse();
    } else {
      router.push(ROUTES.crm.menu);
    }
    setIsLoaded(true);
  }, []);

  if (isLoaded) return <>{children}</>;
  else
    return (
      <Flex className="items-center justify-center flex-col p-4  h-[800px]">
        <SvgSpinner className="w-full justify-center" />
      </Flex>
    );
};

export default LoginChecker;
