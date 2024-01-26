import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import LoginChecker from 'app/crm/components/login/LoginChecker';

export default function MenuPage() {
  return (
    <MainLayoutCRM>
      <LoginChecker>
        <div className="rounded-xl bg-white ml-72 mt-24 mr-4 h-screen">
          test a menu
        </div>
      </LoginChecker>
    </MainLayoutCRM>
  );
}
