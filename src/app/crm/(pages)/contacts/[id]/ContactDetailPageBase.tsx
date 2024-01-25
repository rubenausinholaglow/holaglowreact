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
import { Flex } from 'designSystem/Layouts/Layouts';

export default function ContactDetailPageBase({contactDetail} : any) {

  const data = [
    {
      label: 'Tareas',
      value: 'Tareas',
      icon: <SvgPhone />,
      desc: 'Test',
    },
    {
      label: 'Datos personales',
      value: 'Datos personales',
      icon: <SvgMedicine />,
      desc: 'Test1',
    },
    {
      label: 'Comentarios',
      value: 'Comentarios',
      icon: <SvgPhone />,
      desc: 'Test2',
    },
    {
      label: 'Llamadas',
      value: 'Llamadas',
      icon: <SvgPhone />,
      desc: 'Test3',
    },
    {
      label: 'Citas',
      value: 'Citas',
      icon: <SvgCalendar />,
      desc: 'Test4',
    },
    {
      label: 'Presupuestos',
      value: 'Presupuestos',
      icon: <SvgPhone />,
      desc: 'Test5',
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
