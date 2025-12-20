import { ReservationCountByDayDto } from '../dto/find-reservations-chart-data.dto';

export const formatReservationChartDataResponse = (
  rawResults: { date: string | Date; count: string }[],
  fromDate: Date,
  toDate: Date,
): ReservationCountByDayDto[] => {
  const dataMap = new Map<string, number>();

  rawResults.forEach((result) => {
    const dateString =
      typeof result.date === 'string'
        ? result.date
        : new Date(result.date).toISOString().split('T')[0];
    dataMap.set(dateString, parseInt(result.count, 10));
  });

  const formattedData: ReservationCountByDayDto[] = [];
  const currentDate = new Date(fromDate);

  while (currentDate <= toDate) {
    const dateString = currentDate.toISOString().split('T')[0];
    formattedData.push({
      date: dateString,
      count: dataMap.get(dateString) || 0,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return formattedData;
};
