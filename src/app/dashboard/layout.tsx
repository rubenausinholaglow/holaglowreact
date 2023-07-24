import { ClinicProfessional } from '@components/ClinicProfessional';
import { Flex } from 'components/Layouts/Layouts';
import { SvgHolaglow } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen h-100 text-md bg-hg-lightMalva/20">
      <Flex
        layout="col-center"
        className="min-h-screen h-100 text-hg-black text-md bg-hg-lightMalva/20"
      >
        <div className="pt-4 pr-6 self-end z-10">
          <ClinicProfessional />
        </div>
        {children}
        {/*
       <footer className="border-b py-8">
        <Container>
          <Flex layout="row-left">
            <SvgHolaglow
              height={24}
              width={98}
              fill={HOLAGLOW_COLORS['lime']}
            />

            {cart.length > 0 && (
              <Flex layout="row-center" className="ml-auto">
                <Flex
                  layout="row-center"
                  className="bg-hg-lime text-hg-darkMalva rounded-full h-[25px] w-[25px] font-semibold text-sm"
                >
                  {cart.length}
                </Flex>
                <SvgShoppingCart
                  height={25}
                  width={25}
                  fill={HOLAGLOW_COLORS['darkMalva']}
                />
              </Flex>
            )}
          </Flex>
        </Container>
      </footer> */}
        <div className="pt-16 pb-8 mt-auto">
          <SvgHolaglow width={150} height={40} fill={HOLAGLOW_COLORS['lime']} />
        </div>
      </Flex>
    </main>
  );
}
