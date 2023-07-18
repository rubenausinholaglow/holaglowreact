import { Container } from 'components/Layouts/Layouts';
import { SvgHolaglow } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full text-black text-md">
      <header className="border-b py-8">
        <Container>
          <SvgHolaglow height={24} width={98} fill={HOLAGLOW_COLORS['lime']} />
        </Container>
      </header>

      {children}
    </main>
  );
}
