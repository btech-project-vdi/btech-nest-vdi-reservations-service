import { ChartTimePeriod } from '../enums/chart-time-period.enum';
import { getCurrentDateInTimezone } from 'src/schedulers/helpers/timezone.helper';

export interface ChartTimePeriodDates {
  fromDate: Date;
  toDate: Date;
}

export const calculateChartTimePeriodDates = (
  timePeriod?: ChartTimePeriod,
  startDate?: string,
  endDate?: string,
): ChartTimePeriodDates => {
  const now = getCurrentDateInTimezone('America/Lima');
  let fromDate: Date;
  let toDate: Date = now;

  if (!timePeriod) {
    fromDate = new Date(now);
    fromDate.setDate(now.getDate() - 7);
    toDate = new Date(now);
    toDate.setHours(23, 59, 59, 999);
    return { fromDate, toDate };
  }

  switch (timePeriod) {
    case ChartTimePeriod.CUSTOM:
      if (startDate && endDate) {
        fromDate = new Date(startDate);
        toDate = new Date(endDate);
        toDate.setHours(23, 59, 59, 999);
      } else {
        fromDate = new Date(now);
        fromDate.setDate(now.getDate() - 7);
        toDate = new Date(now);
        toDate.setHours(23, 59, 59, 999);
      }
      break;

    case ChartTimePeriod.LAST_WEEK:
      fromDate = new Date(now);
      fromDate.setDate(now.getDate() - 7);
      toDate = new Date(now);
      toDate.setHours(23, 59, 59, 999);
      break;

    case ChartTimePeriod.LAST_30_DAYS:
      fromDate = new Date(now);
      fromDate.setDate(now.getDate() - 30);
      toDate = new Date(now);
      toDate.setHours(23, 59, 59, 999);
      break;

    case ChartTimePeriod.LAST_3_MONTHS:
      fromDate = new Date(now);
      fromDate.setMonth(now.getMonth() - 3);
      toDate = new Date(now);
      toDate.setHours(23, 59, 59, 999);
      break;

    case ChartTimePeriod.LAST_YEAR:
      fromDate = new Date(now);
      fromDate.setMonth(now.getMonth() - 12);
      toDate = new Date(now);
      toDate.setHours(23, 59, 59, 999);
      break;

    case ChartTimePeriod.CURRENT_MONTH:
      fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
      toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      toDate.setHours(23, 59, 59, 999);
      break;

    default:
      fromDate = new Date(now);
      fromDate.setDate(now.getDate() - 7);
      toDate = new Date(now);
      toDate.setHours(23, 59, 59, 999);
  }

  return { fromDate, toDate };
};
