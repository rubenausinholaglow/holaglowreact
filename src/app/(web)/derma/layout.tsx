import 'app/globals.derma.css';

import App from './../components/layout/App';

export const metadata = {
  metadataBase: new URL('https://derma.holaglow.com'),
  title: 'Cuidado facial personalizado - Holaglow Derma',
  description:
    'Reserva tu consulta online con un dermatólogo estético y encuentra el mejor tratamiento para tu piel sin salir de casa.',
  icons: {
    icon: 'icon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="max-h-screen h-full bg-white text-hg-black">
      <App>{children}</App>
    </html>
  );
}
