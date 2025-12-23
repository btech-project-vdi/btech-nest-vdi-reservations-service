import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationLaboratoryEquipment } from '../../entities/reservation-laboratory-equipment.entity';
import { PaginationResponseDto } from 'src/common/dto/pagination.dto';
import { paginateQueryBuilder } from 'src/common/helpers/paginate-query-builder.helper';
import { formatAdminReservationDetailsResponse } from 'src/reservation-laboratory-equipment/helpers/format-admin-reservation-details-response.helper';
import { ReservationFindEquipmentMapService } from 'src/reservation/services/custom';
import {
  ConfirmListReservationDto,
  ConfirmListReservationResponseDto,
} from 'src/reservation-laboratory-equipment/dto/confirm-list-reservation.dto';
import { StatusReservation } from 'src/reservation/enums/status-reservation.enum';
import { SortByField } from 'src/reservation-laboratory-equipment/enums/sort-by-field.enum';

@Injectable()
export class ReservationLaboratoryEquipmentConfirmListService {
  constructor(
    @InjectRepository(ReservationLaboratoryEquipment)
    private readonly reservationLaboratoryEquipmentRepository: Repository<ReservationLaboratoryEquipment>,
    private readonly reservationFindEquipmentMapService: ReservationFindEquipmentMapService,
  ) {}

  async execute(
    findAdminReservationDetailsDto: ConfirmListReservationDto,
  ): Promise<PaginationResponseDto<ConfirmListReservationResponseDto>> {
    const { accessStatus, sortBy, subscriptionDetailId, ...paginationDto } =
      findAdminReservationDetailsDto;

    const sortByField = sortBy || SortByField.RESERVATION_DATE;

    const queryBuilder = this.reservationLaboratoryEquipmentRepository
      .createQueryBuilder('rle')
      .leftJoinAndSelect('rle.reservation', 'reservation')
      .select([
        'rle.reservationLaboratoryEquipmentId',
        'rle.laboratoryEquipmentId',
        'rle.subscriptionDetailId',
        'rle.reservationDate',
        'rle.reservationFinalDate',
        'rle.initialHour',
        'rle.finalHour',
        'rle.metadata',
        'rle.status',
        'rle.createdAt',
        'rle.updatedAt',
        'reservation.reservationId',
        'reservation.subscriberId',
        'reservation.subscriptionDetailId',
        'reservation.username',
        'reservation.metadata',
        'reservation.createdAt',
      ])
      .orderBy(`rle.${sortByField}`, 'DESC')
      .where('rle.status = :status', { status: StatusReservation.COMPLETED });

    if (subscriptionDetailId)
      queryBuilder.andWhere(
        'rle.subscriptionDetailId = :subscriptionDetailId',
        {
          subscriptionDetailId,
        },
      );

    if (accessStatus && accessStatus.length > 0)
      queryBuilder.andWhere('rle.accessStatus IN (:...accessStatus)', {
        accessStatus,
      });

    const paginatedDetails = await paginateQueryBuilder(
      queryBuilder,
      paginationDto,
    );

    const foundLaboratoryEquipmentIds = [
      ...new Set(
        paginatedDetails.data
          .map((rle) => rle.laboratoryEquipmentId)
          .filter(Boolean),
      ),
    ];

    const equipmentMap = await this.reservationFindEquipmentMapService.execute(
      foundLaboratoryEquipmentIds,
    );

    const formattedData = formatAdminReservationDetailsResponse(
      paginatedDetails.data,
      equipmentMap,
    );

    return {
      data: formattedData,
      total: paginatedDetails.total,
      page: paginatedDetails.page,
      limit: paginatedDetails.limit,
      totalPages: paginatedDetails.totalPages,
    };
  }
}
