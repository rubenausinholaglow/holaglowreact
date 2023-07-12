'use client';
import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import ProductService from '@services/ProductService';
import { useSearchParams } from 'next/navigation';
import { StateCreator } from 'zustand';

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('search');
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<string[]>([]);

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
  }, [id]);

  const handleAddToCart = (productId: string) => {
    if (product && !cart.includes(product.id)) {
      setCart(prevCart => [...prevCart, product.id]);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="bg-hg-200 min-h-screen flex flex-col items-center justify-center p-10">
      {product ? (
        <div className="bg-white p-8 rounded shadow">
          <h1 className="text-black text-3xl font-bold mb-4">
            {product.title}
          </h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-gray-700">{product.price}</p>
          <button
            className={`${
              cart.includes(product.id)
                ? 'bg-green-500 hover:bg-green-700'
                : 'bg-blue-500 hover:bg-blue-700'
            } text-white font-bold py-2 px-4 rounded mr-2`}
            onClick={() => handleAddToCart(product.id)}
          >
            {cart.includes(product.id) ? 'Seleccionado' : 'Añadir al carrito'}
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleGoBack}
          >
            Volver
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Cargando producto...</p>
      )}
    </div>
  );
};

export default Page;
