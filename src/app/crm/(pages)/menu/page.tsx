import ContainerCRM from 'app/crm/components/layout/ContainerCRM';
import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import LoginChecker from 'app/crm/components/login/LoginChecker';

export default function MenuPage() {
  return (
    <LoginChecker>
      <ContainerCRM>Welcome !</ContainerCRM>
    </LoginChecker>
  );
}
