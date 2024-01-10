'use client';

import CheckHydration from '@utils/CheckHydration';
import { Analytics } from '@vercel/analytics/react';

import { DermaFooter } from '../layout/DermaFooter';
import DermaHeader from '../layout/DermaHeader';
import DermaBottomBar from './DermaBottomBar';
import HeroDerma from './HeroDerma';
import HomeBlocksDerma from './HomeBlocksDerma';

export default function DermaHome() {
  return (
    <CheckHydration>
      <main>
        <DermaHeader />
        <HeroDerma />
        <HomeBlocksDerma />
        <DermaBottomBar />
        <DermaFooter className="pb-24" />
        <Analytics />
      </main>
    </CheckHydration>
  );
}
