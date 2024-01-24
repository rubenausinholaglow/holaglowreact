import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import LoginChecker from 'app/crm/components/login/LoginChecker';

import TableContacts from './components/tableContacts';

export default function ContactsPage() {
  return (
    <MainLayoutCRM>
      <LoginChecker>
        <div className="rounded-xl bg-white ml-64 mt-2 mr-4 h-screen">
          <TableContacts />
        </div>
      </LoginChecker>
    </MainLayoutCRM>
  );
}
