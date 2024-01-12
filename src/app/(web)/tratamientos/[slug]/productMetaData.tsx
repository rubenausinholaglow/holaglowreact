import MainLayout from 'app/(web)/components/layout/MainLayout';
import { Metadata, ResolvingMetadata } from 'next';

import ProductDetail from './components/ProductDetail';

type Props = {
  params: {
    slug: string;
    isDashboard: boolean;
    title: string;
    description: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: params.title,
    description: params.description,
    openGraph: {
      url: 'https://holaglowreact-git-dev-966-hola-glow.vercel.app/',
      type: 'website',
      title: params.title,
      description: params.description,
      images: ['/images/home/OGimagen_Holaglow.jpg'],
    },
  };
}

export default function ProductMetaDataPage({
  params,
}: {
  params: {
    slug: string;
    isDashboard: boolean;
    title: string;
    description: string;
  };
}) {
  return (
    <MainLayout>
      <ProductDetail params={params}></ProductDetail>
    </MainLayout>
  );
}
