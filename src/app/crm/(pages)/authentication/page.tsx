'use client';
import { useState } from 'react';
import { LoginResponse, UserLogin } from '@interface/Login';
import AuthenticationService from '@services/AuthenticationService';
import useRoutes from '@utils/useRoutes';
import { validateEmail } from '@utils/validators';
import { useSessionStore } from 'app/stores/globalStore';
import { useRouter } from 'next/navigation';

import AuthenticationComponent from './authentication';

export default function AuthenticationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const ROUTES = useRoutes();
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [errorEmail, setErrorEmail] = useState<string | undefined>('');
  const { setUserLoginResponse } = useSessionStore(state => state);

  const handleEmailChange = (event: any) => {
    const emailValue = event.target.value.trim();
    setErrorEmail(validateEmail(emailValue) ? '' : 'Email no válido');
    setEmail(emailValue);
  };
  const handleChangePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    if (!userDataIsCorrect()) {
      handleErrorMessage('Datos  Incorrectos');
      return;
    }

    const userLogin: UserLogin = {
      email: email,
      password: password,
    };

    await AuthenticationService.userLogin(userLogin).then(async data => {
      if (data.token !== '') {
        const userLoginResponse: LoginResponse = {
          token: data.token,
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
    const isValidEmail = validateEmail(email);
    const isValidPassword = !!password.trim();

    return isValidEmail && isValidPassword;
  }

  return (
    <>
      <AuthenticationComponent
        email={email}
        password={password}
        handleEmailChange={handleEmailChange}
        handleChangePassword={handleChangePassword}
        isLoading={isLoading}
        handleLogin={handleLogin}
        errorMessage={errorMessage}
        errorEmail={errorEmail}
      />
    </>
  );
}
