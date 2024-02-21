export default class ProductService {
  static getProductsUrl(): string {
    let url = process.env.NEXT_PUBLIC_PRODUCTS_API;
    if (
      window &&
      window.location &&
      window.location.href &&
      window.location.href.includes('derma')
    ) {
      url = process.env.NEXT_PUBLIC_DERMAPRODUCTS_API;
    }

    return url || '';
  }

  static async getAllProducts({ isDerma = false }: { isDerma?: boolean }) {
    const url = isDerma
      ? process.env.NEXT_PUBLIC_DERMAPRODUCTS_API
      : process.env.NEXT_PUBLIC_PRODUCTS_API || '';

    try {
      const res = await fetch(`${url}/Product`);
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
