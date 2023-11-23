import '/globals.css';

import App from '../components/layout/App';

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
