'use client';

import { Component, ReactNode } from 'react';
import Bugsnag from '@bugsnag/js';
import { Analytics } from '@vercel/analytics/react';

import DermaFooter from './DermaFooter';
import DermaHeader from './DermaHeader';

class ErrorBoundary extends Component<any, any> {
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

export default function DermaLayout({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <main>
        <DermaHeader />
        {children}
        <DermaFooter className="pb-24" />
        <Analytics />
      </main>
    </ErrorBoundary>
  );
}
