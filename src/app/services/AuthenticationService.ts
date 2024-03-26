import Bugsnag from '@bugsnag/js';
import { LoginResponse, UserLogin } from '@interface/Login';

export default class AuthenticationService {
  static async isValidLoginSupport24Hours(
    phoneNumber: string
  ): Promise<boolean> {
    try {
      const url = `${process.env.NEXT_PUBLIC_AUTHENTICATION_API}Authenticator?phoneNumber=${phoneNumber}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data === true;
      } else {
        Bugsnag.notify('Error getAuthenticationNumber' + res);
        return false;
      }
    } catch (err) {
      Bugsnag.notify('Error getAuthenticationNumber' + err);
      return false;
    }
  }

  static async isValidToken(token: string): Promise<boolean> {
    try {
      const url = `${process.env.NEXT_PUBLIC_AUTHENTICATION_API}IsValidToken?token=${token}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data === true;
      } else {
        Bugsnag.notify('Error getAuthenticationNumber' + res);
        return false;
      }
    } catch (err) {
      Bugsnag.notify('Error getAuthenticationNumber' + err);
      return false;
    }
  }

  static async isDermaValidPhone(phone: string): Promise<boolean> {
    try {
      const url = `${process.env.NEXT_PUBLIC_DERMA_AUTH_API}Authenticator/Derma?phoneNumber=${phone}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data === true;
      } else {
        Bugsnag.notify('Error getAuthenticationNumber' + res);
        return false;
      }
    } catch (err) {
      Bugsnag.notify('Error getAuthenticationNumber' + err);
      return false;
    }
  }

  static async isDermaValidPIN(pin: number): Promise<boolean> {
    try {
      const url = `${process.env.NEXT_PUBLIC_DERMA_AUTH_API}IsValidToken?token=${pin}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data === true;
      } else {
        Bugsnag.notify('Error getAuthenticationNumber' + res);
        return false;
      }
    } catch (err) {
      Bugsnag.notify('Error getAuthenticationNumber' + err);
      return false;
    }
  }
  static async userLogin(user: UserLogin): Promise<LoginResponse> {
    try {
      const url = `${process.env.NEXT_PUBLIC_AUTHENTICATION_API}Login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user.email, password: user.password }),
      });

      if (response.ok) {
        const data = await response.json();
        return data as LoginResponse;
      } else {
        Bugsnag.notify('Error userLogin' + response);
        return { token: '', refreshToken: '', refreshTokenExpiryTime: '' };
      }
    } catch (err) {
      Bugsnag.notify('Error userLogin' + err);
      return { token: '', refreshToken: '', refreshTokenExpiryTime: '' };
    }
  }
}
