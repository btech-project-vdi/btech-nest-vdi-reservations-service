import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationLaboratoryEquipment } from '../../entities/reservation-laboratory-equipment.entity';
import {
  FindReservationsChartDataDto,
  FindReservationsChartDataResponseDto,
} from '../../dto/find-reservations-chart-data.dto';
import { calculateChartTimePeriodDates } from '../../helpers/calculate-chart-time-period-dates.helper';
import { formatReservationChartDataResponse } from '../../helpers/format-reservation-chart-data-response.helper';
import { ChartTimePeriod } from '../../enums/chart-time-period.enum';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ReservationLaboratoryEquipmentFindChartDataService {
  constructor(
    @InjectRepository(ReservationLaboratoryEquipment)
    private readonly reservationLaboratoryEquipmentRepository: Repository<ReservationLaboratoryEquipment>,
  ) {}

  async execute(
    findReservationsChartDataDto: FindReservationsChartDataDto,
  ): Promise<FindReservationsChartDataResponseDto> {
    const { laboratoryEquipmentIds, timePeriod, startDate, endDate } =
      findReservationsChartDataDto;

    if (timePeriod === ChartTimePeriod.CUSTOM && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 3)
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message:
            'La personalización de rango de fechas debe ser de al menos 3 días.',
        });
    }

    const { fromDate, toDate } = calculateChartTimePeriodDates(
      timePeriod,
      startDate,
      endDate,
    );

    const queryBuilder = this.reservationLaboratoryEquipmentRepository
      .createQueryBuilder('rle')
      .select('DATE(rle.reservationDate)', 'date')
      .addSelect('COUNT(*)', 'count')
      .where('DATE(rle.reservationDate) BETWEEN :fromDate AND :toDate', {
        fromDate: fromDate.toISOString().split('T')[0],
        toDate: toDate.toISOString().split('T')[0],
      })
      .groupBy('DATE(rle.reservationDate)')
      .orderBy('date', 'ASC');

    if (laboratoryEquipmentIds && laboratoryEquipmentIds.length > 0)
      queryBuilder.andWhere(
        'rle.laboratoryEquipmentId IN (:...laboratoryEquipmentIds)',
        {
          laboratoryEquipmentIds,
        },
      );

    const rawResults = await queryBuilder.getRawMany<{
      date: string | Date;
      count: string;
    }>();

    const formattedData = formatReservationChartDataResponse(
      rawResults,
      fromDate,
      toDate,
    );

    return {
      data: formattedData,
    };
  }
}
