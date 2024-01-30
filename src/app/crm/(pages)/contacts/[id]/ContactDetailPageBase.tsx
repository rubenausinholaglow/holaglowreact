'use client';
import React from 'react';
import { ClientDetails } from 'app/crm/types/Contact';
import { TaskColumns } from 'app/crm/utils/contactColumns';
import { mappingTasks } from 'app/crm/utils/mappingColumns';

import CardContact from '../components/cardContact';
import DataTableContact from '../components/dataTableContact';
import Tabs from '../components/tabs';

interface ContactDetailPageProps {
  contactDetail: ClientDetails;
}

export default function ContactDetailPageBase({ contactDetail }: ContactDetailPageProps) {
  
  const tabs = [
    {
      label: 'Tareas',
      component: (
        <DataTableContact
          columns={TaskColumns}
          rows={mappingTasks(contactDetail.taskInstances)}
        />
      ),
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
