import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import LoginChecker from 'app/crm/components/login/LoginChecker';

import TableContacts from './components/tableContacts';

export default function ContactsPage() {
  return (
    <MainLayoutCRM>
      <LoginChecker>
        <TableContacts />
      </LoginChecker>
    </MainLayoutCRM>
  );
}
