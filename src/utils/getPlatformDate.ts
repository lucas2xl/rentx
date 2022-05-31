import { addDays, format } from 'date-fns';

export const getPlatformDate = (date: Date) => {
  return addDays(date, 1);
};

export const incrementTimezone = (date: number) => {
  return date + new Date(date).getTimezoneOffset() * 60 * 1000;
};

export const formaDate = (date: string | number) => {
  return format(incrementTimezone(new Date(date).getTime()), 'dd/MM/yyyy');
};
