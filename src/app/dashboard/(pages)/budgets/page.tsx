'use client';

import { useEffect, useState } from 'react';
import { Filters } from '@components/Filters';
import { emptyProduct, Product } from '@interface/product';
import ProductService from '@services/ProductService';
import { normalizeString } from '@utils/validators';
//import Header from '@components/ui/Header';
import { Button } from 'components/Buttons/Buttons';
import { Carousel } from 'components/Carousel/Carousel';
import { Container, Flex } from 'components/Layouts/Layouts';
import { SvgClose, SvgSpinner } from 'icons/Icons';
import Image from 'next/image';
import { HOLAGLOW_COLORS } from 'utils/colors';

import Cart from './minicart/Cart';
import { useCartStore } from './stores/userCartStore';
import ProductList from './treatments/ProductList';

export default function Page() {
  const cart = useCartStore(state => state.cart);
  const productHighlighted = useCartStore(state => state.productHighlighted);

  console.log(productHighlighted);

  const [showProductModal, setShowProductModal] = useState(
    productHighlighted ? true : false
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [showPacks, setShowPacks] = useState(false);
  const [filterZones, setFilterZones] = useState<number[]>([]);
  const [filterPain, setFilterPain] = useState<number[]>([]);
  const [filterText, setFilterText] = useState('');
  const [filterClinic, setFilterClinic] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<
    { min: number; max: number }[]
  >([]);

  useEffect(() => {
    ProductService.getAllProducts()
      .then(data => {
        console.log(data);
        setProducts(data);
      })
      .catch(error => setError(error));
  }, []);

  const toggleFilter = (id: string, inputText: string, tag: string) => {
    switch (tag) {
      case 'Packs':
        setShowPacks(!showPacks);
        break;
      case 'MoneyFilter':
        applyMoneyFilter(id);
        break;
      case 'Body':
        handleFilterByProperty(parseInt(id), 'zone');
        break;
      case 'Category':
        handleFilterByProperty(parseInt(id), 'pain');
        break;
      case 'Clinic':
        applyClinicFilter(id);
        break;
      case 'input':
        setFilterText(inputText);
        break;
    }
  };

  const handleFilterByProperty = (id: number, property: keyof Product) => {
    const filterArray = property === 'zone' ? filterZones : filterPain;
    const updatedFilterArray = filterArray.includes(id)
      ? filterArray.filter(f => f !== id)
      : [...filterArray, id];
    if (property === 'zone') {
      setFilterZones(updatedFilterArray);
    } else {
      setFilterPain(updatedFilterArray);
    }
  };

  const applyClinicFilter = (id: string) => {
    const updatedFilterClinic = filterClinic.includes(id)
      ? filterClinic.filter(c => c !== id)
      : [...filterClinic, id];
    setFilterClinic(updatedFilterClinic);
  };

  const applyMoneyFilter = (id: string) => {
    switch (id) {
      case '0-250':
        togglePriceRange({ min: 0, max: 250 });
        break;
      case '250-500':
        togglePriceRange({ min: 250, max: 500 });
        break;
      case '500':
        togglePriceRange({ min: 500, max: Infinity });
        break;
    }
  };

  const togglePriceRange = (range: { min: number; max: number }) => {
    const existingIndex = priceRanges.findIndex(
      r => r.min === range.min && r.max === range.max
    );
    const updatedPriceRanges =
      existingIndex !== -1
        ? priceRanges.filter((_, index) => index !== existingIndex)
        : [...priceRanges, range];
    setPriceRanges(updatedPriceRanges);
  };

  const filterProducts = () => {
    return products.filter(product => {
      if (product.price <= 0) {
        return false;
      }
      if (showPacks && !product.isPack) {
        return false;
      }
      if (filterZones.length > 0 && !filterZones.includes(product.zone)) {
        return false;
      }
      if (
        priceRanges.length > 0 &&
        !priceRanges.some(
          range => range.min <= product.price && product.price <= range.max
        )
      ) {
        return false;
      }

      if (
        filterText &&
        !matchesFilterText(product.title) &&
        !matchesFilterText(product.description)
      ) {
        return false;
      }
      if (filterClinic.length > 0) {
        const productClinicIds = product.clinic?.map(clinic => clinic.city);
        if (!productClinicIds || !hasMatchingClinic(productClinicIds)) {
          return false;
        }
      }
      if (filterPain.length > 0) {
        if (!product.pain || product.pain.length === 0) {
          return false;
        }
        if (
          !product.pain.some(painItem => filterPain.includes(painItem.value))
        ) {
          return false;
        }
      }

      return true;
    });
  };

  const matchesFilterText = (text: string) => {
    const filterTextNormalized = normalizeString(filterText);
    const textNormalized = normalizeString(text);
    return textNormalized.includes(filterTextNormalized);
  };

  const hasMatchingClinic = (productClinicIds: (string | undefined)[]) => {
    return productClinicIds.some(city => city && filterClinic.includes(city));
  };

  /* const id = searchParams.get('search');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await ProductService.getProduct(id);
          setProduct(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]); */

  if (error) {
    return <>{error}</>;
  } else {
    const filteredProducts = filterProducts();
    return (
      <>
        <Button
          style="primary"
          onClick={() => setShowProductModal(!showProductModal)}
        >
          Show/Hide Product Highlight
        </Button>

        <div
          className={`text-hg-black transition-all fixed top-0 right-0 bottom-0 w-1/2 bg-white z-20 transform shadow-[0_0_10px_10px_rgba(0,0,0,0.15)] overflow-y-auto ${
            showProductModal ? 'translate-x-[105%]' : 'translate-x-[0%]'
          }`}
        >
          <Flex layout="col-left" className="p-8 text-left relative">
            <SvgClose
              height={30}
              width={30}
              className="absolute cursor-pointer z-10"
              onClick={() => setShowProductModal(!showProductModal)}
            />
            <div className="w-full aspect-[4/3] relative shrink-0 mb-4">
              <Image
                src="/images/budget/promoCodeBg.jpg"
                alt="nom del producte"
                fill={true}
                className="object-cover"
              />
            </div>
            <p className="font-semibold text-xl mb-4">Nom del producte</p>
            <p className="">
              Lorem fistrum te va a hasé pupitaa de la pradera a wan condemor
              ese que llega no te digo trigo por no llamarte Rodrigor está la
              cosa muy malar benemeritaar ese que llega. Jarl hasta luego Lucas
              ese pedazo de torpedo hasta luego Lucas no puedor diodeno la
              caidita. Te va a hasé pupitaa benemeritaar quietooor me cago en
              tus muelas quietooor.
            </p>
            <p className="mb-16">
              Lorem fistrum te va a hasé pupitaa de la pradera a wan condemor
              ese que llega no te digo trigo por no llamarte Rodrigor está la
              cosa muy malar benemeritaar ese que llega. Jarl hasta luego Lucas
              ese pedazo de torpedo hasta luego Lucas no puedor diodeno la
              caidita. Te va a hasé pupitaa benemeritaar quietooor me cago en
              tus muelas quietooor.
            </p>

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
                      Graduada en Medicina y Cirugía por la Universidad de
                      Zaragoza. Máster en Medicina Estética por la UDIMA.
                      Especialista en todo tipo de tratamientos inyectables en
                      área facial y corporal con amplia experiencia en clínicas
                      líderes del sector.
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
                      Graduado en Medicina y Cirurgia por la UAB, Máster en
                      Medicina Estética por la UB y socio de la SEME. Lidera el
                      equipo médico para que los tratamientos cumplan con los
                      máximos estándares de seguridad y satisfacción.
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
                      Grado en Psicología y Máster en Psicología Jurídica y
                      Forense. Grado en Medicina y cursando Máster en Medicina
                      Estética.
                    </p>
                  </Flex>
                </Flex>
              </li>
            </ul>

            <select id="discountTypeSelect">
              <option value="price">€ (Euros)</option>
              <option value="amount">% (Porcentaje)</option>
            </select>

            <Button style="primary" size="lg" className="w-full">
              Añadir producto
            </Button>
          </Flex>
        </div>
        <Flex layout="col-center" className="w-full">
          {/*         <h1 className="text-3xl font-bold mb-8">
          Tratamientos {filteredProducts.length}
        </h1> */}
          {cart.length > 0 && <Cart />}
          <Container>
            <Flex layout="row-center" className="items-start pt-8">
              {products.length > 0 ? (
                <>
                  <Filters onClickFilter={toggleFilter} />

                  <Flex layout="col-center">
                    <ProductList products={filteredProducts} />
                  </Flex>
                </>
              ) : (
                <Flex layout="col-center">
                  <p className="mb-4">Cargando productos...</p>
                  <SvgSpinner
                    height={30}
                    width={30}
                    fill={HOLAGLOW_COLORS['lime']}
                  />
                </Flex>
              )}
            </Flex>
          </Container>
        </Flex>
      </>
    );
  }
}
