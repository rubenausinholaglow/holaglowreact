import HomeHero from './components/HomeHero';
import Treatments from './components/Treatments';
import ValuesCarousel from './components/ValuesCarousel';
import ValuesDescription from './components/ValuesDescription';

export default function Home() {
  return (
    <>
      <HomeHero />
      <ValuesCarousel />
      <ValuesDescription />
      <Treatments />
    </>
  );
}
