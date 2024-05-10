import Bugsnag from '@bugsnag/js';
import { DermaQuestionsResponse } from '@interface/derma/dermaquestions';
import { User } from 'app/types/appointment';
import { Client, ClientUpdate } from 'app/types/client';

export default class UserService {
  static getContactsUrl(): string {
    let url = process.env.NEXT_PUBLIC_CONTACTS_API;
    if (
      window.location.href.includes('derma.') ||
      window.location.href.includes('isDerma')
    )
      url = process.env.NEXT_PUBLIC_DERMACONTACTS_API;
    return url!;
  }

  static async checkUser(email = ''): Promise<User | undefined> {
    try {
      const url = `${UserService.getContactsUrl()}Contact/V2/Search?search=${email}`;
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
        `${UserService.getContactsUrl()}Crisalix/SimulationReady?id=${id}&clinic=${clinicId}`,
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
        `${UserService.getContactsUrl()}Crisalix/Patients?userId=${userId}&clinicId=${clinicId}`,
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

  static async registerUser(formData: Client): Promise<User | undefined> {
    try {
      const res = await fetch(`${UserService.getContactsUrl()}Contact`, {
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

  static async updateUser(formData: ClientUpdate) {
    try {
      const res = await fetch(`${UserService.getContactsUrl()}Contact`, {
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
      const url = `${UserService.getContactsUrl()}Derma?userId=${id}`;
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

  static async getUserById(id: string) {
    try {
      const url = `${UserService.getContactsUrl()}Contact/${id}`;
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
