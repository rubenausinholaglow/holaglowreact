import React, { ReactNode } from 'react';
import { Breakpoint } from 'app/(web)/components/layout/Breakpoint';
import { poppins } from 'app/fonts';
import { ModalBackground } from 'designSystem/Modals/Modal';

export default function SSRWrapper({ children }: { children: ReactNode }) {
  return (
    <body id="body" className={`relative min-h-full ${poppins.className}`}>
      <ModalBackground />

      <Breakpoint />

      {children}
    </body>
  );
}
