import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import LoginChecker from 'app/crm/components/login/LoginChecker';
import { Flex } from 'designSystem/Layouts/Layouts';

export default function MenuPage() {
  return (
    <MainLayoutCRM>
      <LoginChecker>
        <Flex className="items-center justify-center flex-col p-4 ">
          <div className="mb-4">Menú a CRM</div>
        </Flex>
      </LoginChecker>
    </MainLayoutCRM>
  );
}
