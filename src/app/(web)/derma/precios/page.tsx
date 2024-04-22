import FaqsDerma from 'app/(web)/components/dermahome/FaqsDerma';
import TestimonialsDerma from 'app/(web)/components/dermahome/TestimonialsDerma';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';

import GuaranteedResults from './components/GuaranteedResults';
import HeroDermaPrices from './components/HeroDermaPrices';
import IngredientsPrices from './components/IngredientsPrices';
import OptionsPrices from './components/OptionsPrices';
import TreatmentsPrices from './components/TreatmentsPrices';

export default function LandingPrecios() {
  return (
    <DermaLayout showNavigation>
      <HeroDermaPrices />
      <TreatmentsPrices />
      <OptionsPrices />
      <div className="bg-derma-secondary300">
        <GuaranteedResults />
      </div>
      <IngredientsPrices />
      <div className="bg-derma-secondary300">
        <TestimonialsDerma />
      </div>
      <div className="bg-derma-secondary300 py-12">
        <FaqsDerma />
      </div>
    </DermaLayout>
  );
}
