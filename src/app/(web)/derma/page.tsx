import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';

import DermaHome from '../components/dermahome/DermaHome';

export const metadata: Metadata = {
  title: 'Cuidado facial personalizado - Holaglow Derma',
  description:
    'Reserva tu consulta online con un dermatólogo estético y encuentra el mejor tratamiento para las necesidades específicas de tu piel.',
};

export default function DerHome() {
  return <DermaHome />;
}
