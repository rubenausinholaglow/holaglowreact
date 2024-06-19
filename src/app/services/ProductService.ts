import { ProductClinics } from '@interface/clinic';
import { Product } from '@interface/product';

export default class ProductService {
  static async getAllProducts({
    isDerma = false,
    getAgendaProducts = false,
  }: {
    isDerma?: boolean;
    getAgendaProducts?: boolean;
  }): Promise<Product[]> {
    const urlApi = isDerma
      ? process.env.NEXT_PUBLIC_DERMAPRODUCTS_API
      : process.env.NEXT_PUBLIC_PRODUCTS_API || '';

    try {
      const url = getAgendaProducts
        ? `${urlApi}Product?getAgendaProducts=true`
        : `${urlApi}Product`;
      const res = await fetch(url, {cache : 'no-store'});
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
  static async getDashboardProducts(
    clinicId: string,
    getUpgrades = false
  ): Promise<Product[]> {
    try {
      let url = `${process.env.NEXT_PUBLIC_PRODUCTS_API}DashboardProducts`;
      url = getUpgrades ? url + '?getUpgrades=true' : url;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const products = data
          .map((product: Product) => ({
            ...product,
            visibility: true,
          }))
          .filter(
            (product: Product) =>
              product.clinicDetail.some(
                (clinicDetail: ProductClinics) =>
                  clinicDetail.clinic.id.toUpperCase() ===
                  clinicId.toUpperCase()
              ) || product.clinicDetail.length == 0
          )
          .sort((a: any, b: any) => (a.price > b.price ? 1 : -1));

        return products;
      } else {
        return [];
      }
    } catch (err) {
      return [];
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
