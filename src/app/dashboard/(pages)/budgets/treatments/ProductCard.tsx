import { useState } from 'react';
import { Product } from '@interface/product';
import { Button } from 'components/Buttons/Buttons';
import { Flex } from 'components/Layouts/Layouts';
import Image from 'next/image';

import { useCartStore } from '../stores/userCartStore';

const DEFAULT_IMG_SRC = '/images/product/holaglowProduct.png?1';
interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [imgSrc, setImgSrc] = useState(
    `/images/product/${product.flowwwId}/${product.flowwwId}.png`
  );
  const addToCart = useCartStore(state => state.addItemToCart);
  const setHighlightProduct = useCartStore(state => state.setHighlightProduct);

  return (
    <Flex
      layout="col-left"
      className="border border-hg-darkMalva bg-white text-hg-darkMalva rounded-lg overflow-hidden cursor-pointer"
      onClick={() => setHighlightProduct(product)}
    >
      <div className="w-full aspect-[4/3] relative shrink-0">
        <Image
          src={imgSrc}
          alt={product.title}
          fill={true}
          className="object-cover"
          onError={() => setImgSrc(DEFAULT_IMG_SRC)}
        />
      </div>
      <Flex
        layout="col-left"
        className="border-t border-hg-darkMalva p-4 text-left w-full h-full"
      >
        <h2 className="font-semibold">{product.title}</h2>
        <p className="text-hg-lightMalva text-sm mb-3">{product.description}</p>
        <p className="text-xl text-hg-black font-semibold mb-3">
          {product.price.toFixed(2)}€
        </p>
        <Button
          style="primary"
          type="button"
          onClick={e => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="px-4 w-full mt-auto"
        >
          Seleccionar
        </Button>
      </Flex>
    </Flex>
  );
}
