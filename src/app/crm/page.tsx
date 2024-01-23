import AuthenticationPage from './(pages)/authentication/page';
import MainLayoutCRM from './components/layout/MainLayoutCRM';
import LoginChecker from './components/login/LoginChecker';

export default function Page() {
  return (
    <MainLayoutCRM hideHeader>
      <LoginChecker isLoginPage>
        <AuthenticationPage />
      </LoginChecker>
    </MainLayoutCRM>
  );
}
