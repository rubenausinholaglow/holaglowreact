import { ReactNode } from 'react';
import { gtUltra, poppins } from 'app/fonts';
import { ModalBackgroundSSR } from 'designSystem/Modals/ModalSSR';

import { Breakpoint } from './Breakpoint';

export default function AppSSR({ children }: { children: ReactNode }) {
  return (
    <body
      id="body"
      className={`relative min-h-full ${poppins.className} ${gtUltra.variable}`}
    >
      <ModalBackgroundSSR />
      <Breakpoint />
      {children}
    </body>
  );
}
