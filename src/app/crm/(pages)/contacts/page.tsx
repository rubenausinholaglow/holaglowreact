import App from 'app/(web)/components/layout/App';
import ContainerCRM from 'app/crm/components/layout/ContainerCRM';
import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import LoginChecker from 'app/crm/components/login/LoginChecker';

import TableContacts from './components/tableContacts';

export default function ContactsPage() {
  return (
    <App>
      <MainLayoutCRM>
        <LoginChecker>
          <ContainerCRM>
            <TableContacts />
          </ContainerCRM>
        </LoginChecker>
      </MainLayoutCRM>
    </App>
  );
}
