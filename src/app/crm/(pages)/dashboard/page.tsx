import React from 'react';
import useAsyncServer from '@utils/useAsyncServer';
import ContainerCRM from 'app/crm/components/layout/ContainerCRM';
import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import LoginChecker from 'app/crm/components/login/LoginChecker';

import DashboardPage from './DashboardPage';

export default async function Dashboard() {
  const pendingTasks = await useAsyncServer(
    `${process.env.REACT_APP__CONTACTS_API}Tasks/Pending`
  );
  return (
    <MainLayoutCRM>
      <LoginChecker>
        <ContainerCRM>
          <DashboardPage pendingTasks={pendingTasks} />
        </ContainerCRM>
      </LoginChecker>
    </MainLayoutCRM>
  );
}
