export default class ContactService {
  static ContactDetail(id: string): string {
    return `${process.env.NEXT_PUBLIC_CONTACTS_API}Contact/${id}`;
  }

  static ContactsAll() : string {
    return `${process.env.NEXT_PUBLIC_CONTACTS_API}Contact/All`;
  }
}
