import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import Reagenda from 'app/(web)/reagenda/Reagenda';
import { Container } from 'designSystem/Layouts/Layouts';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <MainLayout isDashboard>
      <Container className="mt-4">
        <Reagenda isDashboard={true} />
      </Container>
    </MainLayout>
  );
}
