'use client';
import 'react-datepicker/dist/react-datepicker.css';
import '../components/datePicker.css';

import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { reminderAction } from 'app/crm/actions/ContactReminderAction';
import ContainerCRM from 'app/crm/components/layout/ContainerCRM';
import WhatsApp from 'app/crm/components/whatsapp/WhatsApp';
import { ClientDetails } from 'app/crm/types/Contact';
import getAppointmentStatusText from 'app/crm/types/ContactAppointmentEnum';
import getBudgetStatusText from 'app/crm/types/ContactBudgetEnum';
import getCallStatusText from 'app/crm/types/ContactCallEnum';
import getTaskStatusText from 'app/crm/types/ContactTaskEnum';
import {
  AppointmentsColumns,
  BudgetColumns,
  CallsColumns,
  CommentsColumns,
  TaskColumns,
} from 'app/crm/utils/contactColumns';
import {
  mappingAppointments,
  mappingBudgets,
  mappingCalls,
  mappingComments,
  mappingTasks,
} from 'app/crm/utils/mappingColumns';
import {
  getContactAppointment,
  getContactBudget,
  getContactCalls,
  getContactComments,
  getContactTasks,
} from 'app/GraphQL/query/ContactDetailQuery';
import es from 'date-fns/locale/es';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';

import CardContact from '../components/cardContact';
import ModalContact from '../components/modalContact';
import Tabs from '../components/tabs';
import GraphQLComponentBase from './GraphQLComponentBase';

dayjs.locale(spanishConf);
registerLocale('es', es);

interface ContactDetailPageProps {
  contactDetail: ClientDetails;
}

export default function ContactDetailPageBase({
  contactDetail,
}: ContactDetailPageProps) {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [identifier, setIdentifier] = useState<string>('');
  const [commentReminder, setCommentReminder] = useState<string>('');

  const checkIfHasAgent = () => {
    const result = contactDetail['agent'] !== null;
    return result;
  };

  const tabs = [
    {
      label: 'Tareas',
      component: (
        <GraphQLComponentBase
          columns={TaskColumns}
          mapping={mappingTasks}
          gqlName={getContactTasks(contactDetail?.id)}
          statusTypeSwitch={getTaskStatusText}
          tabName={'Tareas'}
        />
      ),
    },
    {
      label: 'Datos personales',
      component: (
        <div className="py-10 max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-xl">
          <div className="px-4 mb-4">
            Telefono: {contactDetail?.phonePrefix} {contactDetail?.phone}
          </div>
          <div className="px-4 mb-4">Email: {contactDetail?.email}</div>
          {checkIfHasAgent() && (
            <div className="px-4 mb-4">
              Agente: {contactDetail?.agent?.username}
            </div>
          )}
        </div>
      ),
    },
    {
      label: 'Comentarios',
      component: (
        <GraphQLComponentBase
          columns={CommentsColumns}
          mapping={mappingComments}
          gqlName={getContactComments(contactDetail?.id)}
          tabName={'Comentarios'}
        />
      ),
    },
    {
      label: 'Llamadas',
      component: (
        <GraphQLComponentBase
          columns={CallsColumns}
          mapping={mappingCalls}
          gqlName={getContactCalls(contactDetail?.id)}
          statusTypeSwitch={getCallStatusText}
          tabName={'Llamadas'}
        />
      ),
    },
    {
      label: 'Citas',
      component: (
        <GraphQLComponentBase
          columns={AppointmentsColumns}
          mapping={mappingAppointments}
          gqlName={getContactAppointment(contactDetail?.id)}
          statusTypeSwitch={getAppointmentStatusText}
          tabName={'Citas'}
        />
      ),
    },
    {
      label: 'Presupuestos',
      component: (
        <GraphQLComponentBase
          columns={BudgetColumns}
          mapping={mappingBudgets}
          gqlName={getContactBudget(contactDetail?.id)}
          statusTypeSwitch={getBudgetStatusText}
          tabName={'Presupuestos'}
        />
      ),
    },
  ];

  const handleContactReminder = (event: any) => {
    event.preventDefault();
    reminderAction(startDate, commentReminder, contactDetail?.id, identifier);
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="basis-2/3 rounded-xl mx-auto bg-white ml-64 mt-2 mr-4 px-4 py-4 overflow-y-auto" style={{height: "90.9vh"}}>
          <CardContact
            contactInfo={contactDetail}
            isVisibleModal={isVisibleModal}
            setIsVisibleModal={setIsVisibleModal}
            setIdentifier={setIdentifier}
          />

          <Tabs tabs={tabs} defaultTab="Tareas" />
        </div>
        <div className="basis-1/4 rounded-xl mx-auto bg-white mt-2 mr-4 px-4 py-4  h-96 overflow-y-auto" style={{height: "90.9vh"}}>
          <WhatsApp contactDetail={contactDetail} />
        </div>
      </div>
      <ModalContact isOpen={isVisibleModal} closeModal={setIsVisibleModal}>
        <form onSubmit={handleContactReminder}>
          <div className="flex flex-wrap flex-col align-middle">
            <div className="p-4">
              <h3 className="font-bold">{identifier}</h3>
            </div>
            <div className="p-4">
              <label htmlFor="datePicker">Fecha y hora del recordatorio</label>
            </div>
            <Container className="px-0 md:px-4 relative">
              <Flex
                className={`transition-opacity w-full mb-6 md:mb-0`}
                id="datepickerWrapper"
              >
                <DatePicker
                  name="datePicker"
                  onChange={(date: Date) => setStartDate(date)}
                  minDate={new Date()}
                  useWeekdaysShort
                  calendarStartDay={1}
                  inline
                  locale="es"
                  className="w-full"
                  selected={startDate}
                  showDisabledMonthNavigation
                  timeInputLabel="Hora:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  showTimeInput
                ></DatePicker>
              </Flex>
            </Container>

            <div className="p-4">
              <label htmlFor="comment">Comentario</label>
              <input
                type="text"
                placeholder="Comentario"
                name="comment"
                className="border border-hg-tertiary rounded px-2 py-1 mt-2 text-black w-full mb-6"
                onChange={event =>
                  setCommentReminder(event.currentTarget.value)
                }
              />
            </div>
            <div className="p-4 flex-row">
              <Button
                type="primary"
                className="mr-4"
                onClick={() => setIsVisibleModal(!isVisibleModal)}
              >
                Cancelar
              </Button>
              <Button type="primary" isSubmit>
                Añadir
              </Button>
            </div>
          </div>
        </form>
      </ModalContact>
    </>
  );
}
