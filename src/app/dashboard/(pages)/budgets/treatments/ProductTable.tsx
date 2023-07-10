import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@interface/product';
import { ProductTableProps } from '@utils/props';

// Función para eliminar acentos y caracteres especiales de una cadena
const removeAccents = (str : string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const [titleFilter, setTitleFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleTitleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleFilter(event.target.value.toLowerCase());
  };

  const handlePriceFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceFilter(event.target.value);
  };
  
  const filteredProducts = products.filter((product: Product) => {
    const title = removeAccents(product.title.toLowerCase());
    const description = removeAccents(product.description.toLowerCase());
    const filter = removeAccents(titleFilter);
    const price = parseFloat(priceFilter);

    const titleMatch = title.includes(filter);
    const descriptionMatch = description.includes(filter);
    const priceMatch =
    isNaN(price) ||
    (price === 1 && (product.price) <= 250) ||
    (price === 2 && (product.price) > 250 && (product.price) <= 500) ||
    (price === 3 && (product.price) > 500);
  
    return titleMatch || descriptionMatch || priceMatch;
  });

  const productsPerPage = 13;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
        <table className="w-full border-collapse border">
          <colgroup>
            <col style={{ width: '100px' }} />
            <col style={{ width: '400px' }} />
            <col style={{ width: '100px' }} />
            <col style={{ width: '100px' }} />
            <col style={{ width: '100px' }} />
          </colgroup>
          <thead>
            <tr>
              <th className="px-4 py-2 text-center text-black">Nombre</th>
              <th className="px-4 py-2 text-center text-black">Descripción</th>
              <th className="px-4 py-2 text-center text-black">Precio</th>
              <th className="px-4 py-2 text-center text-black">Añadir</th>
              <th className="px-4 py-2 text-center text-black">Detalle</th>
            </tr>
          </thead>
          <tbody style={{ height: '500px', overflowY: 'auto' }}>
            {currentProducts.map((product: Product, index: number) => (
              <tr key={product.id} className={index % 2 === 0 ? 'bg-hg-700' : 'bg-hg-600'}>
                <td className="px-4 py-2 text-white" style={{ whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', height: '90px' }}>
                  {product.title}
                </td>
                <td className="px-4 py-2 text-white text-center" style={{ whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', height: '90px' }}>
                  {product.description}
                </td>
                <td className="px-4 py-2 text-white text-center">{product.price} €</td>
                <td>
                  <a style={{ cursor: 'pointer' }}>
                    <div className="bg-indigo-300 hover:bg-indigo-400 text-white rounded-lg py-2 px-4 m-3 text-center">
                      Añadir
                    </div>
                  </a>
                </td>
                <td>
                  <Link
                    href={{
                      pathname: '/dashboard/budgets/treatments/detail',
                      query: {
                        search: product.id,
                      },
                    }}
                  >
                    <div className="bg-purple-600 hover:bg-purple-800 text-white rounded-lg py-2 px-4 m-3 text-center">
                      Detalle
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          disabled={currentPage === 1}
          onClick={goToPreviousPage}
        >
          Anterior
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={indexOfLastProduct >= filteredProducts.length}
          onClick={goToNextPage}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};
