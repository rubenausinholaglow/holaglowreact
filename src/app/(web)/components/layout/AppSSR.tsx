import { ReactNode } from 'react';
import { ModalBackground } from 'app/(ssr)/homeSSR/components/Modal';
import { poppins } from 'app/fonts';

import { Breakpoint } from './Breakpoint';

export default function AppSSR({ children }: { children: ReactNode }) {
  return (
    <body id="body" className={`relative min-h-full ${poppins.className}`}>
      <ModalBackground />
      <Breakpoint />
      {children}
    </body>
  );
}
