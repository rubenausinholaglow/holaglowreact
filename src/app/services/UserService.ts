import Bugsnag from '@bugsnag/js';
import { DermaQuestionsResponse } from '@interface/derma/dermaquestions';
import { User } from 'app/types/appointment';
import { Client, ClientUpdate } from 'app/types/client';

export default class UserService {
  static getContactsUrl(isDerma: boolean): string {
    let url = process.env.NEXT_PUBLIC_CONTACTS_API;
    if (
      window.location.href.includes('derma.') ||
      window.location.href.includes('isDerma') ||
      isDerma
    )
      url = process.env.NEXT_PUBLIC_DERMACONTACTS_API;
    return url!;
  }

  static async checkUser(email = ''): Promise<User | undefined> {
    try {
      const url = `${UserService.getContactsUrl(
        false
      )}Contact/V2/Search?search=${email}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return undefined;
      }
    } catch (err) {
      return undefined;
    }
  }

  static async getSimulationReady(id: string, clinicId: string) {
    try {
      const res = await fetch(
        `${UserService.getContactsUrl(
          false
        )}Crisalix/SimulationReady?id=${id}&clinic=${clinicId}`,
        {
          method: 'GET',
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return null;
      }
    } catch (err) {
      return false;
    }
  }
  static async createCrisalixUser(userId: string, clinicId: string) {
    try {
      const res = await fetch(
        `${UserService.getContactsUrl(
          false
        )}Crisalix/Patients?userId=${userId}&clinicId=${clinicId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  }

  static async registerUser(
    formData: Client,
    isDerma: boolean
  ): Promise<User | undefined> {
    try {
      const res = await fetch(`${UserService.getContactsUrl(isDerma)}Contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return undefined;
      }
    } catch (err) {
      return undefined;
    }
  }

  static async updateUser(formData: ClientUpdate, isDerma: boolean) {
    try {
      const res = await fetch(`${UserService.getContactsUrl(isDerma)}Contact`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return undefined;
      }
    } catch (err: any) {
      Bugsnag.notify(err);
    }
  }

  static async getDermaQuestions(
    id: string
  ): Promise<DermaQuestionsResponse | undefined> {
    try {
      const url = `${UserService.getContactsUrl(true)}Derma?userId=${id}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return undefined;
      }
    } catch (err) {
      return undefined;
    }
  }

  static async getUserById(id: string, isDerma: boolean) {
    try {
      const url = `${UserService.getContactsUrl(isDerma)}Contact/${id}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return '';
      }
    } catch (err) {
      return '';
    }
  }

  static async getAccessToken(token: string): Promise<string> {
    try {
      const url = `${process.env.NEXT_PUBLIC_CONTACTS_API}Mediquo/UserAccessToken?userToken=${token}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.text();
        return data;
      } else {
        Bugsnag.notify('Error getAccessToken' + res);
        return '';
      }
    } catch (err) {
      Bugsnag.notify('Error getAccessToken' + err);
      return '';
    }
  }

  static async getAllUsers(token: string): Promise<User[] | undefined> {
    try {
      const url = `${process.env.NEXT_PUBLIC_CONTACTS_API}Contact/All`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return undefined;
      }
    } catch (err) {
      return undefined;
    }
  }
}
