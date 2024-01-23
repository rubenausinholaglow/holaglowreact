'use client';
import { ReactNode, useEffect, useState } from 'react';
import useRoutes from '@utils/useRoutes';
import { useToken } from 'app/crm/utils/token';
import { SvgSpinner } from 'app/icons/Icons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

interface LoginCheckerProps {
  children: ReactNode;
  isLoginPage?: boolean;
}

const LoginChecker: React.FC<LoginCheckerProps> = ({
  children,
  isLoginPage = false,
}) => {
  const router = useRouter();
  const ROUTES = useRoutes();
  const [isLoaded, setIsLoaded] = useState(false);
  const { isValidToken, clearUserLoginResponse } = useToken();

  useEffect(() => {
    if (!isValidToken()) {
      clearUserLoginResponse();
      if (!isLoginPage) {
        router.push(ROUTES.crm.authentication);
        return;
      }
      setIsLoaded(true);
    } else {
      if (isLoginPage) {
        router.push(ROUTES.crm.menu);
        return;
      }
      setIsLoaded(true);
    }
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
