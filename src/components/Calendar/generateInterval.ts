import { eachDayOfInterval, format, parseISO } from 'date-fns';
import { DateData } from 'react-native-calendars';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { IMarkedDatesProps } from './index';
import { theme } from '../../styles/theme';

export const generateInterval = (start: DateData, end: DateData) => {
  let interval = {} as IMarkedDatesProps;

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach((item) => {
    const date = format(getPlatformDate(item), 'yyyy-MM-dd');

    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.main
            : theme.colors.main_light,

        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.main_light
            : theme.colors.main,
      },
    };
  });

  return interval;
};
