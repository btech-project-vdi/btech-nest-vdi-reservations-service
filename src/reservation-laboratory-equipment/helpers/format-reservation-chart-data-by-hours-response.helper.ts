import { ReservationCountByHourDto } from '../dto/find-reservations-chart-data-by-hours.dto';

export const formatReservationChartDataByHoursResponse = (
  rawResults: { hour: number; count: string }[],
): ReservationCountByHourDto[] => {
  const dataMap = new Map<number, number>();
  rawResults.forEach((result) => {
    dataMap.set(result.hour, parseInt(result.count, 10));
  });

  const formattedData: ReservationCountByHourDto[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const hourString = hour.toString().padStart(2, '0') + ':00';
    formattedData.push({
      hour: hourString,
      count: dataMap.get(hour) || 0,
    });
  }

  return formattedData;
};
