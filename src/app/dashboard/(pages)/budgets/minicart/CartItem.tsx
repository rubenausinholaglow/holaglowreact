import { CartItem } from '@interface/product';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgClose } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

import { useCartStore } from '../stores/userCartStore';

interface Props {
  product: CartItem;
}

export default function CartItem({ product }: Props) {
  const removeFromCart = useCartStore(state => state.removeFromCart);

  return (
    <li className="text-hg-black">
      <Flex layout="row-left">
        <span className="font-semibold mr-1">{product.title}</span>
        <span className="font-semibold">{`- ${product.price}€`}</span>
        <button title="Remove Item" onClick={() => removeFromCart(product)}>
          <SvgClose
            height={20}
            width={20}
            fill={HOLAGLOW_COLORS['darkMalva']}
            className="ml-2"
          />
        </button>
      </Flex>
    </li>
  );
}
