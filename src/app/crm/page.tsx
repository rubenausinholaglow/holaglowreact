import AuthenticationPage from './(pages)/authentication/page';
import MainLayoutCRM from './components/layout/MainLayoutCRM';

export default function Page() {
  return (
    <MainLayoutCRM>
      <AuthenticationPage />
    </MainLayoutCRM>
  );
}
