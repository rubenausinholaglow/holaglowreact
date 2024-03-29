import { Product } from "@interface/product";

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

  static async getAllProducts({ isDerma = false, getAgendaProducts = false }: { isDerma?: boolean, getAgendaProducts? : boolean }) : Promise<Product[]> {
    const urlApi = isDerma
      ? process.env.NEXT_PUBLIC_DERMAPRODUCTS_API
      : process.env.NEXT_PUBLIC_PRODUCTS_API || '';

    try {
      const url = getAgendaProducts ? `${urlApi}Product?getAgendaProducts=true` : `${urlApi}Product`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return [];
      }
    } catch (err) {
      return [];
    }
  }
  static async getDashboardProducts(getUpgrades = false) {
    try {
      let url = `${process.env.NEXT_PUBLIC_PRODUCTS_API}DashboardProducts`;
      url = getUpgrades ? url + "?getUpgrades=true" : url
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

  static async getProduct(id: string, isDashboard: boolean, isDerma: boolean) {
    const apiUrl = isDerma
      ? process.env.NEXT_PUBLIC_DERMAPRODUCTS_API
      : process.env.NEXT_PUBLIC_PRODUCTS_API || '';

    try {
      const url = `${apiUrl}Product/${id}?Dashboard=${isDashboard.toString()}`;

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
