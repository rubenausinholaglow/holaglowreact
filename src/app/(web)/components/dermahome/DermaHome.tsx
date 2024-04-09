import CheckHydration from '@utils/CheckHydration';

import DermaLayout from '../layout/DermaLayout';
import DermaBottomBar from './DermaBottomBar';
import HeroDerma from './HeroDerma';
import HomeBlocksDerma from './HomeBlocksDerma';
import TreatmentsDerma from './TreatmentsDerma';

export default function DermaHome() {
  return (
    <DermaLayout>
      <HeroDerma />
      <TreatmentsDerma />
      {/* <HomeBlocksDerma />
      <DermaBottomBar /> */}
    </DermaLayout>
  );
}
