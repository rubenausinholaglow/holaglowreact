export default class promoService {
  static async getPromos() {
    try {
      const url = `${process.env.NEXT_PUBLIC_PRODUCTS_API}promos/active`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();

        return data;
      } else {
        return '';
      }
    } catch (err) {
      return err;
    }
  }
}
