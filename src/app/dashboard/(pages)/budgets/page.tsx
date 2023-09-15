'use client';

import { useEffect, useState } from 'react';
import { Filters } from '@components/Filters';
import { emptyProduct, Product } from '@interface/product';
import ProductService from '@services/ProductService';
import { normalizeString } from '@utils/validators';
import MainLayout from 'app/components/layout/MainLayout';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { SvgSpinner } from 'icons/Icons';
import isEmpty from 'lodash/isEmpty';

import HightLightedProduct from './HightLightedProduct/HightLightedProduct';
import { Cart } from './minicart/Cart';
import { useCartStore } from './stores/userCartStore';
import ProductList from './treatments/ProductList';

export default function Page() {
  const cart = useCartStore(state => state.cart);
  const productHighlighted = useCartStore(state => state.productHighlighted);
  const setHighlightProduct = useCartStore(state => state.setHighlightProduct);

  const [showFilters, setShowFilters] = useState(true);

  const [showProductModal, setShowProductModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [showPacks, setShowPacks] = useState(false);
  const [filterZones, setFilterZones] = useState<number[]>([]);
  const [filterPain, setFilterPain] = useState<number[]>([]);
  const [filterText, setFilterText] = useState('');
  const [filterClinic, setFilterClinic] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<number[]>([2, 3]);
  const [priceRanges, setPriceRanges] = useState<
    { min: number; max: number }[]
  >([]);
  const [isTypeFilterSelected, setIsTypeFilterSelected] = useState(true);

  useEffect(() => {
    ProductService.getAllProducts()
      .then(data => {
        data.sort((a: any, b: any) => (a.price > b.price ? 1 : -1));
        setProducts(data);
      })
      .catch(error => setError(error));

    handleFilterByType(3);
    setShowPacks(!showPacks);
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
        handleFilterByProperty(parseInt(id), 'category');
        break;
      case 'Type':
        handleFilterByType(parseInt(id));
        setIsTypeFilterSelected(true);
        break;
      case 'Clinic':
        applyClinicFilter(id);
        break;
      case 'input':
        setFilterText(inputText);
        break;
    }
  };

  const handleFilterByType = (id: number) => {
    const updatedFilterType = filterType.includes(id)
      ? filterType.filter(t => t !== id)
      : [...filterType, id];
    setFilterType(updatedFilterType);
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
    if (!isTypeFilterSelected) {
      return [];
    }
    if (!isEmpty(products)) {
      if (
        filterZones.length === 0 &&
        filterPain.length === 0 &&
        priceRanges.length === 0 &&
        filterText === '' &&
        filterClinic.length === 0 &&
        filterType.length === 0
      ) {
        return [];
      }

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
          const productPains = product.category?.map(pain => pain.value);
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
        if (
          filterType.length > 0 &&
          !filterType.includes(product.type) &&
          !(filterType.includes(2) && product.type === 1)
        ) {
          return false;
        } else if (filterType.length <= 0) {
          setIsTypeFilterSelected(false);
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
      <MainLayout isDashboard>
        <Modal isVisible={showProductModal} width="w-3/4">
          <HightLightedProduct />
        </Modal>
        <Flex layout="col-center" className="w-full">
          <Container>
            {products.length > 0 ? (
              <Flex layout="row-left" className="items-start">
                <Filters
                  onClickFilter={toggleFilter}
                  showFilters={showFilters}
                  setShowFilters={setShowFilters}
                />

                <Flex layout="col-center">
                  <ProductList
                    products={filteredProducts}
                    showFilters={showFilters}
                  />
                </Flex>
              </Flex>
            ) : (
              <Flex layout="col-center">
                <p className="mb-4">Cargando productos...</p>
                <SvgSpinner
                  height={30}
                  width={30}
                  fill={HOLAGLOW_COLORS['primary']}
                />
              </Flex>
            )}
          </Container>
          {cart.length > 0 && (
            <div className="fixed bottom-0 z-10 w-full shadow-centered">
              <Cart />
            </div>
          )}
        </Flex>
      </MainLayout>
    );
  }
}
