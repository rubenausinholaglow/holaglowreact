'use client';

import { useState } from 'react';
import { ClinicProfessional } from '@components/ClinicProfessional';
import ButtonMessage from '@components/ui/ButtonMessage';
import Timer from '@components/ui/Timer';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { SvgArrowSmallLeft, SvgHolaglow } from 'icons/Icons';
import { usePathname } from 'next/navigation';

function getBackRoute(pathName: string) {
  const BACK_ROUTES: { [key: string]: string } = {
    '/dashboard/budgets': '/dashboard/menu',
    '/dashboard/checkout': '/dashboard/budgets',
    '/dashboard/menu': '/dashboard',
  };
  return BACK_ROUTES[pathName];
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const backButtonRoutes = [
    '/dashboard/budgets',
    '/dashboard/checkout',
    '/dashboard/menu',
  ];
  return (
    <main className="min-h-screen h-100 text-sm bg-white">
      <Flex
        layout="col-center"
        className="min-h-screen h-100 text-hg-black text-sm overflow-hidden"
      >
        <Container>
          <Flex layout="row-left" className="w-full py-8">
            {backButtonRoutes.includes(pathName) &&
              pathName !== '/dashboard/checkout' && (
                <>
                  <Button href={getBackRoute(pathName)} type="tertiary">
                    <Flex layout="row-left">
                      <SvgArrowSmallLeft
                        height={40}
                        width={40}
                        className="pr-2"
                      />
                      Volver
                    </Flex>
                  </Button>

                  {pathName !== '/dashboard' && <ButtonMessage />}

                  <div className="ml-auto z-10">
                    <ClinicProfessional />
                  </div>
                </>
              )}
          </Flex>
        </Container>
        {children}
        <div className="pt-16 pb-8 mt-auto">
          <SvgHolaglow
            width={150}
            height={40}
            fill={HOLAGLOW_COLORS['purple']}
          />
        </div>
      </Flex>
    </main>
  );
}
