import { IsEnum, IsArray, ArrayMinSize } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AccessStatus } from '../enums/access-status.enum';
import { StatusReservation } from 'src/reservation/enums/status-reservation.enum';

export class FindByAccessStatusDto extends PaginationDto {
  @IsArray({ message: 'accessStatus debe ser un arreglo' })
  @ArrayMinSize(1, {
    message: 'Debe proporcionar al menos un estado de acceso',
  })
  @IsEnum(AccessStatus, {
    each: true,
    message:
      'Cada estado de acceso debe ser PENDIENTE, INGRESADO o NO_INGRESADO',
  })
  accessStatus: AccessStatus[];
}

export class LaboratoryEquipmentInfoDto {
  laboratoryEquipmentId: string;
  laboratoryId: string;
  laboratoryName: string;
  equipmentName: string;
}

export class FindByAccessStatusResponseDto {
  reservationId: string;
  subscriberId: string;
  subscriptionDetailId: string;
  username: string;
  metadata: Record<string, any>;
  createdAt: string;
  reservationDate: string;
  reservationFinalDate: string | null;
  reservationLaboratoryEquipmentId: string;
  laboratoryEquipment: LaboratoryEquipmentInfoDto | null;
  initialHour: string;
  finalHour: string;
  duration: string;
  detailMetadata: Record<string, any>;
  status: StatusReservation;
  accessStatus: AccessStatus;
}
