import { emptyProduct, Product } from '@interface/product';
import { Button } from 'components/Buttons/Buttons';
import { Carousel } from 'components/Carousel/Carousel';
import { Flex } from 'components/Layouts/Layouts';
import { SvgClose } from 'icons/Icons';
import Image from 'next/image';

import { useCartStore } from '../stores/userCartStore';

export default function HightLightedProduct({
  showProductModal,
  product,
}: {
  showProductModal: boolean;
  product: Product;
}) {
  const addToCart = useCartStore(state => state.addItemToCart);
  const setHighlightProduct = useCartStore(state => state.setHighlightProduct);
  return (
    <div
      className={`text-hg-black transition-all fixed top-0 right-0 bottom-0 w-1/2 bg-white z-20 transform shadow-centered overflow-y-auto ${
        showProductModal ? 'translate-x-[0%]' : 'translate-x-[105%]'
      }`}
    >
      <Flex layout="col-left" className="p-6 text-left relative">
        <SvgClose
          height={30}
          width={30}
          className="absolute cursor-pointer z-10"
          onClick={() => setHighlightProduct(emptyProduct)}
        />
        <div className="w-full aspect-[4/3] relative shrink-0 mb-4">
          <Image
            src="/images/budget/promoCodeBg.jpg"
            alt="nom del producte"
            fill={true}
            className="object-cover"
          />
        </div>
        <p className="font-semibold text-xl mb-4">{product.title}</p>
        <p className="mb-16">{product.description}</p>

        <p className="font-semibold text-xl mb-4">Antes y después</p>
        <Carousel hasControls>
          {[...Array(4)].map((_, index) => (
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

        <p className="font-semibold text-xl mt-16 mb-4">
          Nuestro equipo médico
        </p>
        <ul className="mb-16">
          <li className="mb-4">
            <Flex layout="row-left">
              <div className="w-[125px] aspect-square overflow-hidden rounded-full relative shrink-0 mr-4">
                <Image
                  src="/images/fakeImages/1.webp"
                  alt="metge"
                  fill={true}
                  className="object-cover"
                />
              </div>
              <Flex layout="col-left">
                <p className="text-lg font-semibold mb-2">
                  Dra. Espí -{' '}
                  <span className="opacity-75 font-normal">
                    Médico Estético Nº Col. 505015795
                  </span>
                </p>
                <p className="opacity-50">
                  Graduada en Medicina y Cirugía por la Universidad de Zaragoza.
                  Máster en Medicina Estética por la UDIMA. Especialista en todo
                  tipo de tratamientos inyectables en área facial y corporal con
                  amplia experiencia en clínicas líderes del sector.
                </p>
              </Flex>
            </Flex>
          </li>
          <li className="mb-4">
            <Flex layout="row-left">
              <div className="w-[125px] aspect-square overflow-hidden rounded-full relative shrink-0 mr-4">
                <Image
                  src="/images/fakeImages/3.webp"
                  alt="metge"
                  fill={true}
                  className="object-cover"
                />
              </div>
              <Flex layout="col-left">
                <p className="text-lg font-semibold mb-2">
                  Dr. Basart -{' '}
                  <span className="opacity-75 font-normal">
                    Director Médico Nº Col. 080856206
                  </span>
                </p>
                <p className="opacity-50">
                  Graduado en Medicina y Cirurgia por la UAB, Máster en Medicina
                  Estética por la UB y socio de la SEME. Lidera el equipo médico
                  para que los tratamientos cumplan con los máximos estándares
                  de seguridad y satisfacción.
                </p>
              </Flex>
            </Flex>
          </li>
          <li className="mb-4">
            <Flex layout="row-left">
              <div className="w-[125px] aspect-square overflow-hidden rounded-full relative shrink-0 mr-4">
                <Image
                  src="/images/fakeImages/2.webp"
                  alt="metge"
                  fill={true}
                  className="object-cover"
                />
              </div>
              <Flex layout="col-left">
                <p className="text-lg font-semibold mb-2">
                  María Terroba -{' '}
                  <span className="opacity-75 font-normal">
                    Directora de clínica
                  </span>
                </p>
                <p className="opacity-50">
                  Grado en Psicología y Máster en Psicología Jurídica y Forense.
                  Grado en Medicina y cursando Máster en Medicina Estética.
                </p>
              </Flex>
            </Flex>
          </li>
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
    </div>
  );
}
