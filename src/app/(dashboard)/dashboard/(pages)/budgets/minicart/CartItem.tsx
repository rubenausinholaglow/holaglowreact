import { SvgClose } from 'app/icons/Icons';
import { CartItem } from 'app/types/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Flex } from 'designSystem/Layouts/Layouts';

import { useCartStore } from '../stores/userCartStore';

interface Props {
  product: CartItem;
}

export default function CartItem({ product }: Props) {
  const removeFromCart = useCartStore(state => state.removeFromCart);

  return (
    <li className="text-hg-black">
      <Flex layout="row-left" className="text-md">
        <span className="font-semibold mr-1">{product.title}</span>
        <span className="font-semibold">{`- ${product.price}€`}</span>
        <button title="Remove Item" onClick={() => removeFromCart(product)}>
          <SvgClose
            height={20}
            width={20}
            fill={HOLAGLOW_COLORS['tertiary']}
            className="ml-2"
          />
        </button>
      </Flex>
    </li>
  );
}
