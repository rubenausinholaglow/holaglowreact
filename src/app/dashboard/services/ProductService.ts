export default class ProductService {
  static async getAllProducts() {
    try {
      const url = `${process.env.NEXT_PUBLIC_PRODUCTS_API}Product`;

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
  static async getDashboardProducts() {
    try {
      const url = `${process.env.NEXT_PUBLIC_PRODUCTS_API}DashboardProducts`;

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

  static async getProduct(id: string) {
    try {
      const url = `${process.env.NEXT_PUBLIC_PRODUCTS_API}Product/${id}`;
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
}
