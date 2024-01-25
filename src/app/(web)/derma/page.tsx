import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';

import DermaHome from '../components/dermahome/DermaHome';

export const metadata: Metadata = {
  title: 'Holaglow - La nueva cara de la medicina estética',
  description:
    'Di adiós a los prejuicios y haz realidad tu propia idea de belleza con tratamientos estéticos eficaces',
};

export default function DerHome() {
  return <DermaHome />;
}
