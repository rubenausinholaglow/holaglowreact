import Bugsnag from '@bugsnag/js';

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
      const url = `${process.env.NEXT_PUBLIC_DERMA_AUTH_API}Authenticator/Derma?phoneNumber=${pin}`;
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
}
