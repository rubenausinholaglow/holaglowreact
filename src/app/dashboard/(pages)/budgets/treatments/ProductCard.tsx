import { Product } from '@interface/product';
import { Button } from 'components/Buttons/Buttons';
import { Flex } from 'components/Layouts/Layouts';
import Image from 'next/image';

import { useCartStore } from '../stores/userCartStore';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore(state => state.addItemToCart);
  return (
    <Flex
      layout="col-left"
      className="border border-hg-darkMalva rounded-lg overflow-hidden"
    >
      <div className="w-full aspect-[4/3] relative shrink-0">
        <Image
          src="/images/budget/promoCodeBg.jpg"
          alt={product.title}
          fill={true}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <Flex
        layout="col-left"
        className="border-t border-hg-darkMalva p-4 text-left w-full h-full"
      >
        <h2 className="font-semibold">{product.title}</h2>
        <p className="text-hg-darkMalva text-sm mb-3">{product.description}</p>
        <p className="text-xl font-semibold mb-3">
          {product.price.toFixed(2)}€
        </p>
        <Button
          style="primary"
          type="button"
          onClick={() => addToCart(product)}
          className="px-4 w-full mt-auto"
        >
          Añadir Producto
        </Button>
      </Flex>
    </Flex>
  );
}
