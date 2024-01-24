import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import LoginChecker from 'app/crm/components/login/LoginChecker';

export default function MenuPage() {
  return (
    <MainLayoutCRM>
      <LoginChecker>
        <div className="rounded-xl bg-white ml-64 mt-2 mr-4 h-screen">
          test menu
        </div>
      </LoginChecker>
    </MainLayoutCRM>
  );
}
