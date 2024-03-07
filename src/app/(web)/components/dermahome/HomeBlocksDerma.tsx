import ProfessionalsDerma from '../common/ProfessionalsDerma';
import StoriesDerma from '../common/StoriesDerma';
import BenefitsApplicationResultsDerma from './BenefitsApplicationResultsDerma';
import FaqsDerma from './FaqsDerma';
import HowItWorksDerma from './HowItWorksDerma';
import TestimonialsDerma from './TestimonialsDerma';
import TreatmentsDerma from './TreatmentsDerma';
import WhatsIncludedDerma from './WhatsIncludedDerma';

export default function HomeBlocksDerma() {
  return (
    <>
      <TreatmentsDerma />

      <div className="bg-derma-primary100">
        <HowItWorksDerma />
        <WhatsIncludedDerma />
      </div>

      <div className="bg-derma-secondary100 pt-12">
        <ProfessionalsDerma />
        <StoriesDerma />
        <TestimonialsDerma />
      </div>

      <BenefitsApplicationResultsDerma />

      <div className="bg-derma-secondary300 py-12">
        <FaqsDerma />
      </div>
    </>
  );
}
