import React from 'react';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import Link from 'next/link';

import bugsnagClient from '../../bugsnag.config';

bugsnagClient.use(BugsnagPluginReact, React);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Link href="/user/budget">budget</Link>
      <Link href="/user/passport">passport</Link>
      <Link href="/dashboard" className="text-black">
        dashboard
      </Link>
      <Link href="/form">form</Link>
      <Link href="/dashboard" className="text-black">
        dashboard
      </Link>
    </main>
  );
}
