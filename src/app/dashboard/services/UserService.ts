import { Client } from '../interface/client';

export default class UserService {
  static async checkUser(email = '') {
    try {
      const url = `${process.env.NEXT_PUBLIC_CONTACTS_API}Contact/V2/Search?search=${email}`;
      console.log(url);
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        return data;
      } else {
        return '';
      }
    } catch (err) {
      return '';
    }
  }

  static async registerUser(formData: Client) {
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
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
}
