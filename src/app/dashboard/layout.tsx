'use client';

import { ClinicProfessional } from '@components/ClinicProfessional';
import { Container, Flex } from 'components/Layouts/Layouts';
import { SvgArrowSmallLeft, SvgHolaglow } from 'icons/Icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HOLAGLOW_COLORS } from 'utils/colors';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  return (
    <main className="min-h-screen h-100 text-md bg-hg-lightMalva/20">
      <Flex
        layout="col-center"
        className="min-h-screen h-100 text-hg-black text-md"
      >
        <Container>
          <Flex layout="row-left" className="w-full py-8">
            {pathName === '/dashboard/budgets' && (
              <>
                <Link href="/dashboard/menu">
                  <Flex layout="row-left">
                    <SvgArrowSmallLeft
                      height={40}
                      width={40}
                      className="pr-2"
                    />
                    Volver al menu
                  </Flex>
                </Link>

                <div className="ml-auto z-10">
                  <ClinicProfessional />
                </div>
              </>
            )}
          </Flex>
        </Container>
        {children}
        <div className="pt-16 pb-8 mt-auto">
          <SvgHolaglow width={150} height={40} fill={HOLAGLOW_COLORS['lime']} />
        </div>
      </Flex>
    </main>
  );
}
