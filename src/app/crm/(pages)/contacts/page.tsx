import AppWrapper from 'app/(web)/components/layout/AppWrapper';
import ContainerCRM from 'app/crm/components/layout/ContainerCRM';
import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import LoginChecker from 'app/crm/components/login/LoginChecker';

import TableContacts from './components/tableContacts';

export default function ContactsPage() {
  return (
    <AppWrapper>
      <MainLayoutCRM>
        <LoginChecker>
          <ContainerCRM>
            <TableContacts />
          </ContainerCRM>
        </LoginChecker>
      </MainLayoutCRM>
    </AppWrapper>
  );
}
