import Bugsnag from '@bugsnag/js';

export default class AuthenticationService {
    static async getAuthenticationNumber(phoneNumber: string): Promise<boolean> {
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

    static async getAccessToken(token: string): Promise<string> {
        try {
            const url = `${process.env.NEXT_PUBLIC_CONTACTS_API}TwoAuthentication?userToken=${token}`;
            const res = await fetch(url);
            if (res.ok) {
                
                const data = await res.text();
                return data;
            } else {
                Bugsnag.notify('Error getAccessToken' + res);
            return "";
            }
        } catch (err) {
            Bugsnag.notify('Error getAccessToken' + err);
            return "";
        }
    }
}
