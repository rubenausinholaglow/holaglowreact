import { ReactNode } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { gtUltra, poppins } from 'app/fonts';
import { ModalBackgroundSSR } from 'designSystem/Modals/ModalSSR';

export default function AppSSR({ children }: { children: ReactNode }) {
  return (
    <body
      id="body"
      className={`relative min-h-full ${poppins.className} ${gtUltra.variable}`}
    >
      <ModalBackgroundSSR />
      {children}
      <SpeedInsights />
    </body>
  );
}
