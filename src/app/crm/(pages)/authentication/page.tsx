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
      handleErrorMessage('Datos Incorrectos');
      return;
    }

    const userLogin: UserLogin = {
      email: email,
      password: password,
    };

    const userLoginResponse: LoginResponse = {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImRmZTA1OGY3LTM1MjItNDJjOS1iYzE0LWExYTM4Yjk5MzI1OSIsInN1YiI6InJ1YmVuLmF1c2luQGhvbGFnbG93LmNvbSIsImVtYWlsIjoicnViZW4uYXVzaW5AaG9sYWdsb3cuY29tIiwianRpIjoiM2RhOWQ1ZGUtYjcyMi00MjQwLTk4ZTUtYjQ5MThhNjRlNmM5IiwibmJmIjoxNzA5NzE0MTgwLCJleHAiOjE3MDk3NTAxODAsImlhdCI6MTcwOTcxNDE4MCwiaXNzIjoiSG9sYWdsb3ciLCJhdWQiOiJDUk0ifQ.qYd8NF3crXEe6zGqp86kFKPuQ_UsBu-LpAQpzYHqzfc",
      refreshToken: "jGqK5Lo6XaZW+jnjU+KsAL8C+HhZR+piT/PAFK0FBdQcEvluBYAgDiekTZ+uw36F6D2/uxVCK5yzkEXytdAowA==",
      refreshTokenExpiryTime: "2024-03-06T18:36:20.7269283Z",
    };
    setUserLoginResponse(userLoginResponse);
    setIsLoading(false);
    router.push(ROUTES.crm.menu);

    /*await AuthenticationService.userLogin(userLogin).then(async data => {
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
    });*/
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
