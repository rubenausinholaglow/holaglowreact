import { Product } from '@interface/product';
import HomeHero from 'app/(web)/components/home/Hero';
import HomeProducts from 'app/(web)/components/home/Products';

export default function Home({ data }: { data: Product[] }) {
  return (
    <>
      <HomeHero />
      <HomeProducts products={data} />
    </>
  );
}
