import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';

import DermaHome from '../components/dermahome/DermaHome';

export const metadata: Metadata = {
  metadataBase: new URL('https://holaglow.com'),
  title: 'Cuidado facial personalizado - Holaglow Derma',
  description:
    'Reserva tu consulta online con un dermatólogo estético y encuentra el mejor tratamiento para tu piel sin salir de casa.',
};

export default function DerHome() {
  return <DermaHome />;
}
