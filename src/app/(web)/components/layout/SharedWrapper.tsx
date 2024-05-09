import { ReactNode } from 'react';
import App from 'app/(web)/components/layout/App';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import MainLayout from 'app/(web)/components/layout/MainLayout';

export default function SharedWrapper({
  children,
  isDerma,
  hideButton = false,
  hideNavigation = false,
  hideFooter = false,
  hideBackButton = false,
  isCheckout = false,
  hideHeader = false,
}: {
  children: ReactNode;
  isDerma: boolean;
  hideButton?: boolean;
  hideNavigation?: boolean;
  hideFooter?: boolean;
  hideBackButton?: boolean;
  isCheckout?: boolean;
  hideHeader?: boolean;
}) {
  if (isDerma) {
    return (
      <DermaLayout
        hideButton={hideButton}
        hideNavigation={hideNavigation}
        hideFooter={hideFooter}
      >
        {children}
      </DermaLayout>
    );
  }

  return (
    <App>
      <MainLayout
        isCheckout={isCheckout}
        hideHeader={hideHeader}
        hideFooter={hideFooter}
        hideBackButton={hideBackButton}
      >
        {children}
      </MainLayout>
    </App>
  );
}
