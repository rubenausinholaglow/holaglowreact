'use client';

import CheckHydration from '@utils/CheckHydration';

import DermaLayout from '../layout/DermaLayout';
import DermaBottomBar from './DermaBottomBar';
import HeroDerma from './HeroDerma';
import HomeBlocksDerma from './HomeBlocksDerma';

export default function DermaHome() {
  return (
    <CheckHydration>
      <DermaLayout>
        <HeroDerma />
        <HomeBlocksDerma />
        <DermaBottomBar />
      </DermaLayout>
    </CheckHydration>
  );
}
