'use client';
import React from 'react';
import { ClientDetails } from 'app/crm/types/Contact';

import CardContact from '../components/cardContact';
import Tabs from '../components/tabs';

interface ContactDetailPageProps {
  contactDetail: ClientDetails;
}

export default function ContactDetailPageBase({ contactDetail }: ContactDetailPageProps) {
  const tabs = [
    {
      label: 'Tareas',
    },
    {
      label: 'Datos personales',
    },
    {
      label: 'Comentarios',
    },
    {
      label: 'Llamadas',
    },
    {
      label: 'Citas',
    },
    {
      label: 'Presupuestos',
    },
  ];

  return (
    <div className="rounded-xl bg-white ml-64 mt-2 mr-4 h-screen">
      <div>
        <CardContact contactInfo={contactDetail} />
      </div>
      <div>
        <Tabs tabs={tabs} defaultTab="Tareas" />
      </div>
    </div>
  );
}
