import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { CartItem, emptyProduct } from '@interface/product';
import ProductService from '@services/ProductService';
import { useGlobalStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgClose, SvgSpinner } from 'icons/Icons';
import isEmpty from 'lodash/isEmpty';
import Image from 'next/image';

import { useCartStore } from '../stores/userCartStore';
import { Operation, Quantifier } from './Quantifier';

const DEFAULT_IMG_SRC = '/images/product/holaglowProduct.png?1';

export default function HightLightedProduct() {
  const setIsModalOpen = useGlobalStore(state => state.setIsModalOpen);

  const addToCart = useCartStore(state => state.addItemToCart);
  const getQuantityOfProduct = useCartStore(
    state => state.getQuantityOfProduct
  );
  const removeSingleProduct = useCartStore(state => state.removeSingleProduct);
  const setHighlightProduct = useCartStore(state => state.setHighlightProduct);
  const productHighlighted = useCartStore(state => state.productHighlighted);
  const professionals = useCartStore(state => state.professionals);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<CartItem | null>(null);
  const [imgSrc, setImgSrc] = useState('');
  useEffect(() => {
    setIsLoading(true);
    setProduct(null);
    setImgSrc('');

    const fetchProduct = async () => {
      try {
        if (productHighlighted.id) {
          const data = await ProductService.getProduct(productHighlighted.id);

          setProduct(data);
          setImgSrc(
            `https://budgetimages.blob.core.windows.net/images/products/${data.flowwwId}/${data.flowwwId}.jpg`
          );
        }
      } catch (error: any) {
        Bugsnag.notify(error);
      }
    };

    fetchProduct();
  }, [productHighlighted]);

  useEffect(() => {
    setIsLoading(isEmpty(product));
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
            onClick={() => {
              setHighlightProduct(emptyProduct);
              setIsModalOpen(false);
            }}
          />
        </Flex>
        <Flex layout="row-left" className="w-full gap-4 items-stretch mb-4">
          <div className="w-1/3 aspect-square relative shrink-0">
            <Image
              src={imgSrc}
              alt={product.title}
              fill={true}
              className="object-cover"
              onError={() => setImgSrc(DEFAULT_IMG_SRC)}
            />
          </div>
          <Flex layout="col-left" className="pt-4 w-full">
            <Title size="xl" className="font-semibold">
              {product.title}
              <br />
              <span className="text-lg text-hg-black font-semibold mb-3">
                {product.price.toFixed(2)}€
              </span>
            </Title>
            <p className="mb-4 text-hg-darkMalva">{product.description}</p>

            <Flex
              layout="row-center"
              className="pt-4 w-full rounded-lg p-4 bg-hg-darkMalva100 mt-auto"
            >
              <Text size="md" className="font-semibold mr-4">
                Añadir producto:
              </Text>
              <Quantifier
                handleUpdateQuantity={function handleUpdateQuantity(
                  operation: Operation
                ): void {
                  if (operation == 'increase') {
                    addToCart(product);
                  } else {
                    removeSingleProduct(product);
                  }
                }}
                quantity={getQuantityOfProduct(product)}
              />
            </Flex>
          </Flex>
        </Flex>
        <p
          className="mb-16"
          dangerouslySetInnerHTML={{ __html: product?.detail }}
        />
        {product.beforeAndAfterImages.length > 0 && (
          <div className="mb-16 w-full">
            <p className="font-semibold text-lg mb-4">Antes y después</p>
            <Carousel hasControls={product.beforeAndAfterImages.length > 1}>
              {product.beforeAndAfterImages.map((image, index) => (
                <Flex
                  key={index}
                  layout="row-center"
                  className="aspect-video rounded-2xl overflow-hidden"
                >
                  {image.urlBefore != '' && (
                    <Flex className="w-full h-full">
                      <div className="relative w-1/2 h-full">
                        <Image
                          src={image.urlBefore || '/images/default-image.jpg'}
                          alt={`Before Image ${index}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="relative w-1/2 h-full">
                        <Image
                          src={image.urlAfter || '/images/default-image.jpg'}
                          alt={`Before Image ${index}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </Flex>
                  )}
                  {image.urlBefore == '' && (
                    <Flex>
                      <Image
                        src={image.urlAfter || '/images/default-image.jpg'}
                        alt={`Before Image ${index}`}
                        fill
                        className="object-contain"
                      />
                    </Flex>
                  )}
                </Flex>
              ))}
            </Carousel>
          </div>
        )}
        {professionals.length > 0 && (
          <>
            <p className="font-semibold text-lg mb-4">Nuestro equipo médico</p>
            <ul>
              {professionals
                .filter(professional => professional.professionalType === 1)
                .map(professional => {
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
                          <p className="opacity-50">
                            {professional.description}
                          </p>
                        </Flex>
                      </Flex>
                    </li>
                  );
                })}
            </ul>
          </>
        )}
      </Flex>
    </>
  );
}
