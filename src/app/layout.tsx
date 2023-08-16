import './globals.css';
import './../../public/styles/Alma/widgets.min.css';

import App from './components/App';

export const metadata = {
  title: 'Holaglow - Medicina estética',
  description:
    'La nueva cara de la medicina estética. Tratamientos sin cirugía para conseguir resultados reales',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <App>{children}</App>;
}
