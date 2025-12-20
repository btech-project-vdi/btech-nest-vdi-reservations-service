import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReservationLaboratoryEquipmentCustomService } from '../services/custom/reservation-laboratory-equipment-custom.service';
import { FindAdminReservationDetailsDto } from '../dto/find-admin-reservation-details.dto';
import { FindLaboratoriesWithReservationsDto } from '../dto/find-laboratories-with-reservations.dto';
import { UpdateAccessStatusDto } from '../dto/update-access-status.dto';
import { ConfirmListReservationDto } from '../dto/confirm-list-reservation.dto';
import {
  FindReservationsChartDataDto,
  FindReservationsChartDataResponseDto,
} from '../dto/find-reservations-chart-data.dto';
import {
  FindReservationsChartDataByHoursDto,
  FindReservationsChartDataByHoursResponseDto,
} from '../dto/find-reservations-chart-data-by-hours.dto';

@Controller()
export class ReservationLaboratoryEquipmentCustomController {
  constructor(
    private readonly reservationLaboratoryEquipmentCustomService: ReservationLaboratoryEquipmentCustomService,
  ) {}

  @MessagePattern('reservationLaboratoryEquipment.findAdminReservationDetails')
  findAdminReservationDetails(
    @Payload() findAdminReservationDetailsDto: FindAdminReservationDetailsDto,
  ) {
    return this.reservationLaboratoryEquipmentCustomService.findAdminReservationDetails(
      findAdminReservationDetailsDto,
    );
  }

  @MessagePattern(
    'reservationLaboratoryEquipment.findLaboratoriesWithReservations',
  )
  findLaboratoriesWithReservations(
    @Payload()
    findLaboratoriesWithReservationsDto: FindLaboratoriesWithReservationsDto,
  ) {
    return this.reservationLaboratoryEquipmentCustomService.findLaboratoriesWithReservations(
      findLaboratoriesWithReservationsDto,
    );
  }

  @MessagePattern('reservationLaboratoryEquipment.confirmListReservation')
  confirmListReservation(
    @Payload() confirmListReservationDto: ConfirmListReservationDto,
  ) {
    return this.reservationLaboratoryEquipmentCustomService.confirmListReservation(
      confirmListReservationDto,
    );
  }

  @MessagePattern('reservationLaboratoryEquipment.updateAccessStatus')
  updateAccessStatus(@Payload() updateAccessStatusDto: UpdateAccessStatusDto) {
    return this.reservationLaboratoryEquipmentCustomService.updateAccessStatus(
      updateAccessStatusDto,
    );
  }

  @MessagePattern('reservationLaboratoryEquipment.findChartData')
  findChartData(
    @Payload() findReservationsChartDataDto: FindReservationsChartDataDto,
  ): Promise<FindReservationsChartDataResponseDto> {
    return this.reservationLaboratoryEquipmentCustomService.findChartData(
      findReservationsChartDataDto,
    );
  }

  @MessagePattern('reservationLaboratoryEquipment.findChartDataByHours')
  findChartDataByHours(
    @Payload()
    findReservationsChartDataByHoursDto: FindReservationsChartDataByHoursDto,
  ): Promise<FindReservationsChartDataByHoursResponseDto> {
    return this.reservationLaboratoryEquipmentCustomService.findChartDataByHours(
      findReservationsChartDataByHoursDto,
    );
  }
}
