'use client';

import { useEffect, useState } from 'react';
import { Filters } from '@components/Filters';
import { CartItem, emptyProduct, Product } from '@interface/product';
import ProductService from '@services/ProductService';
import { normalizeString } from '@utils/validators';
import { Container, Flex } from 'components/Layouts/Layouts';
import { Modal, ModalBackground } from 'components/Modals/Modal';
import { SvgSpinner } from 'icons/Icons';
import isEmpty from 'lodash/isEmpty';
import { HOLAGLOW_COLORS } from 'utils/colors';

import HightLightedProduct from './HightLightedProduct/HightLightedProduct';
import { Cart } from './minicart/Cart';
import { useCartStore } from './stores/userCartStore';
import ProductList from './treatments/ProductList';

export default function Page() {
  const cartFromStore = useCartStore(state => state.cart);
  const productHighlighted = useCartStore(state => state.productHighlighted);
  const setHighlightProduct = useCartStore(state => state.setHighlightProduct);

  const [showProductModal, setShowProductModal] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
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
    setCart(cartFromStore);
  }, []);

  useEffect(() => {
    ProductService.getAllProducts()
      .then(data => {
        setProducts(data);
      })
      .catch(error => setError(error));

    setHighlightProduct(emptyProduct);
  }, []);

  useEffect(() => {
    setShowProductModal(!isEmpty(productHighlighted));
  }, [productHighlighted]);

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
        handleFilterByProperty(parseInt(id), 'painsCategory');
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
    if (!isEmpty(products)) {
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
        if (filterPain.length > 0) {
          const productPains = product.painsCategory?.map(pain => pain.value);
          if (!productPains || !hasMatchingPain(productPains)) {
            return false;
          }
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
        return true;
      });
    }
  };

  const matchesFilterText = (text: string) => {
    const filterTextNormalized = normalizeString(filterText);
    const textNormalized = normalizeString(text);
    return textNormalized.includes(filterTextNormalized);
  };

  const hasMatchingClinic = (productClinicIds: (string | undefined)[]) => {
    return productClinicIds.some(city => city && filterClinic.includes(city));
  };

  const hasMatchingPain = (productPainIds: (number | undefined)[]) => {
    return productPainIds.some(pain => pain && filterPain.includes(pain));
  };

  if (error) {
    return <>{error}</>;
  } else {
    const filteredProducts = filterProducts() || [];
    return (
      <>
        <ModalBackground
          isVisible={showProductModal}
          onClick={() => setHighlightProduct(emptyProduct)}
        ></ModalBackground>
        <Modal isVisible={showProductModal}>
          <HightLightedProduct />
        </Modal>
        <Flex layout="col-center" className="w-full">
          <Container>
            {products.length > 0 ? (
              <Flex layout="row-left" className="items-start">
                <Filters onClickFilter={toggleFilter} />

                <Flex layout="col-center">
                  <ProductList products={filteredProducts} />
                </Flex>
              </Flex>
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
          </Container>
          {cart.length > 0 && (
            <div className="fixed bottom-0 z-10 w-full shadow-centered">
              <Cart cart={cart} />
            </div>
          )}
        </Flex>
      </>
    );
  }
}
