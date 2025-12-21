import { IsEnum, IsOptional, IsArray } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AccessStatus } from '../enums/access-status.enum';
import { OrderByField } from '../enums/order-by-field.enum';
import { StatusReservation } from 'src/reservation/enums/status-reservation.enum';

export class ConfirmListReservationDto extends PaginationDto {
  @IsOptional()
  @IsArray({ message: 'accessStatus debe ser un arreglo' })
  @IsEnum(AccessStatus, {
    each: true, // Esto valida cada elemento del array
    message: 'El estado de acceso debe ser una de las opciones válidas',
  })
  accessStatus?: AccessStatus[];

  @IsOptional()
  @IsEnum(OrderByField, {
    message: 'El campo de ordenamiento debe ser createdAt o updatedAt',
  })
  orderBy?: OrderByField;
}

export class LaboratoryEquipmentInfoDto {
  laboratoryEquipmentId: string;
  laboratoryId: string;
  laboratoryName: string;
  equipmentName: string;
}

export class ConfirmListReservationResponseDto {
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
}
