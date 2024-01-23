import { LoginResponse } from '@interface/Login';
import { useSessionStore } from 'app/stores/globalStore';

export const useToken = () => {
  const { setUserLoginResponse, userLoginResponse } = useSessionStore(state => state);

  const isValidToken = () => userLoginResponse && !isTokenExpired();

  const isTokenExpired = () => {
    const refreshTokenExpiryTimestamp = getRefreshTokenExpiryTimestamp();
    const currentTimestamp = Date.now();
    return refreshTokenExpiryTimestamp <= currentTimestamp;
  };

  const getRefreshTokenExpiryTimestamp = () =>
    new Date(userLoginResponse!.refreshTokenExpiryTime).getTime();

  const clearUserLoginResponse = () => setUserLoginResponse(undefined);

  return {
    isValidToken,
    isTokenExpired,
    getRefreshTokenExpiryTimestamp,
    clearUserLoginResponse,
  };
};
