'use client';

import { Container, Flex } from 'components/Layouts/Layouts';
import { SvgHolaglow, SvgShoppingCart } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

import { useCartStore } from './(pages)/budgets/stores/userCartStore';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = useCartStore(state => state.cart);

  return (
    <main className="h-full text-black text-md">
      <header className="border-b py-8">
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
      </header>

      {children}
    </main>
  );
}
