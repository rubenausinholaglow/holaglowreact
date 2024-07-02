'use client';
import App from 'app/(web)/components/layout/App';
import ContainerCRM from 'app/crm/components/layout/ContainerCRM';
import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import LoginChecker from 'app/crm/components/login/LoginChecker';
import 'react-datepicker/dist/react-datepicker.css';
import 'app/(web)/checkout/agenda/datePickerStyle.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { useEffect, useState } from 'react';
import { BudgetAnalyticsDto } from '@interface/budget';
import { Flex } from 'designSystem/Layouts/Layouts';
import dayjs, { Dayjs } from 'dayjs';
import { budgetService } from '@services/BudgetService';
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
    var data = await budgetService.getBudgetAnalytics(
      date.format('YYYY-MM-DD')
    );
    if (date.month() == startDateFilter?.getMonth())
      setFirstMonthAnalytics(data);
    else setSecondMonthAnalytics(data);
  };
  useEffect(() => {
    getFromDate(dayjs(startDateFilter));

    getFromDate(dayjs(startDateFilter).add(-1, 'month'));
  }, []);

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
            <Flex>{dayjs(startDateFilter).format('MMMM')}</Flex>
          )}
          {secondtMonthAnalytics && (
            <Flex>
              {dayjs(startDateFilter).add(-1, 'month').format('MMMM')}
            </Flex>
          )}
        </ContainerCRM>
      </MainLayoutCRM>
    </App>
  );
}
