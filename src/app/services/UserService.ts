import { User } from 'app/types/appointment';
import { Client, ClientUpdate } from 'app/types/client';

export default class UserService {
  static async checkUser(email = ''): Promise<User | undefined> {
    try {
      const url = `${process.env.NEXT_PUBLIC_CONTACTS_API}Contact/V2/Search?search=${email}`;
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
        `${process.env.NEXT_PUBLIC_CONTACTS_API}Crisalix/SimulationReady?id=${id}&clinic=${clinicId}`,
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
        `${process.env.NEXT_PUBLIC_CONTACTS_API}Crisalix/Patients?userId=${userId}&clinicId=${clinicId}`,
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CONTACTS_API}Contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CONTACTS_API}Contact`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
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
      const url = `${process.env.NEXT_PUBLIC_CONTACTS_API}Contact/${id}`;
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

  static async getAllUsers(token : string) : Promise<User[] | undefined> {
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
