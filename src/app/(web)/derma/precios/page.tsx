import DermaLayout from 'app/(web)/components/layout/DermaLayout';

import HeroDermaPrices from './components/HeroDermaPrices';
import OptionsPrices from './components/OptionsPrices';
import TreatmentsPrices from './components/TreatmentsPrices';

export default function LandingPrecios() {
  return (
    <DermaLayout>
      <HeroDermaPrices />
      <TreatmentsPrices />
      <OptionsPrices />
    </DermaLayout>
  );
}
