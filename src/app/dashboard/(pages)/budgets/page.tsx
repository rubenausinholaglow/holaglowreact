'use client'
import { useEffect, useState } from 'react';
import ProductService from '@services/ProductService';
import { ProductTable } from './treatments/ProductTable';
import { Filters }  from '@components/Filters';
import { Product } from '@interface/product';


export default function Page() {

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [showPacks, setShowPacks] = useState(false);
  const [filterZones, setFilterZones] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [filterPain, setFilterPain] = useState<number[]>([]);
  const [filterText, setFilterText] = useState('');
  const [filterClinic, setFilterClinic] = useState<string[]>([])
  
  useEffect(() => {
    ProductService.getAllProducts()
      .then((data) => {
        setProducts(data);
        console.log(products);
      })
      .catch((error) => setError(error));
      
  }, []);

  const handleFilterSelection = (filterId: string, inputText: string, tag: string) => {
    switch(tag)
    {
      case "Packs": setShowPacks(!showPacks); break;
      case "MoneyFilter": applyMoneyFilter(filterId); break;
      case "Body" : applyBodyFilter(filterId); break;
      case "Category" : applyPainFilter(filterId); break;
      case "Clinic":  applyClinicFilter(filterId); break;
      case "input" : setFilterText(inputText); break;
    }
  };

  const applyClinicFilter = (id: string) => {
    console.log(id)
    if (filterClinic.includes(id)) {
      setFilterClinic(filterClinic.filter((c) => c !== id));
    } else {
      setFilterClinic([...filterClinic, id]);
    }
  };
  

  const applyBodyFilter = (id:string)=>{
    switch(id)
    {
      case 'TercioInferior': handleFilterByZone(0); break;
      case 'TercioMedio': handleFilterByZone(1); break;
      case 'TercioSuperior': handleFilterByZone(2); break;
      case 'Piel': handleFilterByZone(3); break;
      case 'Pelo': handleFilterByZone(4); break;
    }
  }

  const applyPainFilter = (id:string)=>{
    switch(id)
    {
      case 'Wrinkles': handleFilterPain(0); break;
      case 'SkinQuality': handleFilterPain(1); break;
      case 'HairLoss': handleFilterPain(2); break;
      case 'FillerHyaluronicAcid': handleFilterPain(3); break;
      case 'Lifting': handleFilterPain(4); break;
      case 'Others': handleFilterPain(5); break;
    }
  }
  
  const applyMoneyFilter = (id : string) =>{
    switch(id)
    {
      case '0-250': handleFilterPriceLow(); break;
      case '250-500': handleFilterPriceMedium(); break;
      case '500': handleFilterPriceHigh(); break;
    }
  }

  const handleFilterPriceLow = () => {
    if (priceRange === '0-250') {
      setPriceRange(null);
    } else {
      setPriceRange('0-250');
    }
  };

  const handleFilterPriceMedium = () => {
    if (priceRange === '250-500') {
      setPriceRange(null);
    } else {
      setPriceRange('250-500');
    }
  };
  
  const handleFilterPriceHigh = () => {
    if (priceRange === '500') {
      setPriceRange(null);
    } else {
      setPriceRange('500');
    }
  };

  const handleFilterByZone = (zone: number) => {
    if (filterZones.includes(zone)) {
      setFilterZones(filterZones.filter((z) => z !== zone));
    } else {
      setFilterZones([...filterZones, zone]);
    }
  };

  const handleFilterPain = (pain: number) => {
    if (filterPain.includes(pain)) {
      setFilterPain(filterPain.filter((p) => p !== pain));
    } else {
      setFilterPain([...filterPain, pain]);
    }
  };


  const filteredProducts = products.filter((product) => {
    if (showPacks && !product.isPack) {
      return false;
    }
    if (filterZones.length > 0 && !filterZones.includes(product.zone)) {
      return false;
    }
    if (priceRange !== null) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      if (minPrice > 0 && product.price < minPrice) {
        return false;
      }
      if (maxPrice > 0 && product.price > maxPrice) {
        return false;
      }
    }
    if (filterPain.length > 0 && !filterPain.includes(product.pain)) {
      return false;
    }
    if (filterText && !product.title.toLowerCase().includes(filterText.toLowerCase()) && !product.description.toLowerCase().includes(filterText.toLowerCase())) {
      return false;
    }
    if (filterClinic.length > 0) {
      console.log('clinic');
      const productClinicIds = product.clinic.map((clinic) => clinic.city);
      const hasMatchingClinic = productClinicIds.some((city) => filterClinic.includes(city));
      if (!hasMatchingClinic) {
        return false;
      }
    }

  
    return true;
  });

  if (error) {
    return <>{error}</>;
  } else
  return (
    <section className="bg-hg-200 min-h-screen p-10">
      
      <h1 className="text-3xl font-bold mb-8">Tratamientos {filteredProducts.length}</h1>
      {products.length > 0 ? (
        <div className='flex flex-row'>

          <Filters onClickFilter={handleFilterSelection}/>
          
          <div id="tablePage" className='bg-white w-full m-1 p-5'>
          
          <ProductTable products={filteredProducts} selectedFilter='' />
         
          </div>
        </div>
      ) : (
          <p className="text-gray-500 text-center font-blod">Cargando productos...</p>
        )}
    </section>
  );
}