export default class ProductService {
  static getProductsUrl(): string {
    let url = process.env.NEXT_PUBLIC_PRODUCTS_API;
    if (
      window &&
      window.location &&
      window.location.href &&
      window.location.href.includes('derma')
    )
      url = process.env.NEXT_PUBLIC_DERMAPRODUCTS_API;
    return url!;
  }

  static async getAllProducts() {
    try {
      const url = `${ProductService.getProductsUrl()}Product`;

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
      const url = `${ProductService.getProductsUrl()}DashboardProducts`;

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
      const url = `${ProductService.getProductsUrl()}Product/${id}`;
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
