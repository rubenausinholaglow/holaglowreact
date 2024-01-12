import { useEffect,useState } from 'react';
import { Product } from '@interface/product';
import ProductService from '@services/ProductService';
import { useGlobalPersistedStore } from 'app/stores/globalStore';

export const useProductMetadata = (slug: string) => {
  const { stateProducts } = useGlobalPersistedStore((state) => state);
  const product = stateProducts.filter(
    (product) => product?.extraInformation?.slug === slug
  )[0];

  const [productDetails, setProductDetails] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const details = await ProductService.getProduct(product.id).then((res) =>
        res.json()
      );
      setProductDetails(details);
    };

    if (product) {
      fetchProductDetails();
    }
  }, [product]);

  return {
    title: productDetails?.extraInformation.seoTitle || '',
    description: productDetails?.extraInformation.seoMetaDescription || '',
  };
};
