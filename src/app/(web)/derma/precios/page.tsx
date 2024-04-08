import BenefitsApplicationResultsDerma from 'app/(web)/components/dermahome/BenefitsApplicationResultsDerma';
import FaqsDerma from 'app/(web)/components/dermahome/FaqsDerma';
import TestimonialsDerma from 'app/(web)/components/dermahome/TestimonialsDerma';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';

import HeroDermaPrices from './components/HeroDermaPrices';
import IngredientsPrices from './components/IngredientsPrices';
import OptionsPrices from './components/OptionsPrices';
import TreatmentsPrices from './components/TreatmentsPrices';

export default function LandingPrecios() {
  return (
    <DermaLayout>
      <HeroDermaPrices />
      <TreatmentsPrices />
      <OptionsPrices />
      <IngredientsPrices />
      <div className="bg-derma-secondary300">
        <TestimonialsDerma />
      </div>
      <BenefitsApplicationResultsDerma />
      <div className="bg-derma-secondary300 py-12">
        <FaqsDerma />
      </div>
    </DermaLayout>
  );
}
