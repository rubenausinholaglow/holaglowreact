export default class promoService {
  static async getPromos() {
    try {
      console.log(`${process.env.NEXT_PUBLIC_PRODUCTS_API}promos/active`);

      const url = `${process.env.NEXT_PUBLIC_PRODUCTS_API}promos/active`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        console.log(data);

        return data;
      } else {
        return '';
      }
    } catch (err) {
      return err;
    }
  }
}
