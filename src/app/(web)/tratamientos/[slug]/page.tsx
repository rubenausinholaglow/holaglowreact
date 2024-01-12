import MainLayout from 'app/(web)/components/layout/MainLayout';
import { Metadata, ResolvingMetadata } from 'next';

import ProductDetail from './components/ProductDetail';
import { useProductMetadata } from './useProductMetadata';

/*
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { title, description } = useProductMetadata(params.slug);

  return {
    title: title,
    description: description,
    openGraph: {
      url: 'https://holaglowreact-git-dev-966-hola-glow.vercel.app/',
      type: 'website',
      title: title,
      description: description,
      images: ['/images/home/OGimagen_Holaglow.jpg'],
    },
  };
}
*/

export default function ProductPage({
  params,
}: {
  params: { slug: string; isDashboard: boolean };
}) {
  const { title, description } = useProductMetadata(params.slug);

  const metadata = {
    title: title,
    description: description,
    openGraph: {
      url: 'https://holaglowreact-git-dev-966-hola-glow.vercel.app/',
      type: 'website',
      title: title,
      description: description,
      images: ['/images/home/OGimagen_Holaglow.jpg'],
    },
  };

  return (
    <MainLayout>
      <ProductDetail params={params}></ProductDetail>
    </MainLayout>
  );
}
