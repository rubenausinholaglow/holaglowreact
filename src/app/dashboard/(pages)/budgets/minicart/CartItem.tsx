import { CartItem } from '@interface/product';
import { Flex } from 'components/Layouts/Layouts';
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
        {/*         <div className="relative h-[40px] w-[40px]">
          <Image
            src="/images/budget/promoCodeBg.jpg"
            alt={product.title}
            fill={true}
            className="border border-hg-darkMalva"
          />
        </div> */}

        <span className="font-bold mr-1">{product.title}</span>
        <span className="font-bold">{`- ${product.price}€`}</span>
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
