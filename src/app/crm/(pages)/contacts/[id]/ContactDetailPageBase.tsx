'use client';
import React from 'react';
import { SvgCalendar, SvgMedicine, SvgPhone } from 'app/icons/Icons';
import { Flex } from 'designSystem/Layouts/Layouts';

import Tabs from '../components/tabs';

export default function ContactDetailPageBase({ contactDetail }: any) {
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
      <Tabs tabs={tabs} defaultTab="Tareas" />
    </div>
  );
}
