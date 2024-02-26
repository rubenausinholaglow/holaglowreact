'use client';
import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';

import Agenda from './Agenda';

export default function AgendaCheckout() {
  return <Agenda isDashboard={false} />;
}
