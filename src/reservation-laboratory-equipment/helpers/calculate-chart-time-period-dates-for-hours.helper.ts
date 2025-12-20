import { ChartTimePeriod } from '../enums/chart-time-period.enum';
import { getCurrentDateInTimezone } from 'src/schedulers/helpers/timezone.helper';

export interface ChartTimePeriodDatesForHours {
  fromDate: Date;
  toDate: Date;
}

export const calculateChartTimePeriodDatesForHours = (
  timePeriod?: ChartTimePeriod,
  startDate?: string,
  endDate?: string,
): ChartTimePeriodDatesForHours => {
  const now = getCurrentDateInTimezone('America/Lima');
  let fromDate: Date = new Date(now);
  let toDate: Date = new Date(now);

  // Default behavior: current day from 00:00 to 23:59
  if (!timePeriod) {
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(23, 59, 59, 999);
    return { fromDate, toDate };
  }

  switch (timePeriod) {
    case ChartTimePeriod.CUSTOM:
      if (startDate && endDate) {
        fromDate = new Date(startDate);
        fromDate.setHours(0, 0, 0, 0);
        toDate = new Date(endDate);
        toDate.setHours(23, 59, 59, 999);
      } else {
        // Fallback to current day if custom dates are not provided
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 999);
      }
      break;

    case ChartTimePeriod.LAST_WEEK:
      fromDate.setDate(now.getDate() - 7);
      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(23, 59, 59, 999);
      break;

    case ChartTimePeriod.LAST_30_DAYS:
      fromDate.setDate(now.getDate() - 30);
      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(23, 59, 59, 999);
      break;

    case ChartTimePeriod.LAST_3_MONTHS:
      fromDate.setMonth(now.getMonth() - 3);
      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(23, 59, 59, 999);
      break;

    case ChartTimePeriod.LAST_YEAR:
      fromDate.setFullYear(now.getFullYear() - 1);
      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(23, 59, 59, 999);
      break;

    case ChartTimePeriod.CURRENT_MONTH:
      fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
      fromDate.setHours(0, 0, 0, 0);
      toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      toDate.setHours(23, 59, 59, 999);
      break;

    default:
      // Fallback to current day if an unknown timePeriod is provided
      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(23, 59, 59, 999);
      break;
  }

  return { fromDate, toDate };
};
