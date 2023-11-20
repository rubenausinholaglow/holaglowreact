import Agenda from 'app/checkout/agenda/page';
import MainLayout from 'app/components/layout/MainLayout';

export default function AgendaCheckIn() {
  return (
    <MainLayout
      isDashboard
      hideBackButton
      hideContactButtons
      hideProfessionalSelector
      hideBottomBar
    >
      <Agenda isDashboard={true} />
    </MainLayout>
  );
}
