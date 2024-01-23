'use client';
import { useEffect, useState } from 'react';
import TextInputField from '@dashboardComponents/TextInputField';
import { LoginResponse, UserLogin } from '@interface/Login';
import AuthenticationService from '@services/AuthenticationService';
import { HOLAGLOW_COLORS } from '@utils/colors';
import useRoutes from '@utils/useRoutes';
import { useToken } from 'app/crm/utils/token';
import { SvgHolaglow, SvgSpinner } from 'app/icons/Icons';
import { useSessionStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

export default function AuthenticationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const ROUTES = useRoutes();
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [errorEmail, setErrorEmail] = useState<string | undefined>('');
  const [isHydrated, setIsHydrated] = useState(false);
  const { setUserLoginResponse } = useSessionStore(state => state);
  const { isValidToken, clearUserLoginResponse } = useToken();

  useEffect(() => {
    if (!isValidToken()) {
      clearUserLoginResponse();
      setIsHydrated(true);
    } else {
      router.push(ROUTES.crm.menu);
    }
  }, []);

  const handleEmailChange = (event: any) => {
    const emailValue = event.target.value.trim();
    setErrorEmail(isValidEmailFormat(emailValue) ? '' : 'Email no válido');
    setEmail(emailValue);
  };
  const handleChangePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const login = async () => {
    setIsLoading(true);
    if (!userDataIsCorrect()) {
      handleErrorMessage('Datos Incorrectos');
      return;
    }

    const userLogin: UserLogin = {
      email: email,
      password: password,
    };

    await AuthenticationService.userLogin(userLogin).then(async data => {
      if (data.token != '') {
        const userLoginResponse: LoginResponse = {
          token: data.token,
          agentId: data.agentId,
          refreshToken: data.refreshToken,
          refreshTokenExpiryTime: data.refreshTokenExpiryTime,
        };
        setUserLoginResponse(userLoginResponse);

        setIsLoading(false);
        router.push(ROUTES.crm.menu);
      } else {
        setIsLoading(false);
        handleErrorMessage('Login Incorrecto');
        setEmail('');
        setPassword('');
      }
    });
  };

  function handleErrorMessage(error: string): void {
    setIsLoading(false);
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage(undefined);
    }, 3000);
  }

  function userDataIsCorrect(): boolean {
    const isValidEmail = isValidEmailFormat(email);
    const isValidPassword = !!password.trim();

    return isValidEmail && isValidPassword;
  }

  function isValidEmailFormat(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  if (!isHydrated)
    return (
      <Flex className="items-center justify-center flex-col p-4  h-[800px]">
        <SvgSpinner />
      </Flex>
    );
  else
    return (
      <Flex className="items-center justify-center flex-col p-4 h-[800px]">
        <div className="flex mb-4">
          <SvgHolaglow
            fill={HOLAGLOW_COLORS['secondary']}
            className="h-[24px] lg:h-[32px] w-[98px] lg:w-[130px]"
          />
          <p className={`ml-4 font-bold text-xl text-hg-secondary`}>CRM</p>
        </div>

        <div className="mb-4">
          <TextInputField
            placeholder="Email"
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            hasNoValidation
            error={errorEmail}
          />
        </div>
        <div className="mb-4">
          <TextInputField
            label="Contraseña"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handleChangePassword}
            hasNoValidation
            style={false}
          />
        </div>
        <Button onClick={login} className="mb-4">
          {isLoading ? (
            <SvgSpinner className="w-full justify-center" />
          ) : (
            'Entrar'
          )}
        </Button>
        {errorMessage && (
          <p className="text-hg-error text-left text-sm ml-2 mt-2">
            {errorMessage}
          </p>
        )}
      </Flex>
    );
}
