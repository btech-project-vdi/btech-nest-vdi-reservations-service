import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationLaboratoryEquipment } from '../../entities/reservation-laboratory-equipment.entity';
import {
  FindReservationsChartDataByHoursDto,
  FindReservationsChartDataByHoursResponseDto,
} from '../../dto/find-reservations-chart-data-by-hours.dto';
import { calculateChartTimePeriodDatesForHours } from '../../helpers/calculate-chart-time-period-dates-for-hours.helper';
import { formatReservationChartDataByHoursResponse } from '../../helpers/format-reservation-chart-data-by-hours-response.helper';
import { ChartTimePeriod } from '../../enums/chart-time-period.enum';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ReservationLaboratoryEquipmentFindChartDataByHoursService {
  constructor(
    @InjectRepository(ReservationLaboratoryEquipment)
    private readonly reservationLaboratoryEquipmentRepository: Repository<ReservationLaboratoryEquipment>,
  ) {}

  async execute(
    findReservationsChartDataByHoursDto: FindReservationsChartDataByHoursDto,
  ): Promise<FindReservationsChartDataByHoursResponseDto> {
    const {
      laboratoryEquipmentIds,
      timePeriod,
      startDate,
      endDate,
      subscriptionDetailId,
    } = findReservationsChartDataByHoursDto;

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

    const { fromDate, toDate } = calculateChartTimePeriodDatesForHours(
      timePeriod,
      startDate,
      endDate,
    );

    const queryBuilder = this.reservationLaboratoryEquipmentRepository
      .createQueryBuilder('rle')
      .select('HOUR(rle.initialHour)', 'hour')
      .addSelect('COUNT(*)', 'count')
      .where('rle.reservationDate BETWEEN :fromDate AND :toDate', {
        fromDate,
        toDate,
      })
      .andWhere('rle.subscriptionDetailId = :subscriptionDetailId', {
        subscriptionDetailId,
      })
      .groupBy('hour')
      .orderBy('hour', 'ASC');

    if (laboratoryEquipmentIds && laboratoryEquipmentIds.length > 0)
      queryBuilder.andWhere(
        'rle.laboratoryEquipmentId IN (:...laboratoryEquipmentIds)',
        {
          laboratoryEquipmentIds,
        },
      );

    const rawResults = await queryBuilder.getRawMany<{
      hour: number;
      count: string;
    }>();

    const formattedData = formatReservationChartDataByHoursResponse(rawResults);

    return {
      data: formattedData,
    };
  }
}
