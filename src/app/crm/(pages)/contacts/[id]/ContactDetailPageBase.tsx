'use client';
import 'react-datepicker/dist/react-datepicker.css';
import '../components/datePicker.css';

import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { reminderAction } from 'app/crm/actions/ContactReminderAction';
import WhatsApp from 'app/crm/components/whatsapp/WhatsApp';
import { Appointment, ClientDetails, Lead } from 'app/crm/types/Contact';
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
import es from 'date-fns/locale/es';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';

import SimpleDataTable from '../../../components/simpleTable/SimpleDataTable';
import CardContact from '../components/cardContact';
import ModalContact from '../components/modalContact';
import Tabs from '../components/tabs';

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
      component:
        contactDetail?.taskInstances?.length === 0 ? (
          <div className="pl-5">No se han encontrado Tareas.</div>
        ) : (
          <SimpleDataTable
            columns={TaskColumns}
            rows={mappingTasks(contactDetail?.taskInstances)}
            statusTypeSwitch={getTaskStatusText}
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
      component:
        contactDetail?.comments?.length === 0 ? (
          <div className="pl-5">No se ha encontrado Comentarios.</div>
        ) : (
          <SimpleDataTable
            columns={CommentsColumns}
            rows={mappingComments(contactDetail?.comments)}
          />
        ),
    },
    {
      label: 'Llamadas',
      component:
        contactDetail?.calls?.length === 0 ? (
          <div className="pl-5">
            No se ha encontrado información de llamadas.
          </div>
        ) : (
          <SimpleDataTable
            columns={CallsColumns}
            rows={mappingCalls(contactDetail?.calls)}
            statusTypeSwitch={getCallStatusText}
          />
        ),
    },
    {
      label: 'Citas',
      component:
        contactDetail?.leads?.length === 0 ? (
          <div className="pl-5">No se ha encontrado información de citas.</div>
        ) : (
          <SimpleDataTable
            columns={AppointmentsColumns}
            rows={mappingAppointments(contactDetail?.leads?.map((lead: Lead) => lead.appointments.map((appointment : Appointment) => appointment)))}
            statusTypeSwitch={getAppointmentStatusText}
          />
        ),
    },
    {
      label: 'Presupuestos',
      component:
        contactDetail?.budgets?.length === 0 ? (
          <div className="pl-5">
            No se ha encontrado información de presupuestos.
          </div>
        ) : (
          <SimpleDataTable
            columns={BudgetColumns}
            rows={mappingBudgets(contactDetail?.budgets)}
            statusTypeSwitch={getBudgetStatusText}
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
      <div className="flex">
        <div className="w-2/3 rounded-xl bg-white ml-64 mt-2 mr-4 mb-10 h-screen">
          <CardContact
            contactInfo={contactDetail}
            isVisibleModal={isVisibleModal}
            setIsVisibleModal={setIsVisibleModal}
            setIdentifier={setIdentifier}
          />

          <Tabs tabs={tabs} defaultTab="Tareas" />
        </div>
        <div className="w-1/3 rounded-xl bg-white  mt-2  h-screen">
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
