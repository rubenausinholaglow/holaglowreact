'use client';
import { useState } from 'react';
import TextInputField from '@dashboardComponents/TextInputField';
import { userLogin } from '@interface/Login';
import AuthenticationService from '@services/AuthenticationService';
import useRoutes from '@utils/useRoutes';
import { SvgSpinner } from 'app/icons/Icons';
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

  const handleChangeUsername = (event: any) => {
    setUsername(event.target.value);
  };
  const handleChangePassword = (event: any) => {
    setPassword(event.target.value);
  };
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const login = async () => {
    setIsLoading(true);
    const userLogin: userLogin = {
      user: username,
      password: password,
    };

    await AuthenticationService.userLogin(userLogin).then(async data => {
      if (data.token != '') {
        // todo crear mensaje de alerta
        localStorage.setItem('token', data.token);
        localStorage.setItem(
          'refreshTokenExpiryTime',
          data.refreshTokenExpiryTime
        );
        localStorage.setItem('agentId', data.agentId);
        //navigate('/dashboard');
        alert('logeado!');
        setIsLoading(false);
        router.push(ROUTES.crm.menu);
      } else {
        //Todo create error message
        alert('Login incorrecto');
      }
    });
  };

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
          <span className="text-sm text-gray-600 ml-2">Recuerdame</span>
        </label>
      </div>
      <Button onClick={login}>
        {isLoading ? <SvgSpinner className="w-full justify-center" /> : 'Login'}
      </Button>
    </Flex>
  );
}
