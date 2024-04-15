import ClinicsDerma from '../common/ClinicsDerma';
import ProfessionalsDerma from '../common/ProfessionalsDerma';
import StoriesDerma from '../common/StoriesDerma';
import DermaLayout from '../layout/DermaLayout';
import BenefitsApplicationResultsDerma from './BenefitsApplicationResultsDerma';
import DermaBottomBar from './DermaBottomBar';
import FaqsDerma from './FaqsDerma';
import HeroDerma from './HeroDerma';
import HowItWorksDerma from './HowItWorksDerma';
import TimeLineDerma from './TimeLineDerma';
import TreatmentsDerma from './TreatmentsDerma';

export default function DermaHome() {
  return (
    <DermaLayout>
      <HeroDerma />
      <div className="bg-derma-secondary300">
        <TreatmentsDerma />
        <HowItWorksDerma />
        <TimeLineDerma />
        <StoriesDerma />
        <div className="bg-derma-secondary500">
          <ProfessionalsDerma className="py-12" />
        </div>
        <ClinicsDerma />
        <BenefitsApplicationResultsDerma className="mt-12 md:mt-0" />
        <FaqsDerma className="py-12" />
      </div>
      <DermaBottomBar />
    </DermaLayout>
  );
}
