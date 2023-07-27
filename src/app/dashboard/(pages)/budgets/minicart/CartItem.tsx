import { CartItem } from '@interface/product';
import { Flex } from 'components/Layouts/Layouts';

import { useCartStore } from '../stores/userCartStore';

interface Props {
  product: CartItem;
}

export default function CartItem({ product }: Props) {
  const removeFromCart = useCartStore(state => state.removeFromCart);

  return (
    <li className="text-hg-black">
      <Flex layout="row-left">
        {/*         <div className="relative h-[40px] w-[40px]">
          <Image
            src="/images/budget/promoCodeBg.jpg"
            alt={product.title}
            fill={true}
            className="border border-hg-darkMalva"
          />
        </div> */}

        <span className="font-bold flex-1">{product.title}</span>
        <span className="font-bold"> - {product.price}€</span>
        <button
          title="Remove Item"
          className="text-red-500 hover:text-red-600 ml-4"
          onClick={() => removeFromCart(product)}
        >
          Quitar
        </button>
      </Flex>
    </li>
  );
}
