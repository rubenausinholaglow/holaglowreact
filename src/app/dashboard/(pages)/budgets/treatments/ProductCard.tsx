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
  const setHighlightProduct = useCartStore(state => state.setHighlightProduct);

  return (
    <Flex
      layout="col-left"
      className="border border-hg-darkMalva bg-white text-hg-darkMalva rounded-lg overflow-hidden"
    >
      <div className="w-full aspect-[4/3] relative shrink-0">
        <Flex layout="row-center" className=" cursor-pointer absolute z-10">
          <span
            className="bg-hg-lime text-hg-darkMalva inset-0 w-[30px] h-[30px] rounded-full m-2 font-semibold text-xl"
            onClick={() => setHighlightProduct(product)}
          >
            +
          </span>
        </Flex>
        <Image
          src="/images/budget/promoCodeBg.jpg"
          alt={product.title}
          fill={true}
          className="object-cover"
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
          onClick={() => addToCart(product)}
          className="px-4 w-full mt-auto"
        >
          Añadir Producto
        </Button>
      </Flex>
    </Flex>
  );
}
