import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PaginationResponseDto } from 'src/common/dto/pagination.dto';
import { ReservationLaboratoryEquipment } from '../../entities/reservation-laboratory-equipment.entity';
import { ReservationLaboratoryEquipmentConfirmListService } from './reservation-laboratory-equipment-confirm-list.service';
import { ReservationLaboratoryEquipmentFindForReminderService } from './reservation-laboratory-equipment-find-for-reminder.service';
import { ReservationLaboratoryEquipmentCompleteFinishedService } from './reservation-laboratory-equipment-complete-finished.service';
import { ReservationLaboratoryEquipmentGetEquipmentIdsService } from './reservation-laboratory-equipment-get-equipment-ids.service';
import { ReservationLaboratoryEquipmentGetSubscriberMetadataService } from './reservation-laboratory-equipment-get-subscriber-metadata.service';
import { ReservationLaboratoryEquipmentGetSubscriberProfileService } from './reservation-laboratory-equipment-get-subscriber-profile.service';
import { ReservationLaboratoryEquipmentFindAdminDetailsService } from './reservation-laboratory-equipment-find-admin-details.service';
import { CompleteFinishedReservationsResponseDto } from 'src/reservation/dto/complete-finished-reservations.dto';
import {
  FindAdminReservationDetailsDto,
  FindAdminReservationDetailsResponseDto,
} from '../../dto/find-admin-reservation-details.dto';
import {
  FindLaboratoriesWithReservationsDto,
  FindLaboratoriesWithReservationsResponseDto,
} from '../../dto/find-laboratories-with-reservations.dto';
import { ReservationLaboratoryEquipmentFindLaboratoriesWithReservationsService } from './reservation-laboratory-equipment-find-laboratories.service';
import { ReservationLaboratoryEquipmentUpdateAccessStatusService } from './reservation-laboratory-equipment-update-access-status.service';
import {
  UpdateAccessStatusDto,
  UpdateAccessStatusResponseDto,
} from '../../dto/update-access-status.dto';
import {
  ConfirmListReservationDto,
  ConfirmListReservationResponseDto,
} from 'src/reservation-laboratory-equipment/dto/confirm-list-reservation.dto';

@Injectable()
export class ReservationLaboratoryEquipmentCustomService {
  constructor(
    @Inject(forwardRef(() => ReservationLaboratoryEquipmentConfirmListService))
    private readonly reservationLaboratoryEquipmentConfirmListService: ReservationLaboratoryEquipmentConfirmListService,
    private readonly reservationLaboratoryEquipmentFindForReminderService: ReservationLaboratoryEquipmentFindForReminderService,
    private readonly reservationLaboratoryEquipmentCompleteFinishedService: ReservationLaboratoryEquipmentCompleteFinishedService,
    private readonly reservationLaboratoryEquipmentGetEquipmentIdsService: ReservationLaboratoryEquipmentGetEquipmentIdsService,
    private readonly reservationLaboratoryEquipmentGetSubscriberMetadataService: ReservationLaboratoryEquipmentGetSubscriberMetadataService,
    private readonly reservationLaboratoryEquipmentGetSubscriberProfileService: ReservationLaboratoryEquipmentGetSubscriberProfileService,
    private readonly reservationLaboratoryEquipmentFindAdminDetailsService: ReservationLaboratoryEquipmentFindAdminDetailsService,
    private readonly reservationLaboratoryEquipmentFindLaboratoriesWithReservationsService: ReservationLaboratoryEquipmentFindLaboratoriesWithReservationsService,
    private readonly reservationLaboratoryEquipmentUpdateAccessStatusService: ReservationLaboratoryEquipmentUpdateAccessStatusService,
  ) {}

  async confirmListReservation(
    confirmListReservationDto: ConfirmListReservationDto,
  ): Promise<PaginationResponseDto<ConfirmListReservationResponseDto>> {
    return await this.reservationLaboratoryEquipmentConfirmListService.execute(
      confirmListReservationDto,
    );
  }

  async findReservationsForReminder(): Promise<
    ReservationLaboratoryEquipment[]
  > {
    return await this.reservationLaboratoryEquipmentFindForReminderService.execute();
  }

  async completeFinishedReservations(
    currentDateTime: Date,
  ): Promise<CompleteFinishedReservationsResponseDto> {
    return await this.reservationLaboratoryEquipmentCompleteFinishedService.execute(
      currentDateTime,
    );
  }

  async getLaboratoryEquipmentIdsWithReservations(): Promise<string[]> {
    return await this.reservationLaboratoryEquipmentGetEquipmentIdsService.execute();
  }

  async getSubscriberMetadataForReservation(
    subscriberId: string,
    username: string,
  ): Promise<Record<string, any>> {
    return await this.reservationLaboratoryEquipmentGetSubscriberMetadataService.execute(
      subscriberId,
      username,
    );
  }

  async getSubscriberProfileForGrpcMetadata(
    subscriberId: string,
  ): Promise<Record<string, any> | undefined> {
    return await this.reservationLaboratoryEquipmentGetSubscriberProfileService.execute(
      subscriberId,
    );
  }

  async findAdminReservationDetails(
    findAdminReservationDetailsDto: FindAdminReservationDetailsDto,
  ): Promise<PaginationResponseDto<FindAdminReservationDetailsResponseDto>> {
    return await this.reservationLaboratoryEquipmentFindAdminDetailsService.execute(
      findAdminReservationDetailsDto,
    );
  }

  async findLaboratoriesWithReservations(
    findLaboratoriesWithReservationsDto: FindLaboratoriesWithReservationsDto,
  ): Promise<
    PaginationResponseDto<FindLaboratoriesWithReservationsResponseDto>
  > {
    return await this.reservationLaboratoryEquipmentFindLaboratoriesWithReservationsService.execute(
      findLaboratoriesWithReservationsDto,
    );
  }

  async updateAccessStatus(
    updateAccessStatusDto: UpdateAccessStatusDto,
  ): Promise<UpdateAccessStatusResponseDto> {
    return await this.reservationLaboratoryEquipmentUpdateAccessStatusService.execute(
      updateAccessStatusDto,
    );
  }
}
