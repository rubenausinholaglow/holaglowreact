'use client';
import { useEffect, useState } from 'react';
import TextInputField from '@dashboardComponents/TextInputField';
import { LoginResponse, UserLogin } from '@interface/Login';
import AuthenticationService from '@services/AuthenticationService';
import useRoutes from '@utils/useRoutes';
import { useToken } from 'app/crm/utils/token';
import { SvgSpinner } from 'app/icons/Icons';
import { useSessionStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

export default function AuthenticationPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const ROUTES = useRoutes();
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
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

  const handleChangeUsername = (event: any) => {
    setUsername(event.target.value);
  };
  const handleChangePassword = (event: any) => {
    setPassword(event.target.value);
  };
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const login = async () => {
    setIsLoading(true);
    const userLogin: UserLogin = {
      user: username,
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
        setErrorMessage('Login Incorrecto');
        setTimeout(() => {
          setErrorMessage(undefined);
        }, 3000);
      }
    });
  };

  if (!isHydrated)
    return (
      <Flex className="items-center justify-center flex-col p-4  h-[800px]">
        <SvgSpinner />
      </Flex>
    );
  else
    return (
      <Flex className="items-center justify-center flex-col p-4  h-[800px]">
        <div className="mb-4">Login CRM</div>
        <div className="mb-4">
          <TextInputField
            placeholder="Email"
            label="Email"
            type="email"
            value={username}
            onChange={handleChangeUsername}
            hasNoValidation
          />
        </div>
        <div className="mb-4">
          <TextInputField
            label="Password"
            type="password"
            value={password}
            onChange={handleChangePassword}
            hasNoValidation
            style={false}
          />
        </div>
        <div
          className="flex items-center ml-[-1rem] mb-4"
          onClick={handleSetRememberMe}
        >
          <label
            htmlFor="rememberMe"
            className="text-sm text-gray-600 cursor-pointer ml-2"
          >
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleSetRememberMe}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer transition-all duration-300 ease-in-out transform scale-110 hover:scale-125"
            />
            <span className="text-sm text-gray-600 ml-2">Recuérdame</span>
          </label>
        </div>
        <Button onClick={login} className="mb-4">
          {isLoading ? (
            <SvgSpinner className="w-full justify-center" />
          ) : (
            'Login'
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
