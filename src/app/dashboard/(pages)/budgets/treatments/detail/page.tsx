'use client';

import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { CartItem, Product } from '@interface/product';
import ProductService from '@services/ProductService';
import { handleGoBack } from '@utils/utils';
import { useSearchParams } from 'next/navigation';

import { Cart } from '../../minicart/Cart';
import { useCartStore } from '../../stores/userCartStore';

const Page = () => {
  const addToCart = useCartStore(state => state.addItemToCart);
  const searchParams = useSearchParams();
  const id = searchParams.get('boxI');
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await ProductService.getProduct(id);
          setProduct(data);
        }
      } catch (error: any) {
        Bugsnag.notify(error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="bg-hg-200 min-h-screen flex flex-col items-center justify-center p-10">
      {product ? (
        <>
          <div className="bg-white p-8 rounded shadow">
            <h1 className="text-black text-3xl font-bold mb-4">
              {product.title}
            </h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-700">{product.price}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => addToCart(product as CartItem)}
            >
              Añadir al carrito
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleGoBack}
            >
              Volver
            </button>
          </div>
          <div id="cart" className="bg-white m-1 p-5">
            <Cart />
          </div>
        </>
      ) : (
        <p className="text-gray-500">Cargando producto...</p>
      )}
    </div>
  );
};

export default Page;
