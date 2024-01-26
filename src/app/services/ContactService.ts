export default class ContactService {
  static ContactDetail(id: string): string {
    return `${process.env.NEXT_PUBLIC_CONTACTS_API}Contact/${id}`;
  }

  static async ContactsAll(token: string): Promise<any> {
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