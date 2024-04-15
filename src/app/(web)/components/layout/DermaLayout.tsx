import { ReactNode } from 'react';
import { gtUltra } from 'app/fonts';

import DermaFooter from './DermaFooter';
import DermaHeader from './DermaHeader';

console.log(gtUltra);

export default function DermaLayout({
  children,
  hideButton = false,
  hideFooter = false,
  className = '',
}: {
  children: ReactNode;
  hideButton?: boolean;
  hideFooter?: boolean;
  className?: string;
}) {
  return (
    <main
      className={`${className} ${gtUltra.variable} text-derma-tertiary min-h-screen overflow-hidden derma relative`}
    >
      <DermaHeader hideButton={hideButton} />
      {children}
      <DermaFooter className="pb-24 md:pb-0" hideFooter={hideFooter} />
    </main>
  );
}
