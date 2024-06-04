import App from 'app/(web)/components/layout/App';
import ContainerCRM from 'app/crm/components/layout/ContainerCRM';
import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import LoginChecker from 'app/crm/components/login/LoginChecker';
import TableBudgets from './components/tableBudgets';

export default function BudgetsPage() {
  return (
    <App>
      <MainLayoutCRM>
        <ContainerCRM>
          <TableBudgets></TableBudgets>
        </ContainerCRM>
      </MainLayoutCRM>
    </App>
  );
}
