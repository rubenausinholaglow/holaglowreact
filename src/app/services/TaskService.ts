import { User } from 'app/types/appointment';

export default class TaskService {

  static async getAllTasks(token : string) : Promise<any[] | undefined> {
    try {
      const url = `${process.env.NEXT_PUBLIC_CONTACTS_API}Tasks/All`;
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