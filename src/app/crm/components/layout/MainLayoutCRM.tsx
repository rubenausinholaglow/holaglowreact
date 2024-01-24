import React from 'react';

import { FooterCRM } from './FooterCRM';
import HeaderCRM from './HeaderCRM';
import SideNav from './SideNav';

export default function MainLayout({
  hideHeader = false,
  hideFooter = false,
  children,
}: {
  hideHeader?: boolean;
  hideFooter?: boolean;
  children: React.ReactNode;
}) {
  return (
    <main className="transition-all h-screen overflow-hidden flex flex-col w-full bg-gradient-15deg from-hg-primary300 to-hg-secondary500">
      {!hideHeader && <SideNav />}
      {!hideHeader && <HeaderCRM />}
      {children}
      {!hideFooter && <FooterCRM />}
    </main>
  );
}
