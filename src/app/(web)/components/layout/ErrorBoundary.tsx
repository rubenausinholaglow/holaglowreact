import { ReactNode, useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';

Bugsnag.start({
  apiKey: 'ddc16c7fe2c290310470f8ce76dfa563',
  appVersion: '1.0.1',
});

export default function ErrorBoundary({ children }: { children: ReactNode }) {
  const [hasError, setHasError] = useState(false);

  const handleError = (error: any, errorInfo: any) => {
    Bugsnag.notify(error, errorInfo);
    setHasError(true);
  };

  useEffect(() => {
    const handleWindowError = (event: Event) => {
      handleError((event as ErrorEvent).error, null);
    };

    window.addEventListener('error', handleWindowError);

    return () => {
      window.removeEventListener('error', handleWindowError);
    };
  }, []);

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return children;
}
