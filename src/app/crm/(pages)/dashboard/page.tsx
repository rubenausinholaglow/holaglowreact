import React from 'react';
import useAsyncServerGQL from '@utils/useAsyncServerGQL';
import ContainerCRM from 'app/crm/components/layout/ContainerCRM';
import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import LoginChecker from 'app/crm/components/login/LoginChecker';
import { getPendingTasks } from 'app/GraphQL/query/ContactDetailQuery';

import DashboardPage from './DashboardPage';

export default async function Dashboard() {
  const pendingTasks = await useAsyncServerGQL(getPendingTasks());

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
