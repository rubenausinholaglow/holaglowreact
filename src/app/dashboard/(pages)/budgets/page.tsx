'use client';
import { useEffect, useState } from 'react';
import { Filters } from '@components/Filters';
import Header from '@components/ui/Header';
import { Product } from '@interface/product';
import ProductService from '@services/ProductService';
import { normalizeString } from '@utils/validators';

import Cart from './minicart/Cart';
import ProductList from './treatments/ProductList';

export default function Page() {
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
        setProducts(data);
      })
      .catch(error => setError(error));
  }, []);

  const toggleFilter = (id: string, inputText: string, tag: string) => {
    console.log(tag);
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
      console.log(showPacks);
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
      if (filterPain.length > 0 && !filterPain.includes(product.pain)) {
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

  const handleCartIconClick = () => {};

  if (error) {
    return <>{error}</>;
  } else {
    const filteredProducts = filterProducts();
    console.log(filteredProducts);
    return (
      <section className="bg-hg-200 min-h-screen p-10">
        <h1 className="text-3xl font-bold mb-8">
          Tratamientos {filteredProducts.length}
        </h1>
        {products.length > 0 ? (
          <div className="flex flex-row">
            <Filters onClickFilter={toggleFilter} />

            <div id="tablePage" className="bg-white w-full m-1 p-5">
              <Header onCartIconClick={handleCartIconClick} />
              <ProductList products={filteredProducts} />
            </div>
            <div id="cart" className="bg-white m-1 p-5">
              <Cart />
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center font-blod">
            Cargando productos...
          </p>
        )}
      </section>
    );
  }
}
