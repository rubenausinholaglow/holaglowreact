'use client';
import React from 'react';
import Card from 'app/crm/components/card/Card';

interface DashboardPageProps {
  pendingTasks: any;
}

export default function DashboardPage({ pendingTasks }: DashboardPageProps) {
  const cardsData = [
    { title: 'TAREAS PENDIENTES HOY', number: 10 },
    { title: 'TAREAS EN CURSO AHORA', number: 20 },
    { title: 'TAREAS COMPLETADAS HOY', number: 30 },
    { title: 'TAREAS COMPLETADAS', number: 40 },
    { title: 'CONTACTOS DESANTENDIDOS', number: 50 },
    { title: 'EMAILS SIN RESPUESTA', number: 60 },
    { title: 'LLAMADA SIN RESPUESTA', number: 70 },
    { title: 'WHATSAPP SIN RESPUESTA', number: 80 },
  ];
  return (
    <div>
      DashboardPage
      <div className="flex flex-wrap justify-center">
        {cardsData.map((card, index) => (
          <div key={index} className="w-64 md:w-1/4 p-4">
            <Card key={index} title={card.title} number={card.number} />
          </div>
        ))}
      </div>
    </div>
  );
}
