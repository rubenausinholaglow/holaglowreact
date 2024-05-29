import { CartItem } from '@interface/product';
import { fetchProduct } from '@utils/fetch';
import ROUTES from '@utils/routes';

export async function selectDermaProduct({
  index,
  addItemToCart,
  router,
}: {
  index: number;
  addItemToCart: (Item: CartItem) => void;
  router: any;
}) {
  let productId = '';
  switch (index) {
    case 0:
      productId = process.env.NEXT_PUBLIC_DERMA_ONE_PURCHASE_ID!;
      break;
    case 1:
      productId = process.env.NEXT_PUBLIC_DERMA_ONE_PURCHASE_ID!;
      break;
    case 2:
      productId = process.env.NEXT_PUBLIC_DERMA_ONLY_RECEIPT_ID!;
      break;
  }
  const productDetails = await fetchProduct(productId, false, true);
  addItemToCart(productDetails as CartItem);
  router.push(ROUTES.derma.multistep.payment);
}
