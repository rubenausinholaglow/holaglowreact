import Bugsnag from '@bugsnag/js';

export default class AuthenticationService {
  static getAuthenticationUrl(): string {
    let url = process.env.NEXT_PUBLIC_AUTHENTICATION_API;
    if (
      window.location.href.includes('derma') ||
      window.location.href.includes('isDerma')
    )
      url = process.env.NEXT_PUBLIC_DERMA_AUTH_API;
    return url!;
  }

  static async isValidLoginDerma(userId: string): Promise<boolean> {
    try {
      const url = `${process.env.NEXT_PUBLIC_DERMA_AUTH_API}Authenticator/Derma/Multistep?userId=${userId}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data === true;
      } else {
        Bugsnag.notify('Error isValidLoginDerma' + res);
        return false;
      }
    } catch (err) {
      Bugsnag.notify('Error isValidLoginDerma' + err);
      return false;
    }
  }
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
      const url = `${AuthenticationService.getAuthenticationUrl()}IsValidToken?token=${token}`;
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
