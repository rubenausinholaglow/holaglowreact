import { Product } from '@interface/product';
import { fetchProduct, fetchProducts } from '@utils/fetch';
import App from 'app/(web)/components/layout/App';
import { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import PsrpPage from '../psrp';
import ProductPage from './ProductPage';

async function getProducts() {
  const products = await fetchProducts({ isDerma: false });

  return products;
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const product = await getProduct(slug, false, false);

  if (product) {
    return {
      title: product.extraInformation.seoTitle,
      description: product.extraInformation.seoMetaDescription,
      robots: {
        index: true,
        follow: true,
      },
    };
  } else {
    return {};
  }
}
async function getProduct(
  productID: string,
  isDashboard: boolean,
  isDerma: boolean
) {
  const product = await fetchProduct(productID, isDashboard, isDerma);

  return product;
}

const TREATMENT_LANDINGS_SLUGS = [
  'arrugas',
  'lifting',
  'relleno',
  'lifting',
  'piel',
  'pelo',
  'otros',
  'packs',
];

export default async function page({
  params,
}: {
  params: { slug: string; isDashboard: boolean };
}) {
  if (TREATMENT_LANDINGS_SLUGS.includes(params.slug)) {
    return (
      <App>
        <PsrpPage slug={params.slug} />
      </App>
    );
  }

  const products = await getProducts();

  const productId = products.filter(
    (product: Product) => product?.extraInformation?.slug === params.slug
  )[0]?.id;

  if (productId === undefined) {
    return notFound();
  }

  const product = await getProduct(productId, false, false);

  return <ProductPage product={product} />;
}
