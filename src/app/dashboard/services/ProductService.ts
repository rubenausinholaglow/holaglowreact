export default class ProductService {
  
  static async getAllProducts() {
      try {
          const url = `${process.env.NEXT_PUBLIC_PRODUCTS_API}Product`
          const res = await fetch(url);
          console.log(res);
          if (res.ok) {
              const data = await res.json();
              return data;
          } else {
              return '';
          }
      } catch (err) { return err; }
  }
  
  static async getProduct(id : string) {
    try {
        const url = `${process.env.NEXT_PUBLIC_PRODUCTS_API}Product/${id}`
        console.log(url);
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            return '';
        }
    } catch (err) { return ''; }
} 
}