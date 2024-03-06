'use client';
import React from 'react';
import Card from 'app/crm/components/card/Card';

import TableDashboard from './TableDashboard/TableDashboard';

interface DashboardPageProps {
  pendingTasks: any;
}

export default function DashboardPage({ pendingTasks }: DashboardPageProps) {
  const cardsData = [
    {
      title: 'TAREAS PENDIENTES HOY',
      number: 10,
      backgroundColor: '#005cff',
    },
    {
      title: 'TAREAS EN CURSO AHORA',
      number: 20,
      backgroundColor: '#0086ff',
    },
    {
      title: 'TAREAS COMPLETADAS HOY',
      number: 30,
      backgroundColor: '#00a5ff',
    },
    { title: 'TAREAS COMPLETADAS', number: 40, backgroundColor: '#00c0e5' },
    {
      title: 'CONTACTOS DESANTENDIDOS',
      number: 50,
      backgroundColor: '#005cff',
    },
    { title: 'EMAILS SIN RESPUESTA', number: 60, backgroundColor: '#0086ff' },
    {
      title: 'LLAMADA SIN RESPUESTA',
      number: 70,
      backgroundColor: '#00a5ff',
    },
    {
      title: 'WHATSAPP SIN RESPUESTA',
      number: 80,
      backgroundColor: '#00c0e5',
    },
  ];
  //  console.log(pendingTasks); TempConsoleLog
  return (
    <div>
      DashboardPage
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-center">
        {cardsData.map((card, index) => (
          <div key={index} className="w-full">
            <Card
              key={index}
              title={card.title}
              number={card.number}
              backgroundColor={card.backgroundColor}
            />
          </div>
        ))}
      </div>
      <TableDashboard pendingTasks={pendingTasks} />
    </div>
  );
}
