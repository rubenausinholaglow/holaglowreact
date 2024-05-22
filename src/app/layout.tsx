import 'app/globals.css';

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="max-h-screen h-full bg-white text-hg-black">
      {children}
    </html>
  );
}
