'use client';

import React, { useEffect, useState } from 'react';
import { registerLocale } from 'react-datepicker';
import Bugsnag from '@bugsnag/js';
import { useGlobalStore } from 'app/stores/globalStore';
import es from 'date-fns/locale/es';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';

dayjs.locale(spanishConf);
registerLocale('es', es);

Bugsnag.start({
  apiKey: 'ddc16c7fe2c290310470f8ce76dfa563',
  appVersion: '1.0.1',
});
class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any | Readonly<any>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    Bugsnag.notify(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHydrated, setIsHydrated] = useState(false);
  const { setIsModalOpen, setIsMainScrollEnabled } = useGlobalStore(
    state => state
  );

  useEffect(() => {
    setIsModalOpen(false);
    setIsMainScrollEnabled(true);
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <></>;
  }

  return (
    <ErrorBoundary>
      <>
        <main className="transition-all h-screen overflow-hidden flex flex-col w-full bg-gradient-15deg from-hg-primary300 to-hg-secondary500">
          {children}
        </main>
      </>
    </ErrorBoundary>
  );
}
