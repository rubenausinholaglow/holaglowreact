'use client';
import React from 'react';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react';
import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import { SvgCalendar, SvgMedicine, SvgPhone } from 'app/icons/Icons';
import { useSessionStore } from 'app/stores/globalStore';
import { Flex } from 'designSystem/Layouts/Layouts';

interface ContactDetailProps {
  params: any;
}

export default function ContactDetailPage({ params }: ContactDetailProps) {
  const { userLoginResponse } = useSessionStore(state => state);

  const data = [
    {
      label: 'Tareas',
      value: 'Tareas',
      icon: <SvgPhone />,
      desc: 'Hola',
    },
    {
      label: 'Datos personales',
      value: 'Datos personales',
      icon: <SvgMedicine />,
      desc: 'Hola1',
    },
    {
      label: 'Comentarios',
      value: 'Comentarios',
      icon: <SvgPhone />,
      desc: 'Hola2',
    },
    {
      label: 'Llamadas',
      value: 'Llamadas',
      icon: <SvgPhone />,
      desc: 'Hola3',
    },
    {
      label: 'Citas',
      value: 'Citas',
      icon: <SvgCalendar />,
      desc: 'Hola4',
    },
    {
      label: 'Presupuestos',
      value: 'Presupuestos',
      icon: <SvgPhone />,
      desc: 'Hola5',
    },
  ];

  return (
    <MainLayoutCRM>
      <div className="rounded-xl bg-white ml-64 mt-2 mr-4 h-screen">
        <Tabs value="Tareas">
          <TabsHeader>
            {data.map(({ label, value, icon, desc }) => (
              <Tab key={value} value={value}>
                <Flex layout="row-center" className="">
                  {icon}
                  {label}
                </Flex>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </MainLayoutCRM>
  );
}
