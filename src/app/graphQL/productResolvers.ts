import { Product } from "@interface/product";


const products: Product[] = [
  // Dummy data, replace with actual data fetching logic
];

const productResolvers = {
  Query: {
    products: (_: any, { name }: { name: string }) => {
      if (name) {
        return products.filter(product => product.title === name);
      } else {
        return products;
      }
    },
  },
};

export default productResolvers;
