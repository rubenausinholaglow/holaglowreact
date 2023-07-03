import { Client } from '../interface/client';

export default class Auth0 {

  static async checkUser(email = '') {
      try {
          const url = `${process.env.NEXT_PUBLIC_API_LOGIN}?search=${email}`
          const res = await fetch(url);
          if (res.ok) {
              const data = await res.json();
              return data;
          } else {
              return '';
          }
      } catch (err) { return ''; }
  }

  static async registerUser(formData : Client) {
    try {
          const res = await fetch(process.env.NEXT_PUBLIC_API_NEWUSER!, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
          },
            body: JSON.stringify(formData),
          });
          if (res.ok) {
            return true;
          } else { return false; }
        } catch (err) { return false; }
  } 
}