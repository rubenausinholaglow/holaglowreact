import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import LoginChecker from 'app/crm/components/login/LoginChecker';
import Table from 'app/crm/components/table/table';

export default function ContactsPage() {
  return (
    <MainLayoutCRM>
      <LoginChecker>
        <div className="rounded-xl bg-white ml-64 mt-2 mr-4 h-screen">
          <Table />
        </div>
      </LoginChecker>
    </MainLayoutCRM>
  );
}
