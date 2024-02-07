import dayjs from 'dayjs';

export const getDateDayMonthYear = (
  date: string,
  separator: string
): string => {
  return dayjs(date).format(`DD${separator}MM${separator}YYYY`);
};

export const getDateWithTime = (date: string, separator: string): string => {
  return dayjs(date).format(`DD${separator}MM${separator}YYYY HH:mm:ss`);
};

export const getDateOnlyTime = (date: string): string => {
  return dayjs(date).format(`HH:mm`);
};
