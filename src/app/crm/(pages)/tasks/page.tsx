import App from 'app/(web)/components/layout/App';
import ContainerCRM from 'app/crm/components/layout/ContainerCRM';
import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import LoginChecker from 'app/crm/components/login/LoginChecker';

import TableTasks from './components/tableTasks';

export default function ContactsPage() {
  return (
    <App>
      <MainLayoutCRM>
        <LoginChecker>
          <ContainerCRM>
            <TableTasks />
          </ContainerCRM>
        </LoginChecker>
      </MainLayoutCRM>
    </App>
  );
}
