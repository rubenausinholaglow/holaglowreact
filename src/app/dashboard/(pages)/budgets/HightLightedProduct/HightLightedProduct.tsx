import { useEffect, useState } from 'react';
import { emptyProduct, Product } from '@interface/product';
import ProductService from '@services/ProductService';
import { Button } from 'components/Buttons/Buttons';
import { Carousel } from 'components/Carousel/Carousel';
import { Flex } from 'components/Layouts/Layouts';
import { SvgClose, SvgSpinner } from 'icons/Icons';
import isEmpty from 'lodash/isEmpty';
import Image from 'next/image';
import { HOLAGLOW_COLORS } from 'utils/colors';

import { useCartStore } from '../stores/userCartStore';

const DEFAULT_IMG_SRC = '/images/product/holaglowProduct.png?1';

export default function HightLightedProduct() {
  const addToCart = useCartStore(state => state.addItemToCart);
  const setHighlightProduct = useCartStore(state => state.setHighlightProduct);
  const productHighlighted = useCartStore(state => state.productHighlighted);
  const professionals = useCartStore(state => state.professionals);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setProduct(null);
    setImgSrc(null);

    const fetchProduct = async () => {
      try {
        if (productHighlighted.id) {
          const data = await ProductService.getProduct(productHighlighted.id);

          setProduct(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [productHighlighted]);

  useEffect(() => {
    if (isEmpty(product)) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [product]);

  if (isEmpty(product)) {
    return <></>;
  }

  return (
    <>
      <SvgSpinner
        height={50}
        width={50}
        fill={HOLAGLOW_COLORS['lime']}
        className={`transition-all delay-1000 opacity-1 absolute top-1/2 left-1/2 -ml-[25px] -mt-[25px] ${
          !isLoading && 'opacity-0'
        }`}
      />
      <Flex
        layout="col-left"
        className={`transition-all delay-1000 opacity-0 p-6 text-left ${
          !isLoading && 'opacity-1'
        }`}
      >
        <Flex
          layout="col-center"
          className="transition-all justify-center cursor-pointer z-10 absolute bg-white rounded-full p-2 left-2 top-2 "
        >
          <SvgClose
            height={30}
            width={30}
            className=""
            onClick={() => setHighlightProduct(emptyProduct)}
          />
        </Flex>

        <div className="w-full aspect-[4/3] relative shrink-0 mb-4">
          <Image
            src={
              imgSrc
                ? imgSrc
                : `/images/product/${product.flowwwId}/${product.flowwwId}.png`
            }
            alt={product.title}
            fill={true}
            className="object-cover"
            onError={() => setImgSrc(DEFAULT_IMG_SRC)}
          />
        </div>
        <p className="font-semibold text-xl mb-4">
          {product.title} -{' '}
          <span className="text-xl text-hg-black font-semibold mb-3">
            {product.price.toFixed(2)}€
          </span>
        </p>
        <p className="mb-16">
          {product.description}
          {product?.detail}
        </p>
        {/* {product.durationMin > 0 && (
          <p className="text-hg-lightMalva text-xs mb-1">
            Duración
          </p>
          <p>{`de ${product.durationMin / 30} a ${
            product.durationMax / 30
          } meses`}</p>
        )}
        */}

        {product.beforeAndAfterImages.length > 0 && (
          <div className="mb-16">
            <p className="font-semibold text-xl mb-4">Antes y después</p>
            <Carousel hasControls>
              {product.beforeAndAfterImages.map((image, index) => (
                <div
                  key={index}
                  className="w-full aspect-video rounded-2xl overflow-hidden"
                >
                  <Image
                    src={`/images/fakeImages/${index + 1}.jpg`}
                    alt="nom del producte"
                    fill={true}
                    className="object-cover rounded-2xl"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        )}

        <p className="font-semibold text-xl mb-4">Nuestro equipo médico</p>
        <ul className="mb-16">
          {professionals.map(professional => {
            return (
              <li className="mb-4" key={professional.name}>
                <Flex layout="row-left">
                  <div className="w-[125px] aspect-square overflow-hidden rounded-full relative shrink-0 mr-4">
                    <Image
                      src={professional.urlPhoto}
                      alt={professional.name}
                      fill={true}
                      className="object-cover"
                    />
                  </div>
                  <Flex layout="col-left">
                    <p className="text-lg font-semibold mb-2">
                      {professional.name}
                      {' - '}
                      <span className="opacity-75 font-normal">
                        {professional.title} Nº Col.{' '}
                        {professional.collegiateNumber}
                      </span>
                    </p>
                    <p className="opacity-50">{professional.description}</p>
                  </Flex>
                </Flex>
              </li>
            );
          })}
        </ul>

        <Button
          style="primary"
          size="lg"
          className="w-full"
          onClick={() => addToCart(product)}
        >
          Añadir producto
        </Button>
      </Flex>
    </>
  );
}
