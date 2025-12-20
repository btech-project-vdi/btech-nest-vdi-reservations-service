import { ReservationCountByHourDto } from '../dto/find-reservations-chart-data-by-hours.dto';

export const formatReservationChartDataByHoursResponse = (
  rawResults: { hour: string | number; count: string }[],
): ReservationCountByHourDto[] => {
  const dataMap = new Map<string, number>();

  rawResults.forEach((result) => {
    const hourNumber =
      typeof result.hour === 'string' ? parseInt(result.hour, 10) : result.hour;
    const hourString = hourNumber.toString().padStart(2, '0') + ':00';
    dataMap.set(hourString, parseInt(result.count, 10));
  });

  const formattedData: ReservationCountByHourDto[] = [];

  for (let hour = 0; hour < 24; hour++) {
    const hourString = hour.toString().padStart(2, '0') + ':00';
    formattedData.push({
      hour: hourString,
      count: dataMap.get(hourString) || 0,
    });
  }

  return formattedData;
};
