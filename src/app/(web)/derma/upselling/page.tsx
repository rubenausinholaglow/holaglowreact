import DermaLayout from 'app/(web)/components/layout/DermaLayout';

import UpsellingIntro from './components/UpsellingIntro';
import UpsellingPharmacies from './components/UpsellingPharmacies';
import UpsellingRoutines from './components/UpsellingRoutines';

export default function Upselling() {
  return (
    <DermaLayout hideButton>
      <UpsellingIntro />
      <UpsellingRoutines />
      <UpsellingPharmacies />
    </DermaLayout>
  );
}
