'use client';

import { useEffect, useState } from 'react';
import CheckHydration from '@utils/CheckHydration';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { Container } from 'designSystem/Layouts/Layouts';

import Confirmation from './components/Confirmation';

export default function ConfirmationCheckout() {
  const [isDerma, setIsDerma] = useState(false);

  useEffect(() => {
    setIsDerma(window.location.href.includes('derma'));
  }, []);

  if (isDerma) {
    return (
      <CheckHydration>
        <div className="bg-derma-secondary100 min-h-screen">
          <DermaLayout hideButton hideFooter>
            <Confirmation isDerma />
          </DermaLayout>
        </div>
      </CheckHydration>
    );
  }

  return (
    <MainLayout hideFooter>
      <Confirmation />
    </MainLayout>
  );
}
