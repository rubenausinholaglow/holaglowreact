import Hero from './components/home/Hero';
import Products from './components/home/Products';
import Professionals from './components/home/Professionals';
import ValuesCarousel from './components/home/ValuesCarousel';
import ValuesDescription from './components/home/ValuesDescription';

export default function Home() {
  return (
    <>
      <Hero />
      <ValuesCarousel />
      <ValuesDescription />
      <Products />
      <Professionals />
    </>
  );
}
