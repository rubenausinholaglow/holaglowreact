import React from 'react';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import BugsnagPerformance from '@bugsnag/browser-performance';
import type { Metadata } from 'next';
import MainLayout from './components/layout/MainLayout';
import HomeBlocks from './HomeBlocks';

export const metadata: Metadata = {
  title: 'Holaglow - La nueva cara de la medicina estética',
  description:
    'Di adiós a los prejuicios y haz realidad tu propia idea de belleza con tratamientos estéticos eficaces',
};
Bugsnag.start({
  apiKey: 'bd4b9a1e96dd2a5c39cbf8d487763afc',
  plugins: [new BugsnagPluginReact()],
});
BugsnagPerformance.start({ apiKey: 'bd4b9a1e96dd2a5c39cbf8d487763afc' });

const ErrorBoundary = Bugsnag.getPlugin('react')!.createErrorBoundary(React);
export default function Home() {
  return (
    <ErrorBoundary>
      <MainLayout>
        <HomeBlocks />
      </MainLayout>
    </ErrorBoundary>
  );
}
