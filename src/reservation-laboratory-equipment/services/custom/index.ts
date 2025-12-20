export * from './reservation-laboratory-equipment-confirm-list.service';
export * from './reservation-laboratory-equipment-find-for-reminder.service';
export * from './reservation-laboratory-equipment-complete-finished.service';
export * from './reservation-laboratory-equipment-get-equipment-ids.service';
export * from './reservation-laboratory-equipment-get-subscriber-metadata.service';
export * from './reservation-laboratory-equipment-get-subscriber-profile.service';
export * from './reservation-laboratory-equipment-find-overlapping-reservations.service';
export * from './reservation-laboratory-equipment-get-laboratory-metadata.service';
export * from './reservation-laboratory-equipment-assign-credentials.service';
export * from './reservation-laboratory-equipment-find-admin-details.service';
export * from './reservation-laboratory-equipment-find-laboratories.service';
export * from './reservation-laboratory-equipment-get-reservation-counts.service';
export * from './reservation-laboratory-equipment-update-access-status.service';
export * from './reservation-laboratory-equipment-find-chart-data.service';
export * from './reservation-laboratory-equipment-find-chart-data-by-hours.service';
export * from './reservation-laboratory-equipment-custom.service';

import { ReservationLaboratoryEquipmentConfirmListService } from './reservation-laboratory-equipment-confirm-list.service';
import { ReservationLaboratoryEquipmentFindForReminderService } from './reservation-laboratory-equipment-find-for-reminder.service';
import { ReservationLaboratoryEquipmentCompleteFinishedService } from './reservation-laboratory-equipment-complete-finished.service';
import { ReservationLaboratoryEquipmentGetEquipmentIdsService } from './reservation-laboratory-equipment-get-equipment-ids.service';
import { ReservationLaboratoryEquipmentGetSubscriberMetadataService } from './reservation-laboratory-equipment-get-subscriber-metadata.service';
import { ReservationLaboratoryEquipmentGetSubscriberProfileService } from './reservation-laboratory-equipment-get-subscriber-profile.service';
import { ReservationLaboratoryEquipmentFindOverlappingReservationsService } from './reservation-laboratory-equipment-find-overlapping-reservations.service';
import { ReservationLaboratoryEquipmentGetLaboratoryMetadataService } from './reservation-laboratory-equipment-get-laboratory-metadata.service';
import { ReservationLaboratoryEquipmentAssignCredentialsService } from './reservation-laboratory-equipment-assign-credentials.service';
import { ReservationLaboratoryEquipmentFindAdminDetailsService } from './reservation-laboratory-equipment-find-admin-details.service';
import { ReservationLaboratoryEquipmentFindLaboratoriesWithReservationsService } from './reservation-laboratory-equipment-find-laboratories.service';
import { ReservationLaboratoryEquipmentCustomService } from './reservation-laboratory-equipment-custom.service';
import { ReservationLaboratoryEquipmentGetReservationCountsService } from './reservation-laboratory-equipment-get-reservation-counts.service';
import { ReservationLaboratoryEquipmentUpdateAccessStatusService } from './reservation-laboratory-equipment-update-access-status.service';
import { ReservationLaboratoryEquipmentFindChartDataService } from './reservation-laboratory-equipment-find-chart-data.service';
import { ReservationLaboratoryEquipmentFindChartDataByHoursService } from './reservation-laboratory-equipment-find-chart-data-by-hours.service';

export const RESERVATION_LABORATORY_EQUIPMENT_CUSTOM_SERVICES = [
  ReservationLaboratoryEquipmentConfirmListService,
  ReservationLaboratoryEquipmentFindForReminderService,
  ReservationLaboratoryEquipmentCompleteFinishedService,
  ReservationLaboratoryEquipmentGetEquipmentIdsService,
  ReservationLaboratoryEquipmentGetSubscriberMetadataService,
  ReservationLaboratoryEquipmentGetSubscriberProfileService,
  ReservationLaboratoryEquipmentFindOverlappingReservationsService,
  ReservationLaboratoryEquipmentGetLaboratoryMetadataService,
  ReservationLaboratoryEquipmentAssignCredentialsService,
  ReservationLaboratoryEquipmentFindAdminDetailsService,
  ReservationLaboratoryEquipmentFindLaboratoriesWithReservationsService,
  ReservationLaboratoryEquipmentCustomService,
  ReservationLaboratoryEquipmentGetReservationCountsService,
  ReservationLaboratoryEquipmentUpdateAccessStatusService,
  ReservationLaboratoryEquipmentFindChartDataService,
  ReservationLaboratoryEquipmentFindChartDataByHoursService,
];
