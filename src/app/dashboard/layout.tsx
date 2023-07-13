import { Container } from 'components/Layouts/Layouts';
import { SvgHolaglow } from 'icons/Icons';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full text-black">
      <header className="border-b py-8">
        <Container>
          <SvgHolaglow height={24} width={98} />
        </Container>
      </header>

      {children}
    </main>
  );
}
