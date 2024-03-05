import { ReactNode } from 'react';
import { ModalBackground } from 'app/(ssr)/homeSSR/components/Modal';
import { gtUltra, poppins } from 'app/fonts';

import { Breakpoint } from './Breakpoint';

export default function AppSSR({ children }: { children: ReactNode }) {
  console.log(poppins);

  return (
    <body
      id="body"
      className={`relative min-h-full ${poppins.className} ${gtUltra.variable}`}
    >
      <ModalBackground />
      <Breakpoint />
      {children}
    </body>
  );
}
