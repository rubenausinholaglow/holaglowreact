'use client';
import 'react-datepicker/dist/react-datepicker.css';
import 'app/(web)/checkout/agenda/datePickerStyle.css';

import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { BudgetAnalyticsDto } from '@interface/budget';
import { budgetService } from '@services/BudgetService';
import App from 'app/(web)/components/layout/App';
import ContainerCRM from 'app/crm/components/layout/ContainerCRM';
import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import LoginChecker from 'app/crm/components/login/LoginChecker';
import es from 'date-fns/locale/es';
import dayjs, { Dayjs } from 'dayjs';
import { Flex } from 'designSystem/Layouts/Layouts';
import { start } from 'repl';

registerLocale('es', es);

export default function BudgetsPage() {
  const [startDateFilter, setStartDateFilter] = useState<Date>(new Date());
  const [firstMonthAnalytics, setFirstMonthAnalytics] = useState<
    BudgetAnalyticsDto | undefined
  >(undefined);
  const [secondtMonthAnalytics, setSecondMonthAnalytics] = useState<
    BudgetAnalyticsDto | undefined
  >(undefined);
  const getFromDate = async (date: Dayjs) => {
    const data = await budgetService.getBudgetAnalytics(
      date.format('YYYY-MM-DD')
    );
    if (date.month() == startDateFilter?.getMonth())
      setFirstMonthAnalytics(data);
    else setSecondMonthAnalytics(data);
  };
  useEffect(() => {
    getFromDate(dayjs(startDateFilter));

    getFromDate(dayjs(startDateFilter).add(-1, 'month'));
  }, [startDateFilter]);

  const getRow = (n: number, n2: number, total: number) => {
    return (
      <>
        <label>{n}</label>
        <label>{((n / total) * 100).toFixed(2)}</label>
        <label>{n2}€</label>
      </>
    );
  };

  const getTable = (metrics: BudgetAnalyticsDto) => {
    return (
      <>
        <Flex layout="row-left">
          <label>Pendiente: </label>
          {getRow(
            metrics.pendingCount,
            metrics.pendingMoney,
            metrics.totalCount
          )}
        </Flex>
        <Flex layout="row-left">
          <label>Seguimiento: </label>
          {getRow(
            metrics.contactedCount,
            metrics.contactedMoney,
            metrics.totalCount
          )}
        </Flex>
        <Flex layout="row-left">
          <label>Convertidos: </label>
          {getRow(metrics.paidCount, metrics.paidMoney, metrics.totalCount)}
        </Flex>
        <Flex layout="row-left">
          <label>Rechazados: </label>
          {getRow(
            metrics.rejectedCount,
            metrics.rejectedMoney,
            metrics.totalCount
          )}
        </Flex>
        <Flex layout="row-left">
          <label>Total: </label>
          {getRow(metrics.totalCount, metrics.totalMoney, metrics.totalCount)}
        </Flex>
      </>
    );
  };
  return (
    <App>
      <MainLayoutCRM>
        <ContainerCRM>
          <label className="text-gray-700 mb-2 w-full text-left">Fecha:</label>
          <DatePicker
            selected={startDateFilter}
            onChange={date => {
              setStartDateFilter(date!);
            }}
            useWeekdaysShort
            calendarStartDay={1}
            locale="es"
            className="w-full"
            fixedHeight
            popperClassName="pepper-datepicker"
            popperPlacement="bottom"
            showYearDropdown
            showMonthDropdown
            dateFormat="dd/MM/yyyy"
          ></DatePicker>
          {firstMonthAnalytics && (
            <Flex layout="col-center">
              {dayjs(startDateFilter).format('MMMM')}
              {getTable(firstMonthAnalytics)}
            </Flex>
          )}
          {secondtMonthAnalytics && (
            <Flex layout="col-center">
              {dayjs(startDateFilter).add(-1, 'month').format('MMMM')}
              {getTable(secondtMonthAnalytics)}
            </Flex>
          )}
        </ContainerCRM>
      </MainLayoutCRM>
    </App>
  );
}
