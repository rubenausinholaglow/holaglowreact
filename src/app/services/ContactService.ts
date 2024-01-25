export default class ContactService {
  static async ContactDetail(id: string) : Promise<any> {
    try {
      const url = `${process.env.NEXT_PUBLIC_CONTACTS_API}Contact/${id}`;
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
}
