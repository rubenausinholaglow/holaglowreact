import { Metadata } from 'next';

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

export const metadata: Metadata = {
  metadataBase: new URL('https://holaglow.com'),
  title: 'Cuidado facial personalizado - Holaglow Derma',
  description:
    'Reserva tu consulta online con un dermatólogo estético y encuentra el mejor tratamiento para tu piel sin salir de casa.',
};

export default function DermaHome() {
  return (
    <DermaLayout>
      <HeroDerma />
      <div className="bg-derma-secondary300">
        <TreatmentsDerma />
        <BenefitsApplicationResultsDerma />
        <HowItWorksDerma />
        <TimeLineDerma />
        <StoriesDerma />
        <div className="bg-derma-secondary500">
          <ProfessionalsDerma className="py-12" />
        </div>
        <ClinicsDerma />
        <FaqsDerma className="py-12" />
      </div>
      <DermaBottomBar />
    </DermaLayout>
  );
}
