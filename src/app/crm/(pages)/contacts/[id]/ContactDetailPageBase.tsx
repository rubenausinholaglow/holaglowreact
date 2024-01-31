'use client';
import 'react-datepicker/dist/react-datepicker.css';
import '../components/datePicker.css';

import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { ClientDetails } from 'app/crm/types/Contact';
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
import { Container, Flex } from 'designSystem/Layouts/Layouts';

import CardContact from '../components/cardContact';
import DataTableContact from '../components/dataTableContact';
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
      component: (
        <div className="py-10 max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-xl">
          <div className="px-4 mb-4">
            Telefono: {contactDetail.phonePrefix} {contactDetail.phone}
          </div>
          <div className="px-4 mb-4">Email: {contactDetail.email}</div>
          <div className="px-4 mb-4">
            Agente: {contactDetail.agent.username}
          </div>
        </div>
      ),
    },
    {
      label: 'Comentarios',
      component: (
        <DataTableContact
          columns={CommentsColumns}
          rows={mappingComments(contactDetail.comments)}
        />
      ),
    },
    {
      label: 'Llamadas',
      component:
        contactDetail.calls.length === 0 ? (
          <div>No se ha encontrado información de llamadas.</div>
        ) : (
          <DataTableContact
            columns={CallsColumns}
            rows={mappingCalls(contactDetail.calls)}
          />
        ),
    },
    {
      label: 'Citas',
      component: (
        <DataTableContact
          columns={AppointmentsColumns}
          rows={mappingAppointments(contactDetail.appointments)}
        />
      ),
    },
    {
      label: 'Presupuestos',
      component:
        contactDetail.calls.length === 0 ? (
          <div>No se ha encontrado información de presupuestos.</div>
        ) : (
          <DataTableContact
            columns={BudgetColumns}
            rows={mappingBudgets(contactDetail.budgets)}
          />
        ),
    },
  ];

  return (
    <>
      <div className="rounded-xl bg-white ml-64 mt-2 mr-4 mb-10 h-screen">
        <CardContact
          contactInfo={contactDetail}
          isVisibleModal={isVisibleModal}
          setIsVisibleModal={setIsVisibleModal}
        />

        <Tabs tabs={tabs} defaultTab="Tareas" />
      </div>
      <ModalContact isOpen={isVisibleModal} closeModal={setIsVisibleModal}>
        <form>
          <div className="flex flex-wrap flex-col align-middle">
            <div className="p-4">
              <h3 className="font-bold">Recordatorio</h3>
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
              />
            </div>
            <div className="p-4 flex-row">
              <button
                type="button"
                className="text-black font-bold py-2 px-4 rounded"
                onClick={() => setIsVisibleModal(!isVisibleModal)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className=" text-black font-bold py-2 px-4 rounded"
              >
                Añadir
              </button>
            </div>
          </div>
        </form>
      </ModalContact>
    </>
  );
}
