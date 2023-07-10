'use client'
import { useEffect, useState } from 'react';
import ProductService from '@services/ProductService';
import { ProductTable } from './treatments/ProductTable';
import { Filters }  from '@components/Filters';
import { applyFilter } from './filterUtils';


export default function Page() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState('');
  const [allowfilter, setAllowFilter] = useState(false);
  
  useEffect(() => {
    ProductService.getAllProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => setError(error));
  }, []);

  const handleFilterChange = (id:string, inputText:string, allow : boolean) => {
    setAllowFilter(allow)
    if (allow) {
      const filteredProducts = applyFilter(id, inputText, products);
      setFilteredProducts(filteredProducts);   
      console.log(filteredProducts);   
    } else {
      setFilteredProducts([]);
      console.log(products);
    }
  };

  if (error) {
    return <>{error}</>;
  } else
  return (
    <section className="bg-hg-200 min-h-screen p-10">
      
      <h1 className="text-3xl font-bold mb-8">Tratamientos</h1>
      {products.length > 0 ? (
        <div className='flex flex-row'>

          <Filters onClickFilter={handleFilterChange}/>
          
          <div id="tablePage" className='bg-white w-full m-1 p-5'>
          
          <ProductTable products={allowfilter ? filteredProducts : products} selectedFilter='' />
         
          </div>
        </div>
      ) : (
          <p className="text-gray-500 text-center font-blod">Cargando productos...</p>
        )}
    </section>
  );
}